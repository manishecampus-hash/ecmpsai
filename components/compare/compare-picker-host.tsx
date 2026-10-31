"use client";

import { useCallback, useEffect, useState } from "react";
import ComparePicker from "@/app/compare/compare-picker";
import { OPEN_COMPARE_PICKER } from "./compare-link";

// One picker dialog for the whole page, opened by openComparePicker()
export default function ComparePickerHost() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_COMPARE_PICKER, show);
    return () => window.removeEventListener(OPEN_COMPARE_PICKER, show);
  }, []);

  return <ComparePicker open={open} onClose={close} />;
}
