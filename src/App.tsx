import { useEffect, useRef } from "react";
import { usePageMotion } from "./hooks/usePageMotion";
import { Route, Routes, useLocation } from "react-router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import QuestionnairePage from "./pages/QuestionnairePage";
import CertificationsPage from "./pages/CertificationsPage";
import RoadmapPage from "./pages/RoadmapPage";
import NotFoundPage from "./pages/NotFoundPage";

const titles: Record<string, string> = {
  "/": "بداية أوضح لمستقبلك",
  "/questionnaire": "اكتشف مسارك",
  "/certifications": "استكشف الشهادات الاحترافية",
  "/roadmap": "خارطتي المهنية",
};

export default function App() {
  const { pathname, key } = useLocation();
  const main = useRef<HTMLElement>(null);
  usePageMotion(main, key);
  useEffect(() => {
    document.title = `مساري — ${titles[pathname] ?? "الصفحة غير موجودة"}`;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        تخطّ إلى المحتوى
      </a>
      <Header />
      <main id="main-content" ref={main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/roadmap" element={<RoadmapPage key={key} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
