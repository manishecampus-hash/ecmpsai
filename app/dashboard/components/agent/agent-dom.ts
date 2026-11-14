// eCampus Agent — the agent's eyes and hands on the dashboard, like ChatGPT's agent in its browser.
// observe(): what's on the page right now — its text and every link, tab, button and field, numbered for the AI.
// click / type / select: do what the AI decided, on the real page, the way a person would.

export interface PageElement {
  id: number;
  el: HTMLElement;
  /** Short name the agent uses in its steps, e.g. "Brochures" */
  label: string;
  /** One line for the AI, e.g. `[5] tab "Brochures 2"` */
  line: string;
  /** Changes something (save, submit, delete…) — the agent asks the student first */
  sensitive: boolean;
  /** Why the agent may not use it at all */
  blocked?: string;
}

export interface Observation {
  route: string;
  title: string;
  text: string;
  elements: PageElement[];
}

const INTERACTIVE =
  'a[href], button, input, select, textarea, [role="tab"], [role="button"], [role="switch"], [role="checkbox"], [role="menuitem"], [role="option"], summary';
const SENSITIVE = /\b(pay|payment|submit|save|update|delete|remove|confirm|send|withdraw|upload|claim|redeem|add bank|verify|apply now|block (?:my )?seat)\b/i;
// Never: signing the student out, or closing the agent itself
const FORBIDDEN = /\b(log ?out|sign ?out)\b|^ecampus agent$/i;
const MAX_ELEMENTS = 90;
const MAX_TEXT = 2400;

const clean = (s: string | null | undefined) => (s ?? "").replace(/\s+/g, " ").trim();
const quote = (s: string) => `"${s.replace(/"/g, "'").slice(0, 70)}"`;
export const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

