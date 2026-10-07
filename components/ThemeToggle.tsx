"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const preferenceKey = "learnnova:theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(preferenceKey);
      } catch {}
      const next = saved === "dark" || (saved !== "light" && media.matches);
      document.documentElement.dataset.theme = next ? "dark" : "light";
      setDark(next);
    };
    const storage = (event: StorageEvent) => {
      if (event.key === preferenceKey || event.key === null) sync();
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", storage);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", storage);
    };
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
    try {
      localStorage.setItem(preferenceKey, next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={
        dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
      }
      title={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
    >
      <Icon name={dark ? "sun" : "moon"} size={18} />
      <span>{dark ? "Sáng" : "Tối"}</span>
    </button>
  );
}
