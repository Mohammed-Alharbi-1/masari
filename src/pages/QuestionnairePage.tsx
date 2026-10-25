import { ComingSoon } from "../components/ui/ComingSoon";

export default function QuestionnairePage() {
  return (
    <ComingSoon
      title="بداية المسار، أنت."
      label="اكتشف مسارك"
      icon="target"
      description="رحلتك تختلف عن غيرك. قريبًا، ستساعدنا أسئلة قصيرة عن تخصصك واهتماماتك ومستواك على فهم نقطة بدايتك وأهدافك المهنية."
      items={[
        "تخصصك ومرحلتك الجامعية",
        "اهتماماتك ومعرفتك الحالية",
        "ميزانيتك ووقت التعلّم المتاح",
      ]}
    />
  );
}
