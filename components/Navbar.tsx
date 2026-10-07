"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/image/logoweb.webp";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import Furigana from "./Furigana";
const links = [
  { href: "/", label: "Góc học tập", icon: "home" },
  { href: "/lessons", label: "Bài học", icon: "book" },
  { href: "/review", label: "Ôn tập thẻ", icon: "cards" },
  { href: "/progress", label: "Tiến độ của tôi", icon: "chart" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <>
      <header className="mobile-header">
        <Link href="/" className="brand">
          <Image
            className="brand-logo"
            src={logo}
            alt=""
            width={46}
            height={46}
            unoptimized
          />
          <span>
            Learn<span className="brand-dot">Nova</span>
          </span>
        </Link>
        <button
          className="icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="app-sidebar"
          aria-label={open ? "Đóng menu" : "Mở menu"}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </header>
      {open && (
        <button
          className="sidebar-scrim"
          onClick={() => setOpen(false)}
          aria-label="Đóng menu"
        />
      )}
      <aside id="app-sidebar" className={`sidebar ${open ? "is-open" : ""}`}>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image
            className="brand-logo"
            src={logo}
            alt=""
            width={46}
            height={46}
            unoptimized
          />
          <span>
            Learn<span className="brand-dot">Nova</span>
          </span>
        </Link>
        <p className="brand-caption">Một góc nhỏ để học tiếng Nhật</p>
        <div className="nav-heading">KHÔNG GIAN HỌC</div>
        <nav aria-label="Điều hướng chính" className="main-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`nav-link ${active(link.href) ? "active" : ""}`}
              aria-current={active(link.href) ? "page" : undefined}
            >
              <Icon name={link.icon} />
              <span>{link.label}</span>
              {active(link.href) && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="nav-heading">TRA CỨU NHANH</div>
        <nav className="lookup-nav" aria-label="Tra cứu">
          <Link href="/vocabulary" onClick={() => setOpen(false)}>
            Từ vựng{" "}
            <span lang="ja">
              <Furigana text="語彙" />
            </span>
          </Link>
          <Link href="/kanji" onClick={() => setOpen(false)}>
            Kanji{" "}
            <span lang="ja">
              <Furigana text="漢字" />
            </span>
          </Link>
          <Link href="/grammar" onClick={() => setOpen(false)}>
            Ngữ pháp{" "}
            <span lang="ja">
              <Furigana text="文法" />
            </span>
          </Link>
        </nav>
        <div className="sidebar-note">
          <Icon name="leaf" />
          <p>
            Từng chút một,
            <br />
            <strong>rồi bạn sẽ tiến xa.</strong>
          </p>
          <span lang="ja">
            <Furigana text="少しずつ、毎日。" />
          </span>
        </div>
        <div className="sidebar-footer">
          <span className="avatar">
            <Furigana text="私" />
          </span>
          <div>
            <strong>Không gian của bạn</strong>
            <span>Tiến độ lưu trên thiết bị</span>
          </div>
        </div>
      </aside>
    </>
  );
}
