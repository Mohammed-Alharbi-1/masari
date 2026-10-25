export const majorOptions = [
  { id: "computer-science", labelAr: "علوم الحاسب" },
  { id: "software-engineering", labelAr: "هندسة البرمجيات" },
  { id: "information-technology", labelAr: "تقنية المعلومات" },
  { id: "cybersecurity", labelAr: "الأمن السيبراني" },
  { id: "information-systems", labelAr: "نظم المعلومات" },
  { id: "data-science", labelAr: "علم البيانات" },
  { id: "other-technical", labelAr: "تخصص تقني آخر" },
] as const;

export const academicYearOptions = [
  { id: "first-year", labelAr: "السنة الأولى" },
  { id: "second-year", labelAr: "السنة الثانية" },
  { id: "third-year", labelAr: "السنة الثالثة" },
  { id: "fourth-year", labelAr: "السنة الرابعة" },
  { id: "fifth-year-or-more", labelAr: "السنة الخامسة أو أكثر" },
  { id: "graduate", labelAr: "خريج" },
] as const;

export const knowledgeLevelOptions = [
  { id: "beginner", labelAr: "مبتدئ" },
  { id: "intermediate", labelAr: "متوسط" },
  { id: "advanced", labelAr: "متقدم" },
  { id: "unsure", labelAr: "مو متأكد" },
] as const;

export const budgetOptions = [
  { id: "free-preferred", labelAr: "أفضل الخيارات المجانية" },
  { id: "up-to-500", labelAr: "حتى 500 ريال" },
  { id: "501-to-1000", labelAr: "من 501 إلى 1000 ريال" },
  { id: "over-1000", labelAr: "أكثر من 1000 ريال" },
  { id: "undecided", labelAr: "ما حددت ميزانية" },
] as const;

export const studyTimeOptions = [
  { id: "under-5", labelAr: "أقل من 5 ساعات" },
  { id: "5-to-10", labelAr: "من 5 إلى 10 ساعات" },
  { id: "over-10", labelAr: "أكثر من 10 ساعات" },
  { id: "unsure", labelAr: "مو متأكد" },
] as const;

export const questionnaireSteps = [
  { labelAr: "الدراسة", titleAr: "خلنا نعرف أكثر عن دراستك" },
  { labelAr: "المجال", titleAr: "وش المجال اللي تشوف مستقبلك فيه؟" },
  { labelAr: "المهارات", titleAr: "حدد مهاراتك ووش حاب تتعلم" },
  { labelAr: "التفضيلات", titleAr: "خلنا نضبط مسارك على وقتك ومستواك" },
] as const;

export function getOptionLabel(
  options: readonly { id: string; labelAr: string }[],
  id: string,
): string {
  return options.find((option) => option.id === id)?.labelAr ?? "غير محدد";
}
