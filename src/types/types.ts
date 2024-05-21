// ENUMS
export enum Subject {
  MATH = "Math",
  SCIENCE = "Science",
  SPEC_ED = "Special Education",
  HISTORY = "History",
  ENGLISH = "English",
}

export enum Grade {
  PRE_K = "Pre-Kindergarten",
  K = "Kindergarten",
  FIRST = "1st Grade",
  SECOND = "2nd Grade",
  THIRD = "3rd Grade",
  FOURTH = "4th Grade",
  FIFTH = "5th Grade",
}

export enum Credential {
  EXP = "Expired",
  ACT = "Active",
  NONE = "No credentials",
}

// ALIASES
export type PrincipalId = number;
export type TeacherId = number;
export type Location = string;
export type MatchCount = number;

// PRIMARY INTERFACES
export interface Principal {
  id: PrincipalId;
  name: string;
  location: Location;
  openRoles: OpenRole[];
}

export interface Teacher {
  id: TeacherId;
  name: string;
  geography: Location;
  subjects: Subject[];
  grades: Grade[];
  credentials: Credential;
}

export interface NormalizedData {
  principals: Principal[];
  teachers: Teacher[];
}

export interface OpenRole {
  principalId: PrincipalId;
  subject: Subject;
  grade: Grade;
}

export interface ExportFormatEntry {
  principalId: PrincipalId;
  principalQueue: TeacherId[];
}

// MAPS
export type PrincipalsMap = Map<Location, OpenRole[]>;
export type PrincipalsQueue = Map<PrincipalId, Set<TeacherId>>;
export type TeacherMatchCount = Map<TeacherId, MatchCount>;
