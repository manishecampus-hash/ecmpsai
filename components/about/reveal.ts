// Classes for elements revealed by <RevealObserver />. Hidden only when motion is allowed and scripts run,
// so content is always visible with reduced motion or without JavaScript.
const BASE =
  "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [&.is-visible]:translate-x-0 [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 [@media(scripting:none)]:!translate-x-0 [@media(scripting:none)]:!translate-y-0 [@media(scripting:none)]:!opacity-100";

export const REVEAL_UP = `${BASE} motion-safe:translate-y-8 motion-safe:opacity-0`;
export const REVEAL_LEFT = `${BASE} motion-safe:-translate-x-10 motion-safe:opacity-0`;
export const REVEAL_RIGHT = `${BASE} motion-safe:translate-x-10 motion-safe:opacity-0`;
