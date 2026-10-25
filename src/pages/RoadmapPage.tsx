import { ComingSoon } from "../components/ui/ComingSoon";

export default function RoadmapPage() {
  return (
    <ComingSoon
      title="كل خطوة لها مكان."
      label="خارطتي"
      icon="path"
      description="قريبًا، ستكون لديك خارطة تعلّم تجمع المهارات والشهادات في خطوات واضحة، مع إمكانية متابعة إنجازك من متصفحك."
      items={[
        "خطوات تعلّم متدرجة نحو هدفك",
        "متابعة المراحل التي تنجزها",
        "حفظ التقدم محليًا في المتصفح دون حساب",
      ]}
    />
  );
}
