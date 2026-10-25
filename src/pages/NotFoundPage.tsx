import { Link } from "react-router";
import { Icon } from "../components/ui/Icon";

export default function NotFoundPage() {
  return (
    <section className="not-found container">
      <span className="error-code" aria-hidden="true">
        404
      </span>
      <span className="eyebrow">لنعد إلى المسار</span>
      <h1>هذه الصفحة غير موجودة</h1>
      <p>
        قد يكون الرابط تغيّر أو كُتب بشكل غير صحيح. يمكنك العودة إلى نقطة
        البداية.
      </p>
      <Link className="button button-primary" to="/">
        العودة إلى الرئيسية
        <Icon name="arrow" />
      </Link>
    </section>
  );
}