function fieldLabel(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const byFor = el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`)?.textContent : null;
  return clean(el.getAttribute("aria-label") || byFor || el.closest("label")?.textContent || el.getAttribute("placeholder") || el.name);
}

function labelOf(el: HTMLElement) {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) return fieldLabel(el);
  return clean(el.getAttribute("aria-label") || el.innerText || el.textContent || el.getAttribute("title")).slice(0, 70);
}

function isVisible(el: HTMLElement) {
  if (el.closest('[aria-hidden="true"], [inert]')) return false;
  if ((el as HTMLButtonElement).disabled) return false;
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return false;
  const style = getComputedStyle(el);
  return style.visibility !== "hidden" && style.display !== "none";
}

// Content first, then the top bar, then the sidebar — so the page's own controls get the lowest numbers
const region = (el: HTMLElement) => (el.closest("main") ? 0 : el.closest("header") ? 1 : 2);

export function observe(host: HTMLElement | null, route: string): Observation {
  if (!host) return { route, title: "Dashboard", text: "", elements: [] };
  document.querySelectorAll("[data-agent-target]").forEach((n) => n.removeAttribute("data-agent-target"));
  const main = host.querySelector("main") as HTMLElement | null;
  const title = clean(main?.querySelector("h1")?.textContent) || "Dashboard";
  const text = clean((main ?? host).innerText.replace(/\n{2,}/g, "\n").replace(/[ \t]+/g, " ")).slice(0, MAX_TEXT);

  const nodes = Array.from(host.querySelectorAll<HTMLElement>(INTERACTIVE))
    .filter(isVisible)
    // A button inside a link (or the like) is one control
    .filter((el) => !el.parentElement?.closest(INTERACTIVE))
    .sort((a, b) => region(a) - region(b));

  const elements: PageElement[] = [];
  for (const el of nodes) {
    if (elements.length >= MAX_ELEMENTS) break;
    const label = labelOf(el);
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute("role");
    let line = "";
    let blocked: string | undefined;

    if (el instanceof HTMLInputElement) {
      const type = el.type || "text";
      if (type === "hidden") continue;
      const value = type === "password" ? "••••" : type === "checkbox" || type === "radio" ? (el.checked ? "checked" : "not checked") : `value=${quote(el.value)}`;
      line = `input(${type}) ${quote(label || "field")} ${value}`;
    } else if (el instanceof HTMLTextAreaElement) {
      line = `textarea ${quote(label || "text")} value=${quote(el.value)}`;
    } else if (el instanceof HTMLSelectElement) {
      const options = Array.from(el.options).slice(0, 10).map((o) => clean(o.text)).join(" | ");
      line = `select ${quote(label || "options")} value=${quote(el.selectedOptions[0]?.text ?? "")} options: ${options}`;
    } else if (!label) {
      continue; // an icon with no name tells the AI nothing
    } else if (tag === "a") {
      const href = el.getAttribute("href") ?? "";
      const outside = !href.startsWith("/dashboard") || el.getAttribute("target") === "_blank";
      line = `link ${quote(label)} -> ${href.slice(0, 80)}`;
      if (outside) blocked = `It opens outside the dashboard (${href}) — give the student this link instead.`;
    } else {
      const kind = role === "tab" ? "tab" : role === "switch" || role === "checkbox" ? role : "button";
      const state = [
        el.getAttribute("aria-selected") === "true" ? "selected" : "",
        el.getAttribute("aria-pressed") === "true" ? "pressed" : "",
        el.getAttribute("aria-expanded") === "true" ? "expanded" : el.getAttribute("aria-expanded") === "false" ? "collapsed" : "",
        el.getAttribute("aria-checked") === "true" ? "on" : "",
      ]
        .filter(Boolean)
        .join(", ");
      line = `${kind} ${quote(label)}${state ? ` (${state})` : ""}`;
    }

    if (FORBIDDEN.test(label)) continue;
    const sensitive = !blocked && (tag === "button" || role === "button" || el instanceof HTMLInputElement) && SENSITIVE.test(label) && !(el instanceof HTMLInputElement && el.type !== "submit");
    const id = elements.length + 1;
    elements.push({ id, el, label: label || tag, line: `[${id}] ${line}${sensitive ? " (needs approval)" : ""}${blocked ? " (outside dashboard)" : ""}`, sensitive, blocked });
  }
  return { route, title, text, elements };
}

/** Points the agent's cursor at the element (the overlay follows this attribute) */
export function markTarget(el: HTMLElement, stepId: string) {
  document.querySelectorAll("[data-agent-target]").forEach((n) => n.removeAttribute("data-agent-target"));
  el.setAttribute("data-agent-target", stepId);
  el.scrollIntoView({ block: "center", behavior: "smooth" });
}

export async function clickElement(el: HTMLElement) {
  el.focus({ preventScroll: true });
  el.click();
}

const nativeSetter = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) =>
  Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value")?.set;

/** Types like a person (so React sees every keystroke), then leaves the field so it commits */
export async function typeInto(el: HTMLElement, text: string, enter = false, alive: () => boolean = () => true) {
  if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) throw new Error("not a text field");
  const set = nativeSetter(el);
  el.focus({ preventScroll: true });
  const step = Math.max(1, Math.ceil(text.length / 24));
  for (let i = 0; i <= text.length && alive(); i += step) {
    set?.call(el, text.slice(0, i));
    el.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(28);
  }
  set?.call(el, text);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  if (enter) {
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
    el.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
  }
  el.blur();
}

export function selectOption(el: HTMLElement, value: string) {
  if (!(el instanceof HTMLSelectElement)) throw new Error("not a dropdown");
  const want = value.toLowerCase();
  const option = Array.from(el.options).find((o) => o.value.toLowerCase() === want || clean(o.text).toLowerCase() === want) ??
    Array.from(el.options).find((o) => clean(o.text).toLowerCase().includes(want));
  if (!option) throw new Error(`no option "${value}"`);
  nativeSetter(el)?.call(el, option.value);
  el.dispatchEvent(new Event("change", { bubbles: true }));
  return clean(option.text);
}

export function scrollPage(host: HTMLElement | null, direction: "up" | "down") {
  const main = host?.querySelector("main") as HTMLElement | null;
  if (!main) return false;
  const before = main.scrollTop;
  main.scrollBy({ top: (direction === "down" ? 1 : -1) * main.clientHeight * 0.75, behavior: "smooth" });
  return direction === "down" ? before + main.clientHeight < main.scrollHeight - 4 : before > 0;
}
