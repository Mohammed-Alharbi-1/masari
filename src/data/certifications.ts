import type { Certification } from "./types.ts";

// Manually reviewed official sources: 2026-10-25. Recheck changing exam versions before booking.
// Price/currency null means unverified, never free. Skill/track mappings are editorial.
export const certifications: Certification[] = [
  {
    id: "github-foundations",
    name: "GitHub Foundations",
    providerId: "github",
    code: "GH-900",
    type: "professional-certification",
    tracks: ["web-development", "software-development", "devops"],
    level: "beginner",
    descriptionAr:
      "تغطي أساسيات Git وGitHub والعمل بالمستودعات والتعاون. تدعم أدوات عمل مطوّر الويب، ولا تقيس إتقان بناء الواجهات وحده.",
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
    skillIds: ["git"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    providerId: "github",
    code: "GH-200",
    type: "professional-certification",
    tracks: [
      "web-development",
      "cloud-computing",
      "software-development",
      "devops",
    ],
    level: "intermediate",
    descriptionAr:
      "تتناول أتمتة سير العمل والتكامل والتسليم المستمر وإدارة GitHub Actions. صلتها بالويب في اختبار المشاريع ونشرها، وليست شهادة واجهات أمامية.",
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
    skillIds: ["git", "ci-cd"],
  },
  {
    id: "aws-developer-associate",
    name: "AWS Certified Developer - Associate",
    providerId: "aws",
    code: "DVA-C02",
    type: "professional-certification",
    tracks: [
      "web-development",
      "cloud-computing",
      "software-development",
      "devops",
    ],
    level: "intermediate",
    descriptionAr:
      "تختبر تطوير التطبيقات السحابية واختبارها ونشرها وتشخيص مشكلاتها على AWS. ترتبط بتطبيقات الويب من جانب الخدمات والنشر السحابي.",
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
      "أعلنت AWS فتح التسجيل للإصدار DVA-C03 في 27 أكتوبر 2026، وآخر موعد لاختبار DVA-C02 في 30 نوفمبر 2026. الإصدار الحالي ما زال متاحًا في تاريخ المراجعة؛ تحقّق من الإصدار قبل التسجيل، دون تكرار سجل الشهادة.",
    skillIds: ["aws", "ci-cd", "rest-apis", "troubleshooting"],
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
    skillIds: [
      "security-fundamentals",
      "network-security",
      "vulnerability-management",
      "incident-response",
    ],
  },
  {
    id: "microsoft-security-fundamentals",
    name: "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
    providerId: "microsoft",
    code: "SC-900",
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing", "it-support"],
    level: "beginner",
    descriptionAr:
      "تعرض مفاهيم الأمن والامتثال والهوية وحلول Microsoft ذات الصلة، مع أساسيات حماية البيئات السحابية وإدارة الهوية.",
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
    skillIds: [
      "identity-access-management",
      "security-fundamentals",
      "security-governance",
      "azure",
    ],
  },
  {
    id: "cisco-ccst-networking",
    name: "Cisco Certified Support Technician (CCST) Networking",
    providerId: "cisco",
    code: null,
    type: "professional-certification",
    tracks: ["networking", "it-support"],
    level: "beginner",
    descriptionAr:
      "تثبت المعرفة التأسيسية بكيفية عمل الشبكات والأجهزة ووسائط الاتصال والبروتوكولات، وتمهد لدراسة الشبكات بمستوى أعمق.",
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
    skillIds: ["networking-fundamentals", "tcp-ip", "network-troubleshooting"],
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
    skillIds: [
      "networking-fundamentals",
      "routing",
      "switching",
      "network-security",
    ],
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
    skillIds: ["cloud-fundamentals", "aws"],
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
    skillIds: ["aws", "cloud-architecture", "identity-access-management"],
  },
  {
    id: "microsoft-azure-fundamentals",
    name: "Microsoft Certified: Azure Fundamentals",
    providerId: "microsoft",
    code: "AZ-900",
    type: "professional-certification",
    tracks: ["cloud-computing", "it-support"],
    level: "beginner",
    descriptionAr:
      "تغطي مفاهيم السحابة وخدمات Azure الأساسية وأدوات الإدارة والحوكمة، وتقدم أساسًا لفهم بيئات Microsoft السحابية.",
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
    skillIds: ["azure", "cloud-fundamentals"],
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
    skillIds: ["cloud-fundamentals", "google-cloud"],
  },
  {
    id: "google-associate-cloud-engineer",
    name: "Associate Cloud Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["cloud-computing", "devops"],
    level: "intermediate",
    descriptionAr:
      "تتناول نشر التطبيقات والبنية على Google Cloud وتشغيلها وتأمين الوصول إليها، مع التركيز على المهام العملية لإدارة الحلول السحابية.",
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
    skillIds: ["google-cloud", "monitoring", "identity-access-management"],
  },
  {
    id: "microsoft-azure-administrator",
    name: "Microsoft Certified: Azure Administrator Associate",
    providerId: "microsoft",
    code: "AZ-104",
    type: "professional-certification",
    tracks: ["cloud-computing", "it-support"],
    level: "intermediate",
    descriptionAr:
      "تتناول إدارة بيئات Azure وتشغيلها ومراقبتها، بما يشمل الحوسبة والتخزين والشبكات والهوية. تناسب التعمق بعد أساسيات السحابة والعمل على مختبرات عملية لإدارة موارد Azure وتأمينها.",
    skillIds: [
      "azure",
      "identity-access-management",
      "monitoring",
      "networking-fundamentals",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    prerequisitesAr:
      "توصي Microsoft بمعرفة أنظمة التشغيل والشبكات والخوادم والمحاكاة الافتراضية وخبرة بأدوات Azure وPowerShell؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-azure-solutions-architect",
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    providerId: "microsoft",
    code: "AZ-305",
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تركز على تصميم حلول Azure والسحابة الهجينة وفق متطلبات الأعمال، مع مراعاة الشبكات والأمن والتخزين واستمرارية الخدمة. تمثل هدفًا متقدمًا بعد خبرة في إدارة البنية السحابية وتنفيذها.",
    skillIds: [
      "azure",
      "cloud-architecture",
      "networking-fundamentals",
      "backup-recovery",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/",
    prerequisitesAr:
      "شرط رسمي للحصول على الاعتماد: شهادة Azure Administrator Associate واجتياز AZ-305. توصي الصفحة بخبرة متقدمة في عمليات IT وإدارة Azure والتطوير وعمليات DevOps.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "اعتماد Expert له متطلب شهادة سابقة رسمي؛ لا يكفي اجتياز الاختبار وحده.",
  },
  {
    id: "microsoft-power-bi-data-analyst",
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    providerId: "microsoft",
    code: "PL-300",
    type: "professional-certification",
    tracks: ["data-analytics"],
    level: "intermediate",
    descriptionAr:
      "تتناول إعداد البيانات ونمذجتها وتحليلها وعرضها باستخدام Power BI. تساعد على تطوير العمل بلوحات المعلومات وفهم احتياجات الأعمال، مع الاهتمام بإدارة المحتوى التحليلي وتأمينه ومشاركة النتائج بوضوح.",
    skillIds: ["power-bi", "data-visualization", "relational-modeling"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/",
    prerequisitesAr:
      "توصي Microsoft بإتقان Power Query وDAX والعمل على إعداد البيانات ونمذجتها؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-azure-database-administrator",
    name: "Microsoft Certified: Azure Database Administrator Associate",
    providerId: "microsoft",
    code: "DP-300",
    type: "professional-certification",
    tracks: ["database-administration", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تركز على تشغيل قواعد Azure SQL وSQL Server وإدارتها في البيئات المحلية والسحابية. تشمل الإتاحة والأمن ومراقبة الأداء وتحسينه، وتناسب من يتجه إلى الإدارة العملية لقواعد البيانات.",
    skillIds: [
      "database-administration",
      "sql",
      "query-optimization",
      "backup-recovery",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/",
    prerequisitesAr:
      "توصي Microsoft بخبرة في Azure SQL Database وManaged Instance وSQL Server، مع معرفة T-SQL؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "أعلنت الصفحة تحديث النسخة الإنجليزية في 27 أكتوبر 2026؛ راجع دليل DP-300 قبل الاستعداد للاختبار.",
  },
  {
    id: "microsoft-azure-data-fundamentals",
    name: "Microsoft Certified: Azure Data Fundamentals",
    providerId: "microsoft",
    code: "DP-900",
    type: "professional-certification",
    tracks: ["data-analytics", "database-administration"],
    level: "beginner",
    descriptionAr:
      "تقدم مفاهيم البيانات الأساسية وخدمات Azure المرتبطة بها، وتوضح الفرق بين البيانات العلائقية وغير العلائقية وأحمال العمل التحليلية والتشغيلية. تمثل مدخلًا لفهم البيانات في البيئات السحابية قبل التخصص.",
    skillIds: ["cloud-fundamentals", "relational-modeling", "azure"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/",
    prerequisitesAr:
      "المعرفة الموصى بها: مفاهيم البيانات العلائقية وغير العلائقية وأحمال العمل. تنص Microsoft على أنها ليست شرطًا مسبقًا لشهاداتها المرتبطة بالأدوار.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-fabric-data-engineer",
    name: "Microsoft Certified: Fabric Data Engineer Associate",
    providerId: "microsoft",
    code: "DP-700",
    type: "professional-certification",
    tracks: ["data-analytics", "database-administration"],
    level: "intermediate",
    descriptionAr:
      "تتناول تحميل البيانات وتحويلها وتنظيم تدفقاتها في Microsoft Fabric، مع تأمين الحلول التحليلية ومراقبتها وتحسينها. تناسب التعمق في بناء بيانات قابلة للاستخدام بعد تعلم SQL وأساسيات هندسة البيانات.",
    skillIds: ["data-engineering", "sql", "python", "monitoring"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/",
    prerequisitesAr:
      "توصي Microsoft بمهارات SQL وPySpark وKQL ومعرفة تحميل البيانات وبنيتها وتنظيم العمليات؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-fabric-analytics-engineer",
    name: "Microsoft Certified: Fabric Analytics Engineer Associate",
    providerId: "microsoft",
    code: "DP-600",
    type: "professional-certification",
    tracks: ["data-analytics", "database-administration"],
    level: "intermediate",
    descriptionAr:
      "تركز على تصميم الأصول التحليلية وإدارتها في Microsoft Fabric، مثل النماذج الدلالية والمستودعات والبحيرات. تشمل إعداد البيانات والتحكم في الوصول وتقديم أساس منظم لتحليل البيانات على مستوى المؤسسات.",
    skillIds: [
      "data-engineering",
      "sql",
      "data-visualization",
      "relational-modeling",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/",
    prerequisitesAr:
      "توصي Microsoft بالقدرة على استعلام البيانات وتحليلها باستخدام SQL وKQL وDAX وخبرة بالأصول التحليلية؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-identity-access-administrator",
    name: "Microsoft Certified: Identity and Access Administrator Associate",
    providerId: "microsoft",
    code: "SC-300",
    type: "professional-certification",
    tracks: ["cybersecurity", "it-support"],
    level: "intermediate",
    descriptionAr:
      "تتناول إدارة دورة حياة الهويات والوصول باستخدام Microsoft Entra، وتطبيق المصادقة والتفويض وحوكمة الهوية. تناسب التخصص في حماية الوصول إلى التطبيقات والموارد ومراقبة مشكلاته في البيئات المؤسسية.",
    skillIds: [
      "identity-access-management",
      "azure",
      "security-governance",
      "troubleshooting",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/",
    prerequisitesAr:
      "توصي Microsoft بمعرفة Azure وMicrosoft 365 وActive Directory وPowerShell وKQL؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "أعلنت الصفحة تحديث النسخة الإنجليزية في 28 أكتوبر 2026؛ راجع دليل SC-300 قبل التسجيل.",
  },
  {
    id: "microsoft-azure-network-engineer",
    name: "Microsoft Certified: Azure Network Engineer Associate",
    providerId: "microsoft",
    code: "AZ-700",
    type: "professional-certification",
    tracks: ["networking", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول تخطيط شبكات Azure وتنفيذها وإدارتها، بما يشمل الاتصال الهجين وتوصيل التطبيقات والوصول الخاص والأمن. تدعم التعمق في الشبكات السحابية بعد بناء معرفة عملية بالاتصال وإدارة الموارد.",
    skillIds: [
      "azure",
      "networking-fundamentals",
      "network-security",
      "network-troubleshooting",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/",
    prerequisitesAr:
      "توصي Microsoft بخبرة في موارد Azure للحوسبة والتخزين والشبكات وفهم البروتوكولات والعناوين وحل الأسماء؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-devops-engineer",
    name: "Microsoft Certified: DevOps Engineer Expert",
    providerId: "microsoft",
    code: "AZ-400",
    type: "professional-certification",
    tracks: ["devops", "software-development"],
    level: "advanced",
    descriptionAr:
      "تركز على تصميم عمليات DevOps وتدفق العمل والتكامل والاختبار والتسليم والمراقبة المستمرة. تمثل هدفًا متقدمًا لمن اكتسب خبرة في تطوير Azure أو إدارته والعمل بأدوات GitHub وAzure DevOps.",
    skillIds: ["ci-cd", "git", "azure", "monitoring"],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/",
    prerequisitesAr:
      "شرط رسمي: إحدى الشهادات المسبقة التي تحددها Microsoft ثم AZ-400؛ Azure Administrator Associate أحد الخيارات الموثقة. توصي الجهة بخبرة في تطوير Azure وإدارته.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "لا يمثل AZ-400 وحده اعتماد Expert. تسرد الصفحة Azure Developer Associate كبديل سابق، لكن صفحته الرسمية تؤكد تقاعده؛ للمتعلم الجديد يوجد خيار Azure Administrator Associate المتاح.",
  },
  {
    id: "microsoft-windows-server-administrator",
    name: "Microsoft Certified: Windows Server Administrator Associate",
    providerId: "microsoft",
    code: "AZ-802",
    type: "professional-certification",
    tracks: ["it-support", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول إدارة Windows Server في البيئات المحلية والهجينة وربطه بخدمات Azure. تشمل الهوية والشبكات والتخزين والإتاحة والتعافي والمراقبة، وتناسب التعمق في إدارة الأنظمة بعد ممارسة عملية على الخوادم.",
    skillIds: [
      "windows",
      "operating-systems",
      "backup-recovery",
      "troubleshooting",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/",
    prerequisitesAr:
      "توصي Microsoft بعدة سنوات من الخبرة بأنظمة Windows Server؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الاسم الحالي في المصدر Windows Server Administrator Associate، والاختبار الحالي المدرج AZ-802؛ لا يُستخدم الاسم أو زوج الاختبارات القديمان.",
  },
  {
    id: "microsoft-security-operations-analyst",
    name: "Microsoft Certified: Security Operations Analyst Associate",
    providerId: "microsoft",
    code: "SC-200",
    type: "professional-certification",
    tracks: ["cybersecurity"],
    level: "intermediate",
    descriptionAr:
      "تركز على مراقبة التهديدات والتحقيق فيها والاستجابة للحوادث باستخدام تقنيات Microsoft الأمنية. تتناول فرز التنبيهات وهندسة الاكتشاف وتقليل المخاطر، وتناسب مسار العمليات الأمنية بعد معرفة الأنظمة ومفاهيم الأمن.",
    skillIds: [
      "security-monitoring",
      "incident-response",
      "azure",
      "risk-management",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/",
    prerequisitesAr:
      "توصي Microsoft بمعرفة حلول الأمن والهوية وMicrosoft 365 وAzure وأنظمة Windows وLinux؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-information-security-administrator",
    name: "Microsoft Certified: Information Security Administrator Associate",
    providerId: "microsoft",
    code: "SC-401",
    type: "professional-certification",
    tracks: ["cybersecurity"],
    level: "intermediate",
    descriptionAr:
      "تتناول حماية المعلومات الحساسة باستخدام Microsoft Purview والخدمات المرتبطة به، بما يشمل منع تسرب البيانات والاحتفاظ بها ومخاطر الداخل. تركز على تطبيق السياسات والضوابط وحماية بيانات بيئات التعاون.",
    skillIds: [
      "security-governance",
      "risk-management",
      "incident-response",
      "identity-access-management",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/",
    prerequisitesAr:
      "توصي Microsoft بمعرفة Microsoft 365 وPowerShell وEntra وبوابات Defender؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-cybersecurity-architect",
    name: "Microsoft Certified: Cybersecurity Architect Expert",
    providerId: "microsoft",
    code: "SC-100",
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تركز على تحويل استراتيجية الأمن إلى تصميمات تحمي الهوية والبيانات والتطبيقات والبنية السحابية. تشمل الحوكمة وعمليات الأمن ومبادئ الثقة الصفرية، وتمثل هدفًا متقدمًا بعد خبرة تنفيذية في تخصصات أمنية.",
    skillIds: [
      "security-governance",
      "risk-management",
      "identity-access-management",
      "cloud-architecture",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/",
    prerequisitesAr:
      "شرط رسمي: واحدة على الأقل من Identity and Access Administrator Associate أو Security Operations Analyst Associate أو Cloud and AI Security Engineer Associate، إضافة إلى SC-100. تتطلب خبرة متقدمة بتصميم الحلول الأمنية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الاعتماد يتطلب شهادة مسبقة رسمية؛ الخيارات المذكورة بدائل وليست قائمة شهادات يجب جمعها كلها.",
  },
  {
    id: "github-administration",
    name: "GitHub Administration",
    providerId: "github",
    code: "GH-100",
    type: "professional-certification",
    tracks: ["devops", "it-support"],
    level: "intermediate",
    descriptionAr:
      "تتناول إدارة GitHub Enterprise وتنظيم الهوية والوصول والحوكمة وسير العمل المؤسسي. تدعم من يعمل على تشغيل بيئات التطوير والتعاون وتأمينها، ولا تمثل شهادة عامة في إدارة جميع أنظمة التشغيل.",
    skillIds: [
      "git",
      "identity-access-management",
      "security-governance",
      "ci-cd",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-administration/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-administration/",
    prerequisitesAr:
      "توصي GitHub بخبرة متوسطة في إدارة Enterprise والهوية والوصول وActions وميزات التطوير الآمن؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "github-advanced-security",
    name: "GitHub Advanced Security",
    providerId: "github",
    code: "GH-500",
    type: "professional-certification",
    tracks: ["cybersecurity", "software-development", "devops"],
    level: "intermediate",
    descriptionAr:
      "تركز على تأمين الشيفرة والأسرار والاعتماديات خلال دورة تطوير البرمجيات باستخدام GitHub Advanced Security. تتناول إعداد الحماية ومعالجة التنبيهات وتطبيق السياسات والأتمتة، وتناسب التخصص في أمان عمليات التطوير.",
    skillIds: [
      "git",
      "vulnerability-management",
      "security-fundamentals",
      "ci-cd",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-advanced-security/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-advanced-security/",
    prerequisitesAr:
      "توصي GitHub بخبرة عملية بميزات Advanced Security ومفاهيم التطوير الآمن وCI/CD وأساسيات GitHub؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    providerId: "github",
    code: "GH-300",
    type: "professional-certification",
    tracks: ["software-development", "web-development"],
    level: "intermediate",
    descriptionAr:
      "تتناول الاستخدام المسؤول لـGitHub Copilot لتحسين تطوير البرمجيات، بما يشمل إمكاناته والخصوصية والتعامل مع المخرجات. ترتبط بممارسة التطوير بمساعدة الأدوات، ولا تعادل شهادة في بناء نماذج تعلم الآلة.",
    skillIds: [
      "programming-fundamentals",
      "git",
      "generative-ai",
      "quality-assurance",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/",
    prerequisitesAr:
      "توصي GitHub بخبرة في Copilot وأساسيات GitHub ولغة برمجة واحدة أو أكثر؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "microsoft-cloud-ai-security-engineer",
    name: "Microsoft Certified: Cloud and AI Security Engineer Associate",
    providerId: "microsoft",
    code: "SC-500",
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول تنفيذ ضوابط الأمن عبر Azure والبيئات الهجينة وأحمال الذكاء الاصطناعي لحماية الهوية والبيانات والتطبيقات والبنية. تركز على تطبيق الحماية ومراقبة الوضع الأمني، بعد خبرة عملية بإدارة الموارد السحابية.",
    skillIds: [
      "azure",
      "identity-access-management",
      "network-security",
      "security-monitoring",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/",
    sourceUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/",
    prerequisitesAr:
      "توصي Microsoft بخبرة عملية في إدارة Azure والبيئات الهجينة والحوسبة والشبكات والتخزين، ومعرفة قوية بـEntra وMicrosoft 365؛ لا تعرض الصفحة شهادة سابقة إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "aws-ai-practitioner",
    name: "AWS Certified AI Practitioner",
    providerId: "aws",
    code: "AIF-C01",
    type: "professional-certification",
    tracks: ["artificial-intelligence", "cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تغطي مفاهيم الذكاء الاصطناعي وتعلم الآلة والذكاء التوليدي وخدمات AWS المرتبطة بها. تركز على الفهم والاستخدام المسؤول أكثر من بناء النماذج برمجيًا، وتناسب تأسيس المعرفة قبل التخصص العملي.",
    skillIds: [
      "aws",
      "machine-learning",
      "generative-ai",
      "cloud-fundamentals",
    ],
    officialUrl:
      "https://aws.amazon.com/certification/certified-ai-practitioner/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-ai-practitioner/",
    prerequisitesAr:
      "المرشح المستهدف لديه إلمام بتقنيات AI وML على AWS واستخداماتها، ولا يلزم أن يكون مطور حلول. تقترح AWS دراسة أساسيات السحابة للمبتدئ؛ هذا استعداد موصى به.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "لا تعني هذه الشهادة إتقان تدريب النماذج أو هندسة تعلم الآلة. رمز الاختبار AIF-C01 مؤكد في دليل AWS الرسمي.",
  },
  {
    id: "aws-data-engineer-associate",
    name: "AWS Certified Data Engineer - Associate",
    providerId: "aws",
    code: "DEA-C01",
    type: "professional-certification",
    tracks: ["data-analytics", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول إنشاء مسارات البيانات وإدارتها على AWS، ونمذجة البيانات وجودتها ومعالجة مشكلات التشغيل. تناسب التوسع من تحليل البيانات إلى بناء البنية التي تجمعها وتحولها وتتيح استخدامها في التطبيقات والتحليلات.",
    skillIds: ["aws", "data-engineering", "sql", "monitoring"],
    officialUrl:
      "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    prerequisitesAr:
      "تصف AWS المرشح المثالي بخبرة تعادل سنتين إلى ثلاث في هندسة البيانات أو معماريتها، وسنة إلى سنتين مع خدمات AWS؛ هذه خبرة مستهدفة وليست شرط شهادة سابقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "aws-cloudops-engineer-associate",
    name: "AWS Certified CloudOps Engineer - Associate",
    providerId: "aws",
    code: "SOA-C03",
    type: "professional-certification",
    tracks: ["cloud-computing", "devops", "it-support"],
    level: "intermediate",
    descriptionAr:
      "تتناول تشغيل أحمال AWS وإدارتها ومراقبتها، مع الشبكات والأمن واستمرارية الخدمات. ترتبط بإدارة الأنظمة السحابية والعمل التشغيلي، وتحتاج إلى ممارسة نشر الخدمات ومتابعة سلوكها وحل مشكلاتها في بيئات عملية.",
    skillIds: [
      "aws",
      "monitoring",
      "troubleshooting",
      "networking-fundamentals",
    ],
    officialUrl:
      "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/",
    prerequisitesAr:
      "توصي AWS بسنة خبرة في النشر والإدارة والشبكات والأمن على AWS. تشير إلى أن المبتدئ قد يستفيد من Cloud Practitioner أولًا؛ ليست إلزامًا بشهادة سابقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الاسم الحالي مع اختبار SOA-C03 هو CloudOps Engineer. لا يُنشأ سجل جديد لـSysOps Administrator كخيار موازٍ؛ يحتفظ حاملو اعتماد SysOps السابق بصلاحيته حسب سياسة AWS.",
  },
  {
    id: "aws-solutions-architect-professional",
    name: "AWS Certified Solutions Architect - Professional",
    providerId: "aws",
    code: "SAP-C02",
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تصميم حلول AWS المعقدة وتحسين الأمن والتكلفة والأداء وأتمتة العمليات. تستهدف خبرة معمارية عملية في بيئات واسعة، وتمثل هدفًا مستقبليًا بعد بناء حلول وتشغيلها، لا خطوة أولى للمبتدئ.",
    skillIds: [
      "aws",
      "cloud-architecture",
      "security-fundamentals",
      "infrastructure-as-code",
    ],
    officialUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    prerequisitesAr:
      "توصي AWS بسنتين أو أكثر من الخبرة في تصميم الحلول وتنفيذها باستخدام خدماتها. هذه خبرة موصى بها وليست ادعاء بوجوب الحصول على اعتماد Associate أولًا.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم اختياري. تذكر AWS أن تسجيل SAP-C03 يبدأ 27 أكتوبر 2026، وأن آخر يوم لاختبار SAP-C02 هو 16 نوفمبر 2026. راجع الإصدار المتاح قبل التسجيل دون تكرار سجل الشهادة.",
  },
  {
    id: "aws-devops-engineer-professional",
    name: "AWS Certified DevOps Engineer - Professional",
    providerId: "aws",
    code: "DOP-C02",
    type: "professional-certification",
    tracks: ["devops", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تختبر أتمتة إدارة بيئات AWS وتسليم البرمجيات وتشغيل أنظمة قابلة للمراقبة والاستعادة. تربط التطوير بالتشغيل، وتناسب من لديه خبرة عملية في الأتمتة ودورة حياة التطبيقات، بوصفها تخصصًا متقدمًا اختياريًا.",
    skillIds: ["aws", "ci-cd", "infrastructure-as-code", "monitoring"],
    officialUrl:
      "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
    sourceUrl:
      "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
    prerequisitesAr:
      "توصي AWS بسنتين أو أكثر في توفير بيئات AWS وتشغيلها وإدارتها، مع خبرة في دورة تطوير البرمجيات والبرمجة أو كتابة السكربتات؛ توصية للاستعداد لا شرط شهادة سابقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم بعد ممارسة DevOps فعليًا؛ لا يلزم جمع جميع اعتمادات AWS قبل التفكير فيه.",
  },
  {
    id: "aws-security-specialty",
    name: "AWS Certified Security - Specialty",
    providerId: "aws",
    code: "SCS-C03",
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول حماية بيانات وأحمال AWS وإدارة الهوية والرصد والاستجابة للحوادث والحوكمة الأمنية. تستهدف خبرة أمنية سحابية متقدمة، وتكمل الممارسة العملية في تصميم الضوابط وتشغيلها بدل أن تستبدلها أو تضمن التوظيف.",
    skillIds: [
      "aws",
      "identity-access-management",
      "incident-response",
      "security-monitoring",
    ],
    officialUrl:
      "https://aws.amazon.com/certification/certified-security-specialty/",
    sourceUrl:
      "https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html",
    prerequisitesAr:
      "دليل SCS-C03 يستهدف خبرة تعادل ثلاثًا إلى خمس سنوات في تأمين الحلول السحابية. تؤكد صفحة الشهادة عدم اشتراط شهادة سابقة؛ الخبرة المستهدفة ليست شرط اعتماد آخر.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف تخصصي متقدم. بعض لغات الاختبار ستتوقف بعد 31 ديسمبر 2026 وفق الصفحة؛ لا يعني ذلك تقاعد الشهادة كاملة.",
  },
  {
    id: "google-generative-ai-leader",
    name: "Generative AI Leader",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["artificial-intelligence", "cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تغطي أساسيات الذكاء التوليدي وعروض Google Cloud وأساليب تحسين مخرجات النماذج واختيار الاستخدامات المؤسسية. تركز على المعرفة واتخاذ القرار المسؤول، ولا تعني إتقان هندسة النماذج أو برمجتها أو تشغيلها إنتاجيًا.",
    skillIds: ["generative-ai", "google-cloud", "model-evaluation"],
    officialUrl:
      "https://cloud.google.com/learn/certification/generative-ai-leader",
    sourceUrl:
      "https://cloud.google.com/learn/certification/generative-ai-leader",
    prerequisitesAr:
      "لا توجد متطلبات سابقة. تذكر Google أن الاختبار يناسب أدوارًا متنوعة سواء وجدت خبرة تقنية عملية أم لم توجد.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "شهادة معرفية تأسيسية، وليست بديلًا لتعلم البرمجة والرياضيات عند التوجه لهندسة تعلم الآلة.",
  },
  {
    id: "google-workspace-administrator-associate",
    name: "Associate Google Workspace Administrator",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["it-support"],
    level: "intermediate",
    descriptionAr:
      "تتناول الإدارة اليومية لبيئة Google Workspace، من حسابات المستخدمين والخدمات الأساسية إلى سياسات الوصول والأجهزة وحل المشكلات. ترتبط بالدعم التقني وإدارة بيئات التعاون داخل المؤسسات، مع استعداد قائم على الممارسة.",
    skillIds: [
      "identity-access-management",
      "endpoint-management",
      "troubleshooting",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification/associate-google-workspace-administrator",
    sourceUrl:
      "https://cloud.google.com/learn/certification/associate-google-workspace-administrator",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بستة أشهر من خبرة Super Admin في بيئة حقيقية أو اختبارية ومعرفة ميزات إصداري Business Plus وEnterprise.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "google-associate-data-practitioner",
    name: "Associate Data Practitioner",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["data-analytics", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "تتناول تجهيز البيانات وإدخالها وتحليلها وعرضها وإدارة مساراتها على Google Cloud. تربط مبادئ التحليل بالخدمات السحابية وإدارة البيانات، وتناسب التوسع إلى مهام عملية تتجاوز قراءة التقارير وحدها في العمل اليومي.",
    skillIds: ["google-cloud", "data-engineering", "data-visualization", "sql"],
    officialUrl:
      "https://cloud.google.com/learn/certification/data-practitioner",
    sourceUrl: "https://cloud.google.com/learn/certification/data-practitioner",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بستة أشهر أو أكثر من العمل مع البيانات على Google Cloud.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "google-professional-cloud-architect",
    name: "Professional Cloud Architect",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تصميم حلول Google Cloud وإدارة البنية وتحقيق الأمن والاعتمادية والكفاءة والتكلفة المناسبة. تربط القرارات التقنية باحتياجات المؤسسة، وتستهدف ممارسة معمارية واسعة تجعلها هدفًا متقدمًا بعد تنفيذ حلول وتشغيلها فعليًا.",
    skillIds: [
      "google-cloud",
      "cloud-architecture",
      "network-security",
      "monitoring",
    ],
    officialUrl: "https://cloud.google.com/learn/certification/cloud-architect",
    sourceUrl: "https://cloud.google.com/learn/certification/cloud-architect",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، بينها سنة على الأقل في تصميم حلول Google Cloud وإدارتها.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم اختياري؛ عدم وجود شرط رسمي سابق لا يعني أنه مناسب كبداية لطالب دون ممارسة.",
  },
  {
    id: "google-professional-cloud-database-engineer",
    name: "Professional Cloud Database Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["database-administration", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تصميم قواعد بيانات Google Cloud ونشرها وإدارتها وترحيلها وحل مشكلاتها. تركز على تحويل متطلبات العمل إلى حلول بيانات مرنة وعالية الإتاحة، وتناسب التخصص بعد خبرة فعلية في إدارة البيانات والأنظمة.",
    skillIds: [
      "google-cloud",
      "database-administration",
      "query-optimization",
      "backup-recovery",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification/cloud-database-engineer",
    sourceUrl:
      "https://cloud.google.com/learn/certification/cloud-database-engineer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بخمس سنوات أو أكثر في قواعد البيانات وIT، تشمل سنتين عمليتين مع حلول قواعد بيانات Google Cloud.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: "هدف تخصصي متقدم بعد الممارسة؛ ليست شهادة تأسيسية في SQL.",
  },
  {
    id: "google-professional-cloud-developer",
    name: "Professional Cloud Developer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["software-development", "web-development", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول بناء التطبيقات السحابية الآمنة والقابلة للتوسع واختبارها وتهيئتها للنشر وربطها بخدمات Google Cloud. ترتبط بتطوير الخدمات والتطبيقات الحديثة، ولا تقيس تصميم الواجهات الأمامية أو مهارات الويب كاملة بصورة مستقلة.",
    skillIds: ["google-cloud", "software-architecture", "rest-apis", "ci-cd"],
    officialUrl: "https://cloud.google.com/learn/certification/cloud-developer",
    sourceUrl: "https://cloud.google.com/learn/certification/cloud-developer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، بينها سنة على الأقل في تصميم حلول Google Cloud وإدارتها.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم لمن لديه مشروعات وخبرة تطوير فعلية، وليس بديلًا لتعلم أساسيات البرمجة.",
  },
  {
    id: "google-professional-data-engineer",
    name: "Professional Data Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["data-analytics", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تصميم أنظمة معالجة البيانات وإدخالها وتخزينها وتجهيزها للتحليل، ثم تشغيل أحمالها وأتمتتها على Google Cloud. تركز على بنية البيانات وجودتها وأمنها وكفاءتها، وتناسب التخصص العملي المتقدم في هندسة البيانات.",
    skillIds: ["google-cloud", "data-engineering", "sql", "monitoring"],
    officialUrl: "https://cloud.google.com/learn/certification/data-engineer",
    sourceUrl: "https://cloud.google.com/learn/certification/data-engineer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، بينها سنة على الأقل في تصميم حلول Google Cloud وإدارتها.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم في هندسة البيانات؛ لا يلزم محلل البيانات المبتدئ الحصول عليه قبل البدء بمشروعات التحليل.",
  },
  {
    id: "google-professional-cloud-devops-engineer",
    name: "Professional Cloud DevOps Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["devops", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تسليم البرمجيات والبنية على Google Cloud مع ممارسات الاعتمادية والتكامل المستمر وقابلية الرصد. تربط سرعة التطوير باستقرار الخدمة وتحسين التكلفة والأداء، وتناسب من مارس تشغيل أنظمة إنتاجية وصيانتها عمليًا.",
    skillIds: [
      "google-cloud",
      "ci-cd",
      "observability",
      "infrastructure-as-code",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification/cloud-devops-engineer",
    sourceUrl:
      "https://cloud.google.com/learn/certification/cloud-devops-engineer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، تشمل سنة على الأقل في تصميم أنظمة إنتاجية وإدارتها على Google Cloud.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم اختياري بعد ممارسة الأتمتة وتشغيل الخدمات، لا قائمة مشتريات إلزامية في مسار DevOps.",
  },
  {
    id: "google-professional-cloud-security-engineer",
    name: "Professional Cloud Security Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول حماية أحمال Google Cloud وإدارة الهوية والاتصالات والبيانات والعمليات الأمنية والامتثال. ترتبط ببناء ضوابط أمنية سحابية ومراقبتها، وتستهدف التخصص بعد اكتساب أساس قوي وخبرة في تأمين حلول تعمل فعليًا.",
    skillIds: [
      "google-cloud",
      "identity-access-management",
      "network-security",
      "security-monitoring",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification/cloud-security-engineer",
    sourceUrl:
      "https://cloud.google.com/learn/certification/cloud-security-engineer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، منها أكثر من سنة في تصميم حلول Google Cloud وإدارتها.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف أمني متقدم؛ عدم وجود شهادة سابقة إلزامية لا يغني عن الخبرة العملية.",
  },
  {
    id: "google-professional-cloud-network-engineer",
    name: "Professional Cloud Network Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["networking", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تصميم شبكات Google Cloud وتنفيذها وربط البيئات الهجينة وإدارة الخدمات والأمن والمراقبة. تربط معرفة التوجيه والاتصال بممارسات الشبكات السحابية، وتناسب التخصص بعد تشغيل شبكات وحل مشكلاتها في مشروعات عملية.",
    skillIds: [
      "google-cloud",
      "routing",
      "network-security",
      "network-troubleshooting",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification/cloud-network-engineer",
    sourceUrl:
      "https://cloud.google.com/learn/certification/cloud-network-engineer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، بينها سنة على الأقل في تصميم حلول Google Cloud وإدارتها.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم بعد أساس شبكات وممارسة سحابية؛ لا يحل محل تعلم TCP/IP والتوجيه.",
  },
  {
    id: "google-professional-machine-learning-engineer",
    name: "Professional Machine Learning Engineer",
    providerId: "google-cloud",
    code: null,
    type: "professional-certification",
    tracks: ["artificial-intelligence", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "تتناول تطوير حلول تعلم الآلة وتشغيلها وتوسيعها ومراقبتها وأتمتة مساراتها على Google Cloud. تربط البيانات والنماذج بالأنظمة الإنتاجية، وتستهدف خبرة متقدمة تتجاوز دراسة الخوارزميات أو إنهاء دورة تمهيدية وحدها نظريًا.",
    skillIds: [
      "google-cloud",
      "machine-learning",
      "model-evaluation",
      "data-engineering",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification/machine-learning-engineer",
    sourceUrl:
      "https://cloud.google.com/learn/certification/machine-learning-engineer",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية سابقة؛ توصي Google بثلاث سنوات أو أكثر من الخبرة المهنية، بينها سنة أو أكثر في تصميم حلول Google Cloud وإدارتها.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم. تذكر الصفحة أن الاختبار لا يقيس مهارة كتابة الكود مباشرة؛ لا يعد بديلًا لمشروعات Python وتقييم النماذج.",
  },
  {
    id: "python-pcep",
    name: "PCEP – Certified Entry-Level Python Programmer",
    providerId: "python-institute",
    code: "PCEP-30-02",
    type: "professional-certification",
    tracks: [
      "software-development",
      "data-analytics",
      "artificial-intelligence",
    ],
    level: "beginner",
    descriptionAr:
      "تغطي أساسيات البرمجة باستخدام Python، مثل الأنواع والشروط والحلقات والدوال ومعالجة الأخطاء. تمنح نقطة تحقق للمعرفة الأساسية، ويُفضّل دعم الاستعداد بكتابة برامج صغيرة بدل الاكتفاء بحفظ المصطلحات.",
    skillIds: ["python", "programming-fundamentals"],
    officialUrl: "https://pythoninstitute.org/pcep",
    sourceUrl: "https://pythoninstitute.org/pcep",
    prerequisitesAr: "لا توجد متطلبات سابقة وفق الجهة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الإصدار الحالي PCEP-30-02؛ أعلنت الجهة إصدار PCEP-30-03 في 31 أكتوبر 2026. راجع الإصدار قبل التسجيل دون إنشاء شهادة مكررة.",
  },
  {
    id: "python-pcap",
    name: "PCAP – Certified Associate Python Programmer",
    providerId: "python-institute",
    code: "PCAP-31-03",
    type: "professional-certification",
    tracks: ["software-development", "web-development"],
    level: "intermediate",
    descriptionAr:
      "تختبر تطوير برامج Python متعددة الوحدات، والبرمجة الكائنية، والحزم والملفات والاستثناءات. تناسب التعمق بعد الأساسيات، مع تطبيق المعرفة في مشروع برمجي قابل للاختبار والصيانة، لا كشهادة خاصة بالواجهات الأمامية.",
    skillIds: [
      "python",
      "object-oriented-programming",
      "programming-fundamentals",
    ],
    officialUrl: "https://pythoninstitute.org/pcap",
    sourceUrl: "https://pythoninstitute.org/pcap",
    prerequisitesAr:
      "لا توجد متطلبات رسمية؛ شهادة PCEP أو المعرفة المكافئة موصى بها وليست إلزامية.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الإصدار PCAP-31-03 متاح؛ أعلنت الجهة PCAP-31-04 في 31 أكتوبر 2026. تحقّق من الإصدار عند التسجيل.",
  },
  {
    id: "python-pcpp1",
    name: "PCPP1 – Certified Professional Python Programmer Level 1",
    providerId: "python-institute",
    code: "PCPP-32-101",
    type: "professional-certification",
    tracks: ["software-development"],
    level: "advanced",
    descriptionAr:
      "تتناول موضوعات Python المتقدمة، مثل البرمجة الكائنية والممارسات القياسية والتعامل مع الملفات والبيئة والاتصال الشبكي. تمثل هدفًا لاحقًا بعد بناء برامج عملية وفهم متين للغة، وليست خطوة إلزامية لكل مطور.",
    skillIds: [
      "python",
      "object-oriented-programming",
      "software-architecture",
    ],
    officialUrl: "https://pythoninstitute.org/pcpp1",
    sourceUrl: "https://pythoninstitute.org/pcpp1",
    prerequisitesAr: "لا توجد متطلبات رسمية؛ PCAP موصى بها فقط.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الإصدار PCPP-32-101 متاح؛ أعلنت الجهة تحديث PCPP-32-102 في 31 أكتوبر 2026. هدف متقدم اختياري.",
  },
  {
    id: "python-pced",
    name: "PCED – Certified Entry-Level Data Analyst with Python",
    providerId: "python-institute",
    code: "PCED-30-02",
    type: "professional-certification",
    tracks: ["data-analytics"],
    level: "beginner",
    descriptionAr:
      "تغطي استخدام Python في معالجة البيانات وتحليلها، مع أساس إحصائي لقراءة النتائج وعرضها. تناسب بداية التحليل البرمجي، وينبغي مرافقتها بمشروع تنظيف بيانات وتفسير واضح للنتائج بدل اعتبار الاختبار خبرة عملية بديلة.",
    skillIds: ["python", "statistics", "data-visualization"],
    officialUrl: "https://pythoninstitute.org/pced",
    sourceUrl: "https://pythoninstitute.org/pced",
    prerequisitesAr:
      "لا توجد متطلبات رسمية؛ توصي الجهة بمعرفة PCEP أو ما يعادلها وأساس في الرياضيات والإحصاء.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: "الإصدار PCED-30-01 متقاعد؛ السجل يخص الإصدار الحالي PCED-30-02.",
  },
  {
    id: "python-pcet",
    name: "PCET – Certified Entry-Level Tester with Python",
    providerId: "python-institute",
    code: "PCET-30-01",
    type: "professional-certification",
    tracks: ["software-testing", "software-development"],
    level: "beginner",
    descriptionAr:
      "تربط أساسيات اختبار البرمجيات بمعرفة Python، وتساعد على فهم دور الاختبار والتحقق من سلوك البرامج. يمكن دعم التعلم بكتابة حالات اختبار بسيطة وإعادة إنتاج العيوب وتوثيقها في مشروع صغير.",
    skillIds: ["python", "testing-fundamentals", "test-case-design"],
    officialUrl: "https://pythoninstitute.org/pcet",
    sourceUrl: "https://pythoninstitute.org/pcet",
    prerequisitesAr:
      "لا توجد متطلبات رسمية؛ توصى معرفة أساسية بـPython والاختبار أو إتمام ISTQB Foundation Level، دون اشتراط ذلك.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "python-pcat",
    name: "PCAT – Certified Associate Tester with Python",
    providerId: "python-institute",
    code: "PCAT-31-01",
    type: "professional-certification",
    tracks: ["software-testing", "software-development"],
    level: "intermediate",
    descriptionAr:
      "تتناول اختبار البرمجيات باستخدام Python بمستوى يتجاوز المدخل، مع تطبيقات مرتبطة بأتمتة الاختبار وضمان الجودة. تناسب من يملك أساسًا برمجيًا واختباريًا، مع الحاجة إلى ممارسة فعلية في تصميم الاختبارات وصيانتها.",
    skillIds: ["python", "test-automation", "quality-assurance"],
    officialUrl: "https://pythoninstitute.org/pcat",
    sourceUrl: "https://pythoninstitute.org/pcat",
    prerequisitesAr:
      "لا توجد متطلبات رسمية؛ توصي الجهة بمعرفة PCEP وPCAP أو ما يعادلهما وPCET ومهارات المجال.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "الإصدار الحالي PCAT-31-01؛ PCAT-31-02 قيد التطوير ولا يُعرض هنا كاختبار متاح.",
  },
  {
    id: "linux-foundation-lfcs",
    name: "Linux Foundation Certified System Administrator (LFCS)",
    providerId: "linux-foundation",
    code: "LFCS",
    type: "professional-certification",
    tracks: ["it-support", "devops"],
    level: "intermediate",
    descriptionAr:
      "اختبار عملي لإدارة أنظمة Linux عبر سطر الأوامر، يشمل مهام تشغيل النظام والخدمات والشبكات والتخزين. يدعم مسار إدارة الأنظمة وDevOps، ويتطلب استعدادًا عمليًا يتجاوز معرفة المصطلحات أو مشاهدة الدروس فقط.",
    skillIds: [
      "linux",
      "operating-systems",
      "shell-scripting",
      "network-troubleshooting",
    ],
    officialUrl:
      "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
    sourceUrl:
      "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
    prerequisitesAr:
      "لا توجد متطلبات سابقة رسمية للاختبار وفق Linux Foundation؛ الممارسة العملية ضرورية للاستعداد.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cncf-kcna",
    name: "Kubernetes and Cloud Native Associate (KCNA)",
    providerId: "cncf",
    code: "KCNA",
    type: "professional-certification",
    tracks: ["devops", "cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تغطي مفاهيم Kubernetes والبيئة السحابية الأصلية، بما فيها الحاويات والتنسيق والمراقبة ومبادئ الأمن. تقدم مدخلًا معرفيًا قبل الاختبارات العملية المتخصصة، ويمكن دعمها بنشر تطبيق صغير وفهم مكوناته وخدماته.",
    skillIds: ["kubernetes", "docker", "cloud-fundamentals"],
    officialUrl: "https://www.cncf.io/training/certification/kcna/",
    sourceUrl: "https://www.cncf.io/training/certification/kcna/",
    prerequisitesAr: null,
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cncf-kcsa",
    name: "Kubernetes and Cloud Security Associate (KCSA)",
    providerId: "cncf",
    code: "KCSA",
    type: "professional-certification",
    tracks: ["cybersecurity", "devops", "cloud-computing"],
    level: "beginner",
    descriptionAr:
      "تغطي مبادئ أمن Kubernetes والبيئات السحابية الأصلية، مثل نمذجة التهديدات وضبط مكونات المنصة ومتابعة المخاطر. تساعد على بناء فهم أمني تأسيسي، ولا تغني عن تجربة الضوابط في مختبر آمن.",
    skillIds: [
      "kubernetes",
      "security-fundamentals",
      "vulnerability-management",
    ],
    officialUrl: "https://www.cncf.io/training/certification/kcsa/",
    sourceUrl: "https://www.cncf.io/training/certification/kcsa/",
    prerequisitesAr: null,
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cncf-cka",
    name: "Certified Kubernetes Administrator (CKA)",
    providerId: "cncf",
    code: "CKA",
    type: "professional-certification",
    tracks: ["devops", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "اختبار عملي لإدارة تجمعات Kubernetes، يشمل إعداد البنية وتشغيل الأحمال والشبكات والتخزين واستكشاف الأعطال. يناسب من تدرب على إدارة المنصة مباشرة، ويقيس تنفيذ المهام عبر سطر الأوامر ضمن بيئة الاختبار.",
    skillIds: ["kubernetes", "network-troubleshooting", "linux", "monitoring"],
    officialUrl: "https://www.cncf.io/training/certification/cka/",
    sourceUrl: "https://www.cncf.io/training/certification/cka/",
    prerequisitesAr: null,
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cncf-ckad",
    name: "Certified Kubernetes Application Developer (CKAD)",
    providerId: "cncf",
    code: "CKAD",
    type: "professional-certification",
    tracks: ["software-development", "devops", "cloud-computing"],
    level: "intermediate",
    descriptionAr:
      "اختبار عملي لتصميم تطبيقات Kubernetes وبنائها وإعدادها ونشرها ومراقبتها. يركز على تعامل المطور مع موارد المنصة وتشخيص مشكلات التطبيق، بعد معرفة بالحاويات والمفاهيم السحابية وممارسة كتابة تعريفات الموارد وتشغيلها.",
    skillIds: ["kubernetes", "docker", "software-architecture", "monitoring"],
    officialUrl: "https://www.cncf.io/training/certification/ckad/",
    sourceUrl: "https://www.cncf.io/training/certification/ckad/",
    prerequisitesAr:
      "يفترض الاختبار معرفة عملية ببيئات تشغيل الحاويات وبنية الخدمات المصغرة؛ لم تُثبت الصفحة اشتراط شهادة سابقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cncf-cks",
    name: "Certified Kubernetes Security Specialist (CKS)",
    providerId: "cncf",
    code: "CKS",
    type: "professional-certification",
    tracks: ["cybersecurity", "devops", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "اختبار عملي متخصص لتأمين Kubernetes والأحمال المعتمدة على الحاويات، يشمل تقوية الأنظمة وتقليل الثغرات وأمن سلسلة التوريد والمراقبة. يمثل هدفًا لاحقًا للممارس، بعد اكتساب أساس الإدارة والخبرة العملية في المنصة.",
    skillIds: [
      "kubernetes",
      "vulnerability-management",
      "security-monitoring",
      "network-security",
    ],
    officialUrl: "https://www.cncf.io/training/certification/cks/",
    sourceUrl: "https://www.cncf.io/training/certification/cks/",
    prerequisitesAr:
      "يجب اجتياز اختبار CKA قبل محاولة CKS؛ توضح الصفحة أن اعتماد CKA لا يلزم أن يكون نشطًا.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم اختياري؛ وجود شرط CKA هنا شرط جهة مانحة، بخلاف الترتيب التحريري المقترح في مساري.",
  },
  {
    id: "redhat-rhcsa",
    name: "Red Hat Certified System Administrator (RHCSA)",
    providerId: "red-hat",
    code: "EX200",
    type: "professional-certification",
    tracks: ["it-support", "devops"],
    level: "intermediate",
    descriptionAr:
      "تثبت تنفيذ مهارات إدارة Red Hat Enterprise Linux، مثل التعامل مع الملفات والخدمات والتخزين والمستخدمين والأمن والبرامج النصية البسيطة. الاختبار عملي، لذا يلزم تدريب مباشر على النظام وإدارة سيناريوهات تشغيل حقيقية.",
    skillIds: [
      "linux",
      "operating-systems",
      "shell-scripting",
      "troubleshooting",
    ],
    officialUrl: "https://www.redhat.com/en/services/certification/rhcsa",
    sourceUrl:
      "https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam",
    prerequisitesAr:
      "تدرج صفحة EX200 التدريب RH124 وRH134 أو RH199 أو خبرة مكافئة في إدارة RHEL ضمن متطلبات الاستعداد، مع مراجعة أهداف الاختبار؛ لا تشترط شهادة سابقة محددة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "isc2-cc",
    name: "CC – Certified in Cybersecurity",
    providerId: "isc2",
    code: "CC",
    type: "professional-certification",
    tracks: ["cybersecurity"],
    level: "beginner",
    descriptionAr:
      "اعتماد تأسيسي يغطي مبادئ الأمن والحوكمة والهوية وأمن الشبكات والسحابة والعمليات والاستجابة للحوادث. يمكن استخدامه كنقطة تحقق بعد دراسة الأساسيات، مع ممارسة مختبرية مناسبة بدل افتراض أنه يحقق الجاهزية المهنية وحده.",
    skillIds: [
      "security-fundamentals",
      "identity-access-management",
      "incident-response",
    ],
    officialUrl: "https://www.isc2.org/certifications/cc",
    sourceUrl: "https://www.isc2.org/certifications/cc",
    prerequisitesAr:
      "لا تتطلب الجهة خبرة عمل سابقة للحصول على CC؛ راجع إجراءات الاعتماد الحالية عند التسجيل.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "isc2-sscp",
    name: "SSCP – Systems Security Certified Practitioner",
    providerId: "isc2",
    code: "SSCP",
    type: "professional-certification",
    tracks: ["cybersecurity", "it-support"],
    level: "intermediate",
    descriptionAr:
      "يتناول التطبيق العملي لإدارة أمن الأنظمة والبنية التحتية، بما يشمل ضوابط الوصول والمراقبة والاستجابة للحوادث وأمن الاتصالات. يناسب التعمق بعد الأساسيات، مع شروط خبرة مستقلة عن مجرد النجاح في الامتحان.",
    skillIds: [
      "identity-access-management",
      "security-monitoring",
      "incident-response",
      "network-security",
    ],
    officialUrl: "https://www.isc2.org/certifications/sscp",
    sourceUrl: "https://www.isc2.org/certifications/sscp",
    prerequisitesAr:
      "للحصول على الاعتماد تُطلب سنة خبرة كاملة في مجال أو أكثر من مجالات SSCP، مع مسارات إعفاء موثقة لبعض الدرجات. يمكن لمن يجتاز الاختبار دون الخبرة سلوك مسار Associate of ISC2؛ النجاح وحده لا يمنح SSCP.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "اجتياز الاختبار وحده لا يمنح الاعتماد الكامل؛ راجع شروط الخبرة وخيارات Associate لدى الجهة.",
  },
  {
    id: "isc2-cissp",
    name: "CISSP – Certified Information Systems Security Professional",
    providerId: "isc2",
    code: "CISSP",
    type: "professional-certification",
    tracks: ["cybersecurity"],
    level: "advanced",
    descriptionAr:
      "يغطي تصميم برامج الأمن وإدارتها عبر المخاطر والمعمارية والهوية والعمليات وأمن تطوير البرمجيات. يستهدف أصحاب الخبرة الواسعة، ويُعرض كهدف مهني مستقبلي اختياري لا كنقطة بداية لطالب لم يمارس العمل بعد.",
    skillIds: [
      "security-governance",
      "risk-management",
      "identity-access-management",
      "software-architecture",
    ],
    officialUrl: "https://www.isc2.org/certifications/cissp",
    sourceUrl: "https://www.isc2.org/certifications/cissp",
    prerequisitesAr:
      "يتطلب الاعتماد خمس سنوات خبرة تراكمية كاملة في مجالين أو أكثر من مجالاته؛ قد تعفي درجة أو اعتماد مقبول سنة واحدة. النجاح دون الخبرة يؤهل لمسار Associate of ISC2، وليس لمنح CISSP مباشرة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف مهني مستقبلي متقدم؛ راجع شروط الخبرة والإعفاءات وإجراءات الاعتماد قبل التسجيل.",
  },
  {
    id: "isc2-ccsp",
    name: "CCSP – Certified Cloud Security Professional",
    providerId: "isc2",
    code: "CCSP",
    type: "professional-certification",
    tracks: ["cybersecurity", "cloud-computing"],
    level: "advanced",
    descriptionAr:
      "يركز على تأمين البيانات والتطبيقات والبنية السحابية وعملياتها، مع المخاطر والامتثال. يناسب المتخصص الذي يجمع خبرة تقنية وأمنية وسحابية، ويُطرح كهدف اختياري لاحق دون اختزال شروط الاعتماد في اجتياز اختبار واحد.",
    skillIds: [
      "cloud-architecture",
      "security-governance",
      "risk-management",
      "identity-access-management",
    ],
    officialUrl: "https://www.isc2.org/certifications/ccsp",
    sourceUrl: "https://www.isc2.org/certifications/ccsp",
    prerequisitesAr:
      "يتطلب الاعتماد خمس سنوات في IT، منها ثلاث في الأمن السيبراني وسنة في مجالات CCSP، مع إعفاءات محددة؛ CISSP النشط قد يستبدل شرط الخبرة كاملًا. يوجد مسار Associate لمن يجتاز الاختبار دون الخبرة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم اختياري؛ راجع تفاصيل الخبرة والإعفاءات لدى الجهة، ولا تعتبر النجاح في الاختبار وحده اعتمادًا كاملًا.",
  },
  {
    id: "istqb-ctfl",
    name: "ISTQB Certified Tester Foundation Level (CTFL) v4.0",
    providerId: "istqb",
    code: "CTFL",
    type: "professional-certification",
    tracks: ["software-testing", "software-development"],
    level: "beginner",
    descriptionAr:
      "تغطي مفاهيم الاختبار وتصميم الحالات وإدارة العيوب وأنواع الاختبارات ودورها ضمن دورة تطوير البرمجيات. توفر لغة مشتركة لفهم الجودة، وينبغي ربطها بممارسة اختبار تطبيق وتوثيق النتائج بدل اعتبار المعرفة النظرية بديلًا للتطبيق.",
    skillIds: ["testing-fundamentals", "test-case-design", "quality-assurance"],
    officialUrl:
      "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
    sourceUrl:
      "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
    prerequisitesAr:
      "التدريب المعتمد موصى به، وتؤكد الصفحة إمكان الدراسة الذاتية للتحضير. تُراجع شروط التسجيل لدى مجلس أو مزود الاختبار.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "istqb-ctal-tae",
    name: "ISTQB Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE) v2.0",
    providerId: "istqb",
    code: "CTAL-TAE",
    type: "professional-certification",
    tracks: ["software-testing", "devops"],
    level: "advanced",
    descriptionAr:
      "تركز على بناء حلول أتمتة اختبار مستدامة، من المعمارية والتنفيذ إلى الصيانة والتقارير والتكامل مع CI/CD. تناسب من مارس تطوير البرمجيات والاختبار، مع ضرورة التحقق من متطلبات الخبرة لدى جهة الامتحان.",
    skillIds: [
      "test-automation",
      "quality-assurance",
      "ci-cd",
      "software-architecture",
    ],
    officialUrl:
      "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
    sourceUrl:
      "https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/",
    prerequisitesAr:
      "يجب حمل CTFL v4.0 أو إصدار سابق من Foundation Level مع خبرة عملية كافية؛ يحدد مجلس ISTQB أو مزود الاختبار معايير الخبرة الدقيقة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: "هدف متقدم اختياري، وليس خطوة مطلوبة لكل مختبر.",
  },
  {
    id: "databricks-data-engineer-associate",
    name: "Databricks Certified Data Engineer Associate",
    providerId: "databricks",
    code: null,
    type: "professional-certification",
    tracks: ["data-analytics", "database-administration"],
    level: "intermediate",
    descriptionAr:
      "تغطي مهام هندسة البيانات على منصة Databricks، مثل الإدخال والتحويل والنمذجة وتشغيل الوظائف والمراقبة والحوكمة. تناسب من مارس معالجة البيانات والاستعلام عنها، مع تنفيذ خط بيانات عملي لفهم السلوك خارج أسئلة الاختبار.",
    skillIds: ["data-engineering", "sql", "python", "monitoring"],
    officialUrl:
      "https://www.databricks.com/learn/certification/data-engineer-associate",
    sourceUrl:
      "https://www.databricks.com/learn/certification/data-engineer-associate",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية؛ توصي الجهة بتدريب مرتبط وخبرة عملية في مهام دليل الاختبار.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "databricks-data-analyst-associate",
    name: "Databricks Certified Data Analyst Associate",
    providerId: "databricks",
    code: null,
    type: "professional-certification",
    tracks: ["data-analytics"],
    level: "intermediate",
    descriptionAr:
      "تتناول تحليل البيانات باستخدام Databricks SQL، بما يشمل إدارة مجموعات البيانات والاستعلامات والنمذجة واللوحات والتصورات والأمن. تناسب محللًا يطبق SQL فعليًا ويستطيع تفسير النتائج وعرضها بوضوح ضمن سياق العمل.",
    skillIds: [
      "sql",
      "data-visualization",
      "relational-modeling",
      "query-optimization",
    ],
    officialUrl:
      "https://www.databricks.com/learn/certification/data-analyst-associate",
    sourceUrl:
      "https://www.databricks.com/learn/certification/data-analyst-associate",
    prerequisitesAr:
      "لا توجد متطلبات إلزامية؛ التدريب موصى به، وكذلك ستة أشهر أو أكثر من الممارسة في مهام التحليل المحددة في دليل الاختبار.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cisco-ccst-it-support",
    name: "Cisco Certified Support Technician (CCST) IT Support",
    providerId: "cisco",
    code: null,
    type: "professional-certification",
    tracks: ["it-support"],
    level: "beginner",
    descriptionAr:
      "اعتماد تأسيسي لدعم المستخدمين وأنظمة IT ومهام مكتب المساعدة، يهدف إلى إثبات المعرفة المناسبة لبداية العمل التقني. يمكن دعم الاستعداد بمختبر أجهزة وأنظمة تشغيل وتوثيق خطوات تشخيص مشكلات المستخدمين وحلها.",
    skillIds: ["troubleshooting", "operating-systems", "computer-hardware"],
    officialUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html",
    sourceUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html",
    prerequisitesAr:
      "لا توجد متطلبات رسمية سابقة لشهادات CCST؛ توصي Cisco بفهم موضوعات الاختبار.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr: null,
  },
  {
    id: "cisco-ccnp-enterprise",
    name: "Cisco Certified Network Professional (CCNP) Enterprise",
    providerId: "cisco",
    code: null,
    type: "professional-certification",
    tracks: ["networking"],
    level: "advanced",
    descriptionAr:
      "تتناول تشغيل شبكات المؤسسات وتوسعتها وتأمينها وضمان أدائها وأتمتتها. تجمع موضوعات أساسية وتخصصًا اختياريًا، لذا تناسب من بنى خبرة شبكية عملية ويريد التعمق، ولا تُعد سلسلة اختبارات إلزامية لكل طالب شبكات.",
    skillIds: [
      "routing",
      "switching",
      "network-security",
      "network-troubleshooting",
    ],
    officialUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccnp-enterprise/index.html",
    sourceUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccnp-enterprise/index.html",
    prerequisitesAr:
      "للحصول على الشهادة يلزم اختبار أساسي 350-401 ENCOR واختبار تخصص من الخيارات؛ لا توجد متطلبات رسمية سابقة للامتحانات المبينة.",
    examPrice: null,
    currency: null,
    status: "active",
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-25",
    notesAr:
      "هدف متقدم اختياري؛ يتطلب اختبارًا أساسيًا واختبار تخصص من الخيارات التي تحددها Cisco.",
  },
];
