import type { Certification } from "./types.ts";

// These official pages were inspected on 2026-10-25. Verification is manual,
// not a promise of continuous freshness. Prices remain null: no Saudi quote verified.
export const certifications: Certification[] = [
  {
    id: "github-foundations",
    name: "GitHub Foundations",
    providerId: "github",
    code: "GH-900",
    type: "professional-certification",
    tracks: ["web-development"],
    level: "beginner",
    descriptionAr:
      "تغطي أساسيات Git وGitHub والعمل بالمستودعات والتعاون. تدعم أدوات عمل مطوّر الويب، ولا تقيس إتقان بناء الواجهات وحده.",
    skills: ["Git والمستودعات", "التعاون البرمجي", "إدارة المشاريع"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/",
    prerequisitesAr:
      "المعرفة الموصى بها: أساسيات GitHub والمستودعات والتعاون وممارسات التطوير. لا تُعرض هذه التوصية كشرط تسجيل إلزامي.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    providerId: "github",
    code: "GH-200",
    type: "professional-certification",
    tracks: ["web-development", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول أتمتة سير العمل والتكامل والتسليم المستمر وإدارة GitHub Actions. صلتها بالويب في اختبار المشاريع ونشرها، وليست شهادة واجهات أمامية.",
    skills: ["أتمتة سير العمل", "CI/CD", "تأمين عمليات الأتمتة"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-actions/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-actions/",
    prerequisitesAr:
      "تستهدف الجهة خبرة متوسطة في GitHub Actions ومعرفة بـCI/CD والمستودعات والحزم؛ هذه معارف للاستعداد وليست شهادة سابقة إلزامية موثقة هنا.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "aws-developer-associate",
    name: "AWS Certified Developer - Associate",
    providerId: "aws",
    code: "DVA-C02",
    type: "professional-certification",
    tracks: ["web-development", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تختبر تطوير التطبيقات السحابية واختبارها ونشرها وتشخيص مشكلاتها على AWS. ترتبط بتطبيقات الويب من جانب الخدمات والنشر السحابي.",
    skills: ["تطوير تطبيقات AWS", "نشر التطبيقات", "تشخيص المشكلات"],
    officialUrl:
      "https://aws.amazon.com/certification/certified-developer-associate/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-developer-associate/",
    prerequisitesAr:
      "توصي AWS بسنة أو أكثر من الخبرة العملية في تطوير التطبيقات وصيانتها باستخدام خدماتها؛ هذه خبرة موصى بها، وليست شرط شهادة سابقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "أعلنت AWS فتح التسجيل للإصدار DVA-C03 في 27 أكتوبر 2026، وآخر موعد للإصدار DVA-C02 في 30 نوفمبر 2026. تحقّق من الإصدار قبل التسجيل؛ الشهادة نفسها لم تتقاعد.",
  },
  {
    id: "cisco-ccst-cybersecurity",
    name: "Cisco Certified Support Technician (CCST) Cybersecurity",
    providerId: "cisco",
    code: null,
    type: "professional-certification",
    tracks: ["cybersecurity"],
    level: "beginner",
    descriptionAr:
      "تغطي مبادئ الأمن وأمن الشبكات والأجهزة وتقييم الثغرات والتعامل مع الحوادث، بوصفها مدخلًا تأسيسيًا للأمن السيبراني.",
    skills: ["مبادئ الأمن", "تقييم الثغرات", "التعامل مع الحوادث"],
    officialUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html",
    sourceUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html",
    prerequisitesAr:
      "لا توجد متطلبات رسمية سابقة وفق Cisco؛ يُنصح بفهم موضوعات الاختبار قبل التقدم.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-security-fundamentals",
    name: "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
    providerId: "microsoft",
    code: "SC-900",
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تعرض مفاهيم الأمن والامتثال والهوية وحلول Microsoft ذات الصلة، مع أساسيات حماية البيئات السحابية وإدارة الهوية.",
    skills: ["الأمن والامتثال", "إدارة الهوية", "حلول Microsoft الأمنية"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/",
    prerequisitesAr:
      "توصي الصفحة بمعرفة Microsoft Azure وMicrosoft 365. لا يُستنتج من ذلك وجود شرط شهادة سابقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cisco-ccst-networking",
    name: "Cisco Certified Support Technician (CCST) Networking",
    providerId: "cisco",
    code: null,
    type: "professional-certification",
    tracks: ["networking"],
    level: "beginner",
    descriptionAr:
      "تثبت المعرفة التأسيسية بكيفية عمل الشبكات والأجهزة ووسائط الاتصال والبروتوكولات، وتمهد لدراسة الشبكات بمستوى أعمق.",
    skills: ["أساسيات الشبكات", "أجهزة الاتصال", "بروتوكولات الشبكة"],
    officialUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html",
    sourceUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html",
    prerequisitesAr:
      "لا توجد متطلبات رسمية سابقة وفق Cisco؛ يُنصح بفهم موضوعات الاختبار قبل التقدم.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cisco-ccna",
    name: "Cisco Certified Network Associate (CCNA)",
    providerId: "cisco",
    code: "200-301",
    type: "professional-certification",
    tracks: ["networking"],
    level: "intermediate",
    descriptionAr:
      "تتناول أساسيات الشبكات والوصول والاتصال وخدمات IP، مع أساسيات الأمن والأتمتة. تتطلب استعدادًا عمليًا أوسع من معرفة المفاهيم وحدها.",
    skills: ["الاتصال وخدمات IP", "الوصول إلى الشبكة", "أساسيات الأتمتة"],
    officialUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html",
    sourceUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html",
    prerequisitesAr:
      "لا توجد متطلبات رسمية سابقة؛ توصي Cisco بالتدرب العملي على إعداد الشبكات وتشخيصها. متوسط هنا تصنيف إرشادي في مساري لمستوى Associate.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    providerId: "aws",
    code: "CLF-C02",
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "beginner",
    descriptionAr:
      "شهادة تأسيسية لفهم مفاهيم AWS وخدماتها ومصطلحات السحابة. تناسب بناء المعرفة العامة قبل التخصص في أدوار سحابية تقنية.",
    skills: ["مفاهيم السحابة", "خدمات AWS", "مصطلحات الحوسبة السحابية"],
    officialUrl:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    prerequisitesAr:
      "تستهدف AWS المبتدئين حتى دون خبرة IT أو سحابة سابقة؛ التعرض السابق لخدمات AWS ليس إلزاميًا بحسب الصفحة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "aws-solutions-architect-associate",
    name: "AWS Certified Solutions Architect - Associate",
    providerId: "aws",
    code: "SAA-C03",
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تركز على تصميم حلول AWS آمنة ومرنة وملائمة للأداء والتكلفة. تُعد خيارًا للتعمق بعد اكتساب أساس وخبرة عملية بالسحابة.",
    skills: ["تصميم الحلول السحابية", "المرونة والأمن", "الأداء والتكلفة"],
    officialUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    prerequisitesAr:
      "توصي AWS بسنة على الأقل من الخبرة العملية في تصميم حلول تستخدم خدماتها؛ لا تُعرض هذه الخبرة الموصى بها كشرط تسجيل إلزامي.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-azure-fundamentals",
    name: "Microsoft Certified: Azure Fundamentals",
    providerId: "microsoft",
    code: "AZ-900",
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تغطي مفاهيم السحابة وخدمات Azure الأساسية وأدوات الإدارة والحوكمة، وتقدم أساسًا لفهم بيئات Microsoft السحابية.",
    skills: ["مفاهيم السحابة", "بنية Azure وخدماتها", "الإدارة والحوكمة"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    prerequisitesAr:
      "توصي الصفحة بمهارات وخبرة في أحد مجالات IT، مثل إدارة البنية التحتية أو قواعد البيانات أو تطوير البرمجيات؛ ليست شهادة سابقة إلزامية موثقة هنا.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "google-cloud-digital-leader",
    name: "Cloud Digital Leader",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تتناول أساسيات السحابة وقدرات Google Cloud واستخداماتها في المؤسسات. تركز على فهم الخدمات وقيمتها أكثر من تشغيل البنية عمليًا.",
    skills: ["مفاهيم Google Cloud", "التحول الرقمي", "استخدامات السحابة"],
    officialUrl:
      "https://cloud.google.com/learn/certification/cloud-digital-leader",
    sourceUrl:
      "https://cloud.google.com/learn/certification/cloud-digital-leader",
    prerequisitesAr:
      "لا توجد متطلبات سابقة؛ توصي Google بخبرة في التعاون مع المتخصصين التقنيين.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "google-associate-cloud-engineer",
    name: "Associate Cloud Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول نشر التطبيقات والبنية على Google Cloud وتشغيلها وتأمين الوصول إليها، مع التركيز على المهام العملية لإدارة الحلول السحابية.",
    skills: ["نشر الحلول السحابية", "مراقبة التشغيل", "إدارة الوصول"],
    officialUrl: "https://cloud.google.com/learn/certification/cloud-engineer",
    sourceUrl: "https://cloud.google.com/learn/certification/cloud-engineer",
    prerequisitesAr:
      "لا توجد متطلبات رسمية سابقة؛ توصي Google بستة أشهر أو أكثر من الخبرة العملية على Google Cloud.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
];
