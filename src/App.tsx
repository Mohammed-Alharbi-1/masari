import { useEffect } from "react";
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
  "/questionnaire": "اكتشف مسارك — قريبًا",
  "/certifications": "الشهادات — قريبًا",
  "/roadmap": "خارطتي — قريبًا",
};

export default function App() {
  const { pathname } = useLocation();
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
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
