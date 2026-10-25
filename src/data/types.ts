export const careerTrackIds = [
  "web-development",
  "cybersecurity",
  "networking",
  "cloud-computing",
] as const;
export type CareerTrack = (typeof careerTrackIds)[number];

export const certificationLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "unknown",
] as const;
export type CertificationLevel = (typeof certificationLevels)[number];
export const credentialTypes = [
  "professional-certification",
  "course-completion",
  "digital-badge",
] as const;
export type CredentialType = (typeof credentialTypes)[number];
export const certificationStatuses = ["active", "retired", "unknown"] as const;
export type CertificationStatus = (typeof certificationStatuses)[number];
export const verificationStatuses = ["verified", "pending"] as const;
export type VerificationStatus = (typeof verificationStatuses)[number];

export interface Certification {
  id: string;
  name: string;
  providerId: string;
  code: string | null;
  type: CredentialType;
  tracks: CareerTrack[];
  /** Masari's broad guidance level; not an exam difficulty rating. */
  level: CertificationLevel;
  descriptionAr: string;
  skills: string[];
  officialUrl: string;
  sourceUrl: string;
  /** Explicitly distinguishes recommended preparation from mandatory prerequisites. */
  prerequisitesAr: string | null;
  examPrice: number | null;
  currency: string | null;
  status: CertificationStatus;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string | null;
  /** Relevant issuer notices, such as a change of exam version. */
  notesAr: string | null;
}

export interface CertificationProvider {
  id: string;
  name: string;
  officialWebsite: string;
  /** Approved issuer domains, including official certification hosting partners. */
  sourceDomains: string[];
}

export interface CareerTrackInfo {
  id: CareerTrack;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
}

export const levelLabels: Record<CertificationLevel, string> = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
  unknown: "غير محدد",
};
export const credentialTypeLabels: Record<CredentialType, string> = {
  "professional-certification": "شهادة احترافية",
  "course-completion": "شهادة إتمام دورة",
  "digital-badge": "شارة رقمية",
};
export const statusLabels: Record<CertificationStatus, string> = {
  active: "متاحة لدى الجهة",
  retired: "متقاعدة — غير متاحة",
  unknown: "حالة الإتاحة غير مؤكدة",
};
export const verificationLabels: Record<VerificationStatus, string> = {
  verified: "تم التحقق من المصدر",
  pending: "بانتظار التحقق",
};
