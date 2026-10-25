import type { CareerRoadmapTemplate } from "./types.ts";

// Editorial templates, not issuer prerequisites or personalized recommendations.
// All credential suggestions are optional choices; some cover different roles.
// Foundation cloud credentials are vendor alternatives, not a shopping list.
export const roadmapTemplates: CareerRoadmapTemplate[] = [
  {
    trackId: "web-development",
    stages: [
      {
        stage: "foundation",
        titleAr: "أساسيات صفحات الويب",
        descriptionAr:
          "ابدأ ببناء الصفحات والبرمجة وإدارة الإصدارات. شهادة أدوات التعاون خيار إضافي وليست بديلًا عن كتابة الكود.",
        skillIds: ["html", "css", "javascript", "git"],
        practicalMilestoneAr:
          "ابنِ موقعًا عربيًا متجاوبًا من ثلاث صفحات، وانشر مصدره مع ملف تعريف واضح.",
        suggestedCertificationIds: ["github-foundations"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "تطبيق ويب قابل للاختبار",
        descriptionAr:
          "اربط الواجهة بمصدر بيانات وتعلّم الاختبار والنشر الآلي. يمكنك الاكتفاء بمشروع عملي بدل اختبار مدفوع.",
        skillIds: ["react", "typescript", "rest-apis", "api-testing", "ci-cd"],
        practicalMilestoneAr:
          "أنشئ تطبيقًا يتعامل مع API عامة، ويعالج الأخطاء، ويفحص البناء تلقائيًا.",
        suggestedCertificationIds: ["github-actions"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "جودة التطبيق وبنيته",
        descriptionAr:
          "تعمق في تنظيم التطبيق وأتمتة اختباره وتشغيله. لا توجد شهادة عامة إلزامية لإتقان تطوير الويب.",
        skillIds: ["software-architecture", "test-automation", "ci-cd"],
        practicalMilestoneAr:
          "وثّق قرارات بنية تطبيقك، وأضف اختبارات لمساراته المهمة وقِس جودة استخدامه.",
        suggestedCertificationIds: [],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "software-development",
    stages: [
      {
        stage: "foundation",
        titleAr: "برمجة وحل مشكلات",
        descriptionAr:
          "اختر لغة واحدة وتدرّب على تحويل المشكلة إلى خطوات وكود، مع استخدام Git لحفظ العمل. الاعتماد المهني اختياري.",
        skillIds: [
          "programming-fundamentals",
          "python",
          "git",
          "data-structures",
        ],
        practicalMilestoneAr:
          "ابنِ برنامجًا صغيرًا لإدارة مهام مع إدخال بيانات والتحقق منها واختبارات أساسية.",
        suggestedCertificationIds: ["python-pcep"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "تصميم برنامج قابل للصيانة",
        descriptionAr:
          "اربط هياكل البيانات والبرمجة الكائنية بالاختبار والتعامل مع الخدمات. اختر ما يخدم مشروعك بدل جمع شهادات لغات متعددة.",
        skillIds: [
          "object-oriented-programming",
          "algorithms",
          "rest-apis",
          "testing-fundamentals",
        ],
        practicalMilestoneAr:
          "أنشئ خدمة بسيطة ذات واجهة موثقة واختبارات، واشرح سبب اختيارك لهياكل البيانات.",
        suggestedCertificationIds: ["python-pcap"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "بنية البرمجيات وجودتها",
        descriptionAr:
          "طوّر قرارات التصميم والمراقبة والتسليم الآلي. الشهادات المتخصصة أهداف لاحقة مرتبطة بالتقنية والعمل الفعلي.",
        skillIds: [
          "software-architecture",
          "ci-cd",
          "observability",
          "quality-assurance",
        ],
        practicalMilestoneAr:
          "أعد تنظيم مشروع قائم إلى وحدات واضحة، وقارن أثر التغيير على الاختبار والصيانة.",
        suggestedCertificationIds: ["python-pcpp1"],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "cybersecurity",
    stages: [
      {
        stage: "foundation",
        titleAr: "افهم الشبكة والنظام أولًا",
        descriptionAr:
          "ابدأ بأساسيات الشبكات والأنظمة والأمن. الاعتمادان المحتملان بدائل ذات تركيز مختلف، ولا يلزم اجتيازهما معًا.",
        skillIds: [
          "networking-fundamentals",
          "operating-systems",
          "linux",
          "security-fundamentals",
        ],
        practicalMilestoneAr:
          "جهّز مختبرًا معزولًا، وحدد أصوله وصلاحياته ومخاطره دون اختبار أي نظام غير مصرح به.",
        suggestedCertificationIds: [
          "cisco-ccst-cybersecurity",
          "isc2-cc",
          "microsoft-security-fundamentals",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "مراقبة واستجابة عملية",
        descriptionAr:
          "تدرّب على قراءة الأحداث وإدارة الهوية والثغرات قبل التخصص. اختر شهادة ملائمة للبيئة التي تعمل عليها إن احتجتها.",
        skillIds: [
          "security-monitoring",
          "incident-response",
          "identity-access-management",
          "vulnerability-management",
        ],
        practicalMilestoneAr:
          "حلل سجلات مختبرك واكتب تقرير حادث تجريبي مع الأدلة وخطوات الاحتواء.",
        suggestedCertificationIds: [
          "microsoft-security-operations-analyst",
          "isc2-sscp",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "تخصص وحوكمة أمنية",
        descriptionAr:
          "هذه أهداف مهنية طويلة المدى بعد خبرة عملية. اعتمادات الخبراء قد تشترط خبرة موثقة أو شهادات سابقة، ويجب مراجعة شروطها.",
        skillIds: [
          "security-governance",
          "risk-management",
          "it-audit",
          "network-security",
        ],
        practicalMilestoneAr:
          "اكتب نموذج تهديد وخطة معالجة مخاطر لتطبيق افتراضي، مع تبرير أولويات الحماية.",
        suggestedCertificationIds: [
          "isc2-cissp",
          "microsoft-cybersecurity-architect",
        ],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "networking",
    stages: [
      {
        stage: "foundation",
        titleAr: "اتصال وبروتوكولات",
        descriptionAr:
          "افهم انتقال البيانات والعناوين والأجهزة الأساسية. CCST خيار لتوثيق الأساس، وليس شرطًا رسميًا للانتقال إلى CCNA.",
        skillIds: [
          "networking-fundamentals",
          "tcp-ip",
          "network-troubleshooting",
        ],
        practicalMilestoneAr:
          "صمّم شبكة صغيرة في محاكي، واختبر العناوين والاتصال وتشخيص فشل بسيط.",
        suggestedCertificationIds: ["cisco-ccst-networking"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "توجيه وتبديل وأمن",
        descriptionAr:
          "وسّع المختبر بالتوجيه والتبديل والسياسات الأمنية. ابدأ بالتمرين العملي قبل اتخاذ قرار التسجيل في اختبار.",
        skillIds: [
          "routing",
          "switching",
          "network-security",
          "network-troubleshooting",
        ],
        practicalMilestoneAr:
          "ابنِ شبكة متعددة الأجزاء مع قواعد وصول، ووثّق خطة العناوين ونتائج الاختبارات.",
        suggestedCertificationIds: ["cisco-ccna"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "شبكات قابلة للتشغيل والأتمتة",
        descriptionAr:
          "تعمّق في المراقبة والأتمتة وتصميم الاتصال حسب بيئة العمل. الشهادات المتخصصة أهداف اختيارية بعد الممارسة.",
        skillIds: [
          "infrastructure-as-code",
          "shell-scripting",
          "monitoring",
          "network-security",
        ],
        practicalMilestoneAr:
          "اكتب أتمتة آمنة لجمع إعدادات مختبرك ومراقبته، مع خطة تحقق واستعادة.",
        suggestedCertificationIds: [
          "cisco-ccnp-enterprise",
          "google-professional-cloud-network-engineer",
        ],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "cloud-computing",
    stages: [
      {
        stage: "foundation",
        titleAr: "اختر منصة وابنِ أساسًا",
        descriptionAr:
          "هذه الاعتمادات بدائل تأسيسية من منصات مختلفة. اختر منصة واحدة تتعلمها، ولا تحتاج جمع الشهادات الثلاث لتبدأ.",
        skillIds: [
          "cloud-fundamentals",
          "identity-access-management",
          "networking-fundamentals",
        ],
        practicalMilestoneAr:
          "ارسم تصميم خدمة سحابية بسيطة، وحدد الصلاحيات وحدود التكلفة وخطة حذف موارد المختبر.",
        suggestedCertificationIds: [
          "aws-cloud-practitioner",
          "microsoft-azure-fundamentals",
          "google-cloud-digital-leader",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "تشغيل وتصميم حل سحابي",
        descriptionAr:
          "تدرّب عمليًا على منصة تختارها. الخيارات تغطي أدوارًا مختلفة في التصميم والتشغيل وليست سلسلة اختبارات إلزامية.",
        skillIds: [
          "cloud-architecture",
          "aws",
          "azure",
          "google-cloud",
          "monitoring",
        ],
        practicalMilestoneAr:
          "نفّذ حلًا صغيرًا مع شبكة وصلاحيات ومراقبة وخطة استعادة، باستخدام مختبر مناسب لميزانيتك.",
        suggestedCertificationIds: [
          "aws-solutions-architect-associate",
          "microsoft-azure-administrator",
          "google-associate-cloud-engineer",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "مرونة وحوكمة على نطاق أوسع",
        descriptionAr:
          "بعد خبرة فعلية، قارن المفاضلات بين الأمان والاعتمادية والتكلفة. شهادات الخبراء أهداف مستقبلية وليست نقطة بداية.",
        skillIds: [
          "cloud-architecture",
          "security-governance",
          "backup-recovery",
          "observability",
        ],
        practicalMilestoneAr:
          "أجرِ مراجعة تصميم لحل متعدد المكونات ووثّق حالات الفشل وخيارات التعافي.",
        suggestedCertificationIds: [
          "aws-solutions-architect-professional",
          "microsoft-azure-solutions-architect",
          "google-professional-cloud-architect",
        ],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "devops",
    stages: [
      {
        stage: "foundation",
        titleAr: "نظام وإصدارات وأوامر",
        descriptionAr:
          "ابدأ بفهم Linux وسطر الأوامر وGit. الأتمتة تعتمد على فهم ما تشغله، ولا تتطلب شراء شهادة تأسيسية.",
        skillIds: [
          "linux",
          "shell-scripting",
          "git",
          "docker",
          "cloud-fundamentals",
        ],
        practicalMilestoneAr:
          "شغّل تطبيقًا محليًا على Linux داخل حاوية بسيطة، واكتب سكربتًا يعيد إعداد المختبر بخطوات موثقة.",
        suggestedCertificationIds: ["cncf-kcna"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "بناء ونشر متكرر",
        descriptionAr:
          "اربط الاختبارات والنشر والحاويات والمراقبة. شهادة GitHub Actions خيار لتوثيق مهارات أداة محددة ضمن هذا المسار.",
        skillIds: ["ci-cd", "docker", "infrastructure-as-code", "monitoring"],
        practicalMilestoneAr:
          "ابنِ خط CI/CD يفحص تطبيقًا ويُنتج حاوية ويتيح العودة إلى إصدار سابق.",
        suggestedCertificationIds: ["github-actions", "cncf-cka"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "تشغيل موثوق وآمن",
        descriptionAr:
          "تعمق في تنسيق الحاويات والملاحظة التشغيلية وتأمين التسليم. الاعتمادات المتقدمة أهداف اختيارية بعد خبرة تشغيلية.",
        skillIds: [
          "kubernetes",
          "observability",
          "security-monitoring",
          "infrastructure-as-code",
          "ci-cd",
        ],
        practicalMilestoneAr:
          "جرّب فشل خدمة داخل مختبر حاويات، ثم وثّق اكتشافه واستعادته ومنع تكراره.",
        suggestedCertificationIds: [
          "cncf-cks",
          "aws-devops-engineer-professional",
          "microsoft-devops-engineer",
        ],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "data-analytics",
    stages: [
      {
        stage: "foundation",
        titleAr: "اقرأ البيانات واسأل جيدًا",
        descriptionAr:
          "تعلّم تنظيم البيانات والاستعلام عنها وقراءة المقاييس الإحصائية. المشروع البسيط أهم من جمع اعتمادات أدوات كثيرة.",
        skillIds: [
          "excel",
          "sql",
          "statistics",
          "data-visualization",
          "relational-modeling",
        ],
        practicalMilestoneAr:
          "نظف مجموعة بيانات عامة، ودوّن أسئلتك وافتراضاتك وأخطاء جودة البيانات.",
        suggestedCertificationIds: [
          "python-pced",
          "microsoft-azure-data-fundamentals",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "تحليل قابل للتفسير",
        descriptionAr:
          "اربط النمذجة والتحليل والتصور لإجابة سؤال محدد، واختر أداة واحدة بعمق قبل الانتقال إلى أدوات أخرى.",
        skillIds: [
          "python",
          "power-bi",
          "relational-modeling",
          "data-visualization",
        ],
        practicalMilestoneAr:
          "أنشئ لوحة معلومات مع قاموس للمقاييس وتفسير للنتائج وحدودها.",
        suggestedCertificationIds: [
          "microsoft-power-bi-data-analyst",
          "databricks-data-analyst-associate",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "تحليل وبيانات قابلة للتكرار",
        descriptionAr:
          "انتقل إلى خطوط معالجة موثقة وتقييم الاستنتاجات وتحسين الاستعلامات. الشهادة المتخصصة ليست بديلًا عن صحة التحليل.",
        skillIds: [
          "data-engineering",
          "query-optimization",
          "statistics",
          "model-evaluation",
        ],
        practicalMilestoneAr:
          "ابنِ خط تحليل يعيد إنتاج النتائج من البيانات الخام ويكشف تغيرات الجودة.",
        suggestedCertificationIds: ["google-professional-data-engineer"],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "artificial-intelligence",
    stages: [
      {
        stage: "foundation",
        titleAr: "برمجة ورياضيات وبيانات",
        descriptionAr:
          "ابدأ ببايثون والرياضيات والإحصاء، وتعلّم كيف تقرأ البيانات. معرفة أدوات الذكاء الاصطناعي وحدها لا تكفي لبناء النماذج.",
        skillIds: ["python", "mathematics", "statistics", "generative-ai"],
        practicalMilestoneAr:
          "استكشف مجموعة بيانات عامة واكتب تحليلًا يبين التوزيع والقيم المفقودة والتحيز المحتمل.",
        suggestedCertificationIds: [
          "aws-ai-practitioner",
          "google-generative-ai-leader",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "نماذج وقياس صحيح",
        descriptionAr:
          "درّب نموذجًا بسيطًا وافصل بيانات التدريب عن التقييم. اختر المقاييس حسب المشكلة بدل الاعتماد على رقم دقة واحد.",
        skillIds: ["machine-learning", "model-evaluation", "data-engineering"],
        practicalMilestoneAr:
          "قارن نموذجًا بخط أساس، ووثّق منع تسرب البيانات وحدود التعميم.",
        suggestedCertificationIds: [],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "نماذج أعمق واستخدام مسؤول",
        descriptionAr:
          "تعمّق في التعلم العميق والتوليدي وتشغيل النماذج بعد إتقان التقييم. الاعتمادات المهنية أهداف لاحقة حسب المنصة والخبرة.",
        skillIds: [
          "deep-learning",
          "generative-ai",
          "cloud-architecture",
          "model-evaluation",
        ],
        practicalMilestoneAr:
          "ابنِ نموذجًا تجريبيًا أو تقييمًا لتطبيق توليدي، مع قياس الجودة والتحيز وحدود الاستخدام.",
        suggestedCertificationIds: [
          "google-professional-machine-learning-engineer",
        ],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "database-administration",
    stages: [
      {
        stage: "foundation",
        titleAr: "نمذجة واستعلام",
        descriptionAr:
          "افهم الجداول والعلاقات والقيود وSQL قبل إدارة الأنظمة. لا يلزم اعتماد مهني لبدء مشروع قاعدة بيانات.",
        skillIds: ["sql", "relational-modeling", "postgresql"],
        practicalMilestoneAr:
          "صمّم قاعدة بيانات لمكتبة مع قيود صحيحة واستعلامات تجيب عن احتياجاتها.",
        suggestedCertificationIds: ["microsoft-azure-data-fundamentals"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "تشغيل آمن واستعادة",
        descriptionAr:
          "تدرّب على الصلاحيات والنسخ الاحتياطي والاستعادة ومراقبة الأداء. اختر تقنية تتعلمها عمليًا بدل القفز بين اختبارات جهات مختلفة.",
        skillIds: [
          "database-administration",
          "backup-recovery",
          "identity-access-management",
          "query-optimization",
        ],
        practicalMilestoneAr:
          "نفّذ نسخًا احتياطيًا واستعادة في مختبر، واختبر مستخدمًا محدود الصلاحيات.",
        suggestedCertificationIds: ["microsoft-azure-database-administrator"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "أداء واعتمادية البيانات",
        descriptionAr:
          "وسّع التجارب لتحسين الاستعلامات ومعالجة الأعطال ونقل البيانات. أي اعتماد متقدم هدف اختياري بعد خبرة حقيقية بالمنتج.",
        skillIds: [
          "query-optimization",
          "data-engineering",
          "backup-recovery",
          "database-administration",
        ],
        practicalMilestoneAr:
          "قارن خطط تنفيذ استعلامات قبل التحسين وبعده، واختبر خطة تعافٍ موثقة.",
        suggestedCertificationIds: [
          "google-professional-cloud-database-engineer",
        ],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "it-support",
    stages: [
      {
        stage: "foundation",
        titleAr: "أجهزة وأنظمة وتشخيص",
        descriptionAr:
          "تعلّم مكونات الحاسب ونظام التشغيل وأساس الشبكة. ابدأ بممارسة منظمة وتوثيق واضح دون الحاجة إلى بيانات هوية أو حسابات طلاب.",
        skillIds: [
          "computer-hardware",
          "operating-systems",
          "networking-fundamentals",
          "troubleshooting",
        ],
        practicalMilestoneAr:
          "أنشئ دليل تشخيص لخمس مشكلات شائعة، مع الأدلة وخطوات الحل والتحقق.",
        suggestedCertificationIds: ["cisco-ccst-it-support"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "إدارة أنظمة وأجهزة",
        descriptionAr:
          "تعمق في أنظمة Windows أو Linux وإدارة الأجهزة والاستعادة. اختيارك للمنصة يعتمد على البيئة التي تريد دعمها.",
        skillIds: [
          "windows",
          "linux",
          "endpoint-management",
          "backup-recovery",
        ],
        practicalMilestoneAr:
          "جهّز مختبر أجهزة أو أنظمة افتراضية مع مستخدمين وصلاحيات ونسخة احتياطية قابلة للاستعادة.",
        suggestedCertificationIds: [
          "linux-foundation-lfcs",
          "redhat-rhcsa",
          "microsoft-windows-server-administrator",
        ],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "أتمتة وعمليات دعم",
        descriptionAr:
          "طوّر عمليات الإدارة والأمان والمراقبة مع خبرة ميدانية. الاعتماد المتقدم يظل خيارًا مرتبطًا ببيئة العمل وليس شرطًا عامًا للدعم.",
        skillIds: [
          "shell-scripting",
          "monitoring",
          "security-governance",
          "identity-access-management",
        ],
        practicalMilestoneAr:
          "أتمت مهمة إدارية متكررة، وأضف سجل تشغيل وخطة تراجع وإجراء تصعيد واضح.",
        suggestedCertificationIds: [],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
  {
    trackId: "software-testing",
    stages: [
      {
        stage: "foundation",
        titleAr: "أساسيات الجودة والاختبار",
        descriptionAr:
          "افهم هدف الاختبار وكيفية تصميم الحالات وتوثيق العيوب. المشاريع التدريبية تكفي للبدء، والاعتماد التأسيسي خيار إضافي.",
        skillIds: [
          "testing-fundamentals",
          "test-case-design",
          "quality-assurance",
        ],
        practicalMilestoneAr:
          "اكتب خطة اختبار لتطبيق تجريبي، ونفّذ الحالات ووثّق عيوبًا قابلة لإعادة الإنتاج.",
        suggestedCertificationIds: ["istqb-ctfl", "python-pcet"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "intermediate",
        titleAr: "اختبارات واجهات وأتمتة",
        descriptionAr:
          "اجمع بين الاختبار اليدوي والبرمجة واختبار API. اختر أتمتة ما يضيف قيمة فعلية بدل نسخ كل فحص يدوي إلى سكربت.",
        skillIds: ["api-testing", "test-automation", "javascript", "python"],
        practicalMilestoneAr:
          "ابنِ مجموعة اختبارات API واختبارات لمسار مستخدم مهم، مع تقارير نتائج مفهومة.",
        suggestedCertificationIds: ["python-pcat"],
        certificationChoice: "optional-options",
        futureGoal: false,
      },
      {
        stage: "advanced",
        titleAr: "استراتيجية اختبار مستدامة",
        descriptionAr:
          "تعمق في الأولويات وصيانة الأتمتة ودمج الجودة في التسليم. الاعتمادات المتقدمة قد تشترط أساسًا وخبرة، فتُعامل كأهداف مستقبلية.",
        skillIds: [
          "quality-assurance",
          "test-automation",
          "ci-cd",
          "test-case-design",
        ],
        practicalMilestoneAr:
          "أعد تصميم استراتيجية اختبار لمشروع، وبرر توزيع الاختبارات وتكلفتها وقابليتها للصيانة.",
        suggestedCertificationIds: ["istqb-ctal-tae"],
        certificationChoice: "optional-options",
        futureGoal: true,
      },
    ],
  },
];
