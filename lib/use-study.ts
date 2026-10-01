"use client";
import { useEffect, useState } from "react";
import { emptyStudy, getStudy, STUDY_EVENT } from "./storage";

export function useStudy() {
  const [state, setState] = useState(emptyStudy);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const refresh = () => {
      setState(getStudy());
      setNow(Date.now());
      setReady(true);
    };
    refresh();
    window.addEventListener(STUDY_EVENT, refresh);
    window.addEventListener("storage", refresh);
    const timer = window.setInterval(refresh, 60_000);
    return () => {
      window.removeEventListener(STUDY_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.clearInterval(timer);
    };
  }, []);
  return { state, ready, now };
}
