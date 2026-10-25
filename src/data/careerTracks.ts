import type { CareerTrackInfo } from "./types.ts";
import { skills } from "./skills.ts";

const definitions: Array<Omit<CareerTrackInfo, "skillIds">> = [
  {
    id: "web-development",
    nameAr: "تطوير الويب",
    nameEn: "Web development",
    descriptionAr:
      "ابنِ صفحات وتطبيقات ويب قابلة للاستخدام، من الأساسيات إلى الاختبار والنشر.",
  },
  {
    id: "software-development",
    nameAr: "تطوير البرمجيات",
    nameEn: "Software development",
    descriptionAr:
      "تعلّم تصميم البرامج وحل المشكلات وكتابة كود قابل للاختبار والصيانة.",
  },
  {
    id: "cybersecurity",
    nameAr: "الأمن السيبراني",
    nameEn: "Cybersecurity",
    descriptionAr:
      "افهم الأنظمة والمخاطر، ثم طوّر مهارات الحماية والتحليل والاستجابة للحوادث.",
  },
  {
    id: "networking",
    nameAr: "الشبكات",
    nameEn: "Networking",
    descriptionAr:
      "افهم اتصال الأجهزة، ثم تعلّم إعداد الشبكات وتأمينها وتشخيص مشكلاتها.",
  },
  {
    id: "cloud-computing",
    nameAr: "الحوسبة السحابية",
    nameEn: "Cloud computing",
    descriptionAr:
      "ابدأ بمفاهيم السحابة، ثم جرّب تشغيل الحلول وتصميمها على منصة تختارها.",
  },
  {
    id: "devops",
    nameAr: "DevOps والأتمتة",
    nameEn: "DevOps and automation",
    descriptionAr:
      "اربط التطوير بالتشغيل باستخدام الأتمتة والحاويات ومراقبة الخدمات.",
  },
  {
    id: "data-analytics",
    nameAr: "تحليل البيانات",
    nameEn: "Data analytics",
    descriptionAr:
      "حوّل البيانات إلى إجابات واضحة باستخدام الاستعلامات والإحصاء والتصور.",
  },
  {
    id: "artificial-intelligence",
    nameAr: "الذكاء الاصطناعي وتعلم الآلة",
    nameEn: "Artificial intelligence and machine learning",
    descriptionAr:
      "ابنِ أساسًا في البرمجة والرياضيات، ثم جرّب النماذج وقِس أداءها وحدودها.",
  },
  {
    id: "database-administration",
    nameAr: "قواعد البيانات",
    nameEn: "Database administration",
    descriptionAr:
      "تعلّم نمذجة البيانات والاستعلام عنها وإدارتها ونسخها واستعادتها بأمان.",
  },
  {
    id: "it-support",
    nameAr: "الدعم التقني وإدارة الأنظمة",
    nameEn: "IT support and systems administration",
    descriptionAr:
      "طوّر مهارات فهم الأجهزة والأنظمة وتشخيص الأعطال ودعم المستخدمين.",
  },
  {
    id: "software-testing",
    nameAr: "اختبار البرمجيات",
    nameEn: "Software testing",
    descriptionAr:
      "تعلّم تصميم الاختبارات وتوثيق العيوب، ثم أتمتة الفحوصات وضمان الجودة.",
  },
];

export const careerTracks: CareerTrackInfo[] = definitions.map((track) => ({
  ...track,
  skillIds: skills
    .filter((skill) => skill.tracks.includes(track.id))
    .map((skill) => skill.id),
}));
