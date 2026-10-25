import { Link } from "react-router";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              من مقاعد الجامعة، إلى مستقبل أوضح.
              <br />
              إرشاد مهني مبسّط لطلاب التخصصات التقنية.
            </p>
          </div>
          <nav aria-label="روابط التذييل">
            <Link to="/">الرئيسية</Link>
            <Link to="/questionnaire">اكتشف مسارك</Link>
            <Link to="/certifications">الشهادات</Link>
            <Link to="/roadmap">خارطتي</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>مساري © {new Date().getFullYear()}</p>
          <p>
            منصة للإرشاد التعليمي. الشهادات والمسارات لا تضمن الحصول على وظيفة.
          </p>
          <span>
            صُنع لبداياتك الكبيرة <span className="footer-spark">✳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
