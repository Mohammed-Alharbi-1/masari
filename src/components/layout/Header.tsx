import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Brand } from "./Brand";
import { Icon } from "../ui/Icon";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/questionnaire", label: "اكتشف مسارك" },
  { to: "/certifications", label: "الشهادات" },
  { to: "/roadmap", label: "خارطتي" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 801px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="التنقل الرئيسي"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setOpen(false);
          }}
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => {
                setOpen(false);
                if (location.pathname === to)
                  document.getElementById("main-content")?.focus();
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <span className="header-note">
          <span className="status-dot" />
          خطوتك الأولى تبدأ هنا
        </span>
      </div>
    </header>
  );
}
