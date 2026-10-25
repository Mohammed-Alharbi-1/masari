import { certifications } from "../data/certifications.ts";
import { careerTracks } from "../data/careerTracks.ts";
import { roadmapTemplates } from "../data/roadmapTemplates.ts";
import { skills } from "../data/skills.ts";
import { roadmapStages } from "../data/types.ts";
import type { Certification, CareerRoadmapStage } from "../data/types.ts";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire.ts";
import type {
  PersonalizedRoadmap,
  RoadmapCertificationOption,
} from "../types/roadmap.ts";
import { validateQuestionnaire } from "./questionnaireValidation.ts";

const platforms = [
  { skillId: "aws", providerId: "aws" },
  { skillId: "azure", providerId: "microsoft" },
  { skillId: "google-cloud", providerId: "google-cloud" },
] as const;
const languageIds = ["javascript", "typescript", "java", "csharp"];
const skillNames = (ids: string[]) =>
  ids.map((id) => skills.find((skill) => skill.id === id)!.nameAr).join("، ");

/** Pure rules over the validated answer schema. The optional catalog enables fault fixtures. */
export function generatePersonalizedRoadmap(
  input: StudentQuestionnaireAnswers,
  catalog: readonly Certification[] = certifications,
): PersonalizedRoadmap {
  const validated = validateQuestionnaire(input);
  if (!validated.valid) throw new Error("Invalid questionnaire answers");
  const answers = validated.answers;
  const template = roadmapTemplates.find(
    (item) => item.trackId === answers.careerTrack,
  )!;
  const track = careerTracks.find((item) => item.id === answers.careerTrack)!;
  const known = new Set(answers.existingSkillIds);
  const desired = new Set(answers.desiredSkillIds);
  const indicated = new Set([...known, ...desired]);
  // An explicit desired platform wins over a platform only reported as familiar.
  const desiredPlatforms = platforms.filter((platform) =>
    desired.has(platform.skillId),
  );
  const selectedPlatforms = desiredPlatforms.length
    ? desiredPlatforms
    : platforms.filter((platform) => known.has(platform.skillId));
  const preferredPlatform =
    selectedPlatforms.length === 1 ? selectedPlatforms[0] : null;
  const cloud = answers.careerTrack === "cloud-computing";
  const languageSensitive =
    answers.careerTrack === "software-development" ||
    answers.careerTrack === "software-testing";
  const pythonIndicated = indicated.has("python");
  const otherLanguage = languageIds.some((id) => indicated.has(id));
  const desiredOtherLanguage = languageIds.some((id) => desired.has(id));
  const omitPython =
    languageSensitive &&
    (!pythonIndicated || (desiredOtherLanguage && !desired.has("python")));
  const assignedFocus = new Set<string>();
  const claimedCertifications = new Set<string>();
  const guidanceNotesAr: string[] = [
    "هذه إرشادات تعليمية مبنية على إجاباتك وقواعد واضحة، وليست ضمانًا لوظيفة أو إثباتًا لإتقان المهارات. الشهادات خيارات وليست مشتريات مطلوبة.",
    "المعرفة التي ذكرتها تقييم شخصي؛ لا نعتبر أي مهارة أو مرحلة منجزة تلقائيًا. جرّب المشروع العملي للتحقق مما تحتاج تطويره.",
  ];
  if (omitPython)
    guidanceNotesAr.push(
      otherLanguage
        ? "اهتمامك بلغة أخرى واضح؛ ركزنا على مهارات البرمجة القابلة للنقل ومشاريعك، ولم نفرض لغة Python أو شهاداتها."
        : "ما حددت اهتمامًا بلغة Python؛ اختر لغة مناسبة لمشروعك، ولا تحتاج شهادة لغة حتى تتقدم.",
    );
  if (cloud)
    guidanceNotesAr.push(
      preferredPlatform
        ? `اهتمامك بمنصة ${skillNames([preferredPlatform.skillId])} يوجّه خيارات المراحل للمنصة نفسها؛ الشهادات تظل اختيارية ولا تثبت أهليتك.`
        : "ما اخترنا منصة أفضل عنك. مسارات المنصات أدناه بدائل متوازية؛ اختر مسارًا واحدًا للممارسة ولا تجمع شهاداتها كلها. الأدوار التي تقيسها قد تختلف.",
    );
  if (answers.budget && answers.budget !== "undecided")
    guidanceNotesAr.push(
      "أسعار الاختبارات غير مؤكدة حاليًا. تقدر تبدأ بتطوير المهارات والمشاريع العملية، وتتحقق من سعر الشهادة من المصدر الرسمي قبل التسجيل.",
    );
  const timeNotes = {
    "under-5":
      "وقتك الأسبوعي أقل من 5 ساعات؛ ركز على مهارة واحدة ومهمة عملية صغيرة في كل مرة، دون استعجال المراحل.",
    "5-to-10":
      "مع وقتك الأسبوعي من 5 إلى 10 ساعات، وازن بين فهم المفاهيم وتطبيقها في مشروع صغير.",
    "over-10":
      "مع أكثر من 10 ساعات أسبوعيًا، تقدر تجمع بين تعلم مهارات مترابطة وتجربتها عمليًا. انتقل بحسب فهمك ونتيجة التطبيق.",
  };
  if (answers.weeklyStudyTime && answers.weeklyStudyTime !== "unsure")
    guidanceNotesAr.push(timeNotes[answers.weeklyStudyTime]);

  function candidates(
    stage: CareerRoadmapStage,
    providerId?: string,
  ): Certification[] {
    return stage.suggestedCertificationIds.flatMap((id) => {
      const credential = catalog.find((item) => item.id === id);
      if (
        !credential ||
        credential.status !== "active" ||
        credential.verificationStatus !== "verified" ||
        !credential.tracks.includes(answers.careerTrack) ||
        claimedCertifications.has(id)
      )
        return [];
      const appropriate =
        stage.stage === "foundation"
          ? credential.level === "beginner"
          : stage.stage === "intermediate"
            ? credential.level === "intermediate" ||
              credential.level === "beginner"
            : credential.level === "advanced";
      if (!appropriate || (providerId && credential.providerId !== providerId))
        return [];
      if (omitPython && credential.skillIds.includes("python")) return [];
      if (!cloud && preferredPlatform) {
        const credentialPlatforms = platforms.filter((platform) =>
          credential.skillIds.includes(platform.skillId),
        );
        if (
          credentialPlatforms.length &&
          !credentialPlatforms.some(
            (platform) => platform.skillId === preferredPlatform.skillId,
          )
        )
          return [];
      }
      return [credential];
    });
  }
  // Lexicographic matching, not a proficiency/compatibility score. Stable template order breaks ties.
  function rank(credential: Certification): number[] {
    return [
      credential.skillIds.filter((id) => desired.has(id) && !known.has(id))
        .length,
      credential.skillIds.filter((id) => desired.has(id) && known.has(id))
        .length,
      credential.skillIds.filter(
        (id) => !known.has(id) && track.skillIds.includes(id),
      ).length,
    ];
  }
  function compare(a: Certification, b: Certification) {
    const ar = rank(a),
      br = rank(b);
    for (let index = 0; index < ar.length; index++)
      if (ar[index] !== br[index]) return br[index] - ar[index];
    return 0;
  }
  function option(
    credential: Certification,
    stage: CareerRoadmapStage,
    platformSkill?: string,
  ): RoadmapCertificationOption {
    const matches = credential.skillIds.filter((id) => desired.has(id));
    const missing = credential.skillIds.filter(
      (id) => stage.skillIds.includes(id) && !known.has(id),
    );
    const familiar = credential.skillIds.filter((id) => known.has(id));
    const reason = matches.length
      ? `تغطي اهتمامك بتطوير ${skillNames(matches.slice(0, 3))}.`
      : missing.length
        ? `تدعم ${skillNames(missing.slice(0, 3))} التي لم تذكر معرفة سابقة بها.`
        : familiar.length
          ? `تتيح مراجعة ${skillNames(familiar.slice(0, 3))} التي ذكرت معرفتها من خلال نطاق اختبار الجهة؛ ليست إثبات إتقان مسبق.`
          : `خيار تحريري لمجال ${track.nameAr} في مرحلة «${stage.titleAr}»؛ راجع نطاقه لتقرر إن كان يناسب مشروعك.`;
    return {
      certificationId: credential.id,
      optional: true,
      futureGoal: stage.stage === "advanced",
      reasonAr: `${reason}${platformSkill ? ` مرتبط بمنصة ${skillNames([platformSkill])}.` : ""}${stage.stage === "advanced" ? " هدف مستقبلي بعد ممارسة وخبرة، وليس نقطة البداية." : ""}`,
      warningAr:
        "تحقق من متطلبات الخبرة والشهادات السابقة لدى الجهة المانحة قبل التسجيل. اجتياز الاختبار لا يعني بالضرورة استيفاء شروط الحصول على الاعتماد الكامل.",
    };
  }
  const stages = roadmapStages.map((stageId) => {
    const source = template.stages.find((stage) => stage.stage === stageId)!;
    const stageSkills = source.skillIds.filter(
      (id) =>
        !(omitPython && id === "python") &&
        !(
          cloud &&
          platforms.some((platform) => platform.skillId === id) &&
          id !== preferredPlatform?.skillId
        ),
    );
    const ordered = [...stageSkills].sort((a, b) => {
      const category = (id: string) =>
        desired.has(id) && !known.has(id)
          ? 0
          : !known.has(id)
            ? 1
            : desired.has(id)
              ? 2
              : 3;
      return category(a) - category(b);
    });
    const focus = ordered.filter(
      (id) => !assignedFocus.has(id) && (!known.has(id) || desired.has(id)),
    );
    const revisit = ordered.filter((id) => assignedFocus.has(id));
    focus.forEach((id) => assignedFocus.add(id));
    const eligible =
      cloud && !preferredPlatform
        ? []
        : candidates(source, cloud ? preferredPlatform?.providerId : undefined)
            .sort(compare)
            .slice(0, 3);
    eligible.forEach((credential) => claimedCertifications.add(credential.id));
    const options = eligible.map((credential) =>
      option(
        credential,
        source,
        cloud ? preferredPlatform?.skillId : undefined,
      ),
    );
    const desiredMissing = focus.filter(
      (id) => desired.has(id) && !known.has(id),
    );
    const reasonAr = desiredMissing.length
      ? `ابدأ هنا بـ${skillNames(desiredMissing)} لأنها من رغباتك ولم تذكر معرفتها. ترتيب المراحل يحافظ على الأساس قبل التعمق.`
      : focus.some((id) => !known.has(id))
        ? "قدمنا المفاهيم التي لم تذكر معرفتها قبل مراجعة المهارات المألوفة؛ اختبر فهمك بالمشروع العملي."
        : focus.length
          ? "ركز على تعميق المهارات التي تعرفها وتريد تطويرها، ثم اختبر فهمك في المشروع."
          : "أغلب مفاهيم هذه المرحلة مألوفة لك أو ظهرت سابقًا؛ استخدم المشروع لتطبيقها بعمق ومراجعة ما يحتاج تدريبًا.";
    return {
      stage: source.stage,
      titleAr: source.titleAr,
      descriptionAr: source.descriptionAr,
      skillIds: ordered,
      knownSkillIds: ordered.filter((id) => known.has(id)),
      desiredSkillIds: ordered.filter((id) => desired.has(id)),
      focusSkillIds: focus,
      deepenSkillIds: focus.filter((id) => known.has(id) && desired.has(id)),
      revisitSkillIds: revisit,
      practicalMilestoneAr: source.practicalMilestoneAr,
      reasonAr,
      highlightedCertification: options[0] ?? null,
      alternativeCertifications: options.slice(1),
      futureGoal: source.stage === "advanced",
    };
  });
  const included = new Set(stages.flatMap((stage) => stage.skillIds));
  const additionalFocusSkillIds = answers.desiredSkillIds
    .filter((id) => !included.has(id))
    .sort(
      (a, b) =>
        Number(known.has(a)) - Number(known.has(b)) ||
        track.skillIds.indexOf(a) - track.skillIds.indexOf(b),
    );
  const providerPaths =
    cloud && !preferredPlatform
      ? (selectedPlatforms.length ? selectedPlatforms : platforms).map(
          (platform) => ({
            ...platform,
            stageOptions: roadmapStages.map((stageId) => {
              const source = template.stages.find(
                (stage) => stage.stage === stageId,
              )!;
              const credential = candidates(source, platform.providerId).sort(
                compare,
              )[0];
              return {
                stage: stageId,
                option: credential
                  ? option(credential, source, platform.skillId)
                  : null,
              };
            }),
          }),
        )
      : [];
  const missingFoundation = stages[0].focusSkillIds.filter(
    (id) => !known.has(id),
  );
  const levelNote =
    answers.knowledgeLevel === "beginner"
      ? "بما أنك وصفت مستواك بالمبتدئ، خذ الأساس والمشروع الأول خطوة خطوة."
      : answers.knowledgeLevel === "intermediate"
        ? "مستواك المتوسط يساعدك تربط المفاهيم بالتطبيق، مع مراجعة الأساس الذي تحتاجه."
        : answers.knowledgeLevel === "advanced"
          ? "تقييمك المتقدم يشجعك على مشروع أعمق، لكنه لا يلغي مراجعة الأساس أو شروط الجهات المانحة."
          : "اعتمدنا على المهارات التي ذكرتها وترتيب المجال، دون افتراض مستوى لم تحدده.";
  const startingPointAr = missingFoundation.length
    ? `${levelNote} ابدأ بمراجعة ${skillNames(missingFoundation.slice(0, 3))} لأنها من أساس المجال ولم تذكر معرفتها.`
    : `${levelNote} جرّب المشروع التأسيسي للتحقق من فهمك، ثم تعمق في أولويات المراحل التالية؛ لم نعتبر الأساس منجزًا تلقائيًا.`;
  return {
    trackId: answers.careerTrack,
    knownSkillIds: track.skillIds.filter((id) => known.has(id)),
    desiredSkillIds: track.skillIds.filter((id) => desired.has(id)),
    stages,
    additionalFocusSkillIds,
    providerPaths,
    guidanceNotesAr,
    startingPointAr,
  };
}
