import { ComingSoon } from "../components/ui/ComingSoon";

export default function CertificationsPage() {
  return (
    <ComingSoon
      title="خيارات أوضح. قرار أذكى."
      label="دليل الشهادات"
      icon="book"
      description="دليل مبسّط للشهادات الاحترافية في المجالات التقنية. ستجد هنا لاحقًا معلومات عن المستوى والمتطلبات والجهة المانحة، مع روابطها الرسمية."
      items={[
        "شهادات مرتبة حسب المجال والمستوى",
        "تمييز الشهادات الاحترافية عن شهادات الدورات",
        "مراجع رسمية ومعلومات موثقة عند توفرها",
      ]}
    />
  );
}
