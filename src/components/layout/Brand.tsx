import { Link } from "react-router";
import { Icon } from "../ui/Icon";

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="مساري، الصفحة الرئيسية">
      <span className="brand-mark">
        <Icon name="path" />
      </span>
      <span>
        مساري
        <span className="brand-english" lang="en">
          MASARI
        </span>
      </span>
    </Link>
  );
}
