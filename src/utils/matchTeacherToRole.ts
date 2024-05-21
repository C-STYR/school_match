import {
  OpenRole,
  PrincipalsQueue,
  Teacher,
  TeacherMatchCount,
} from "../types/types";

export interface MatchTeacherToRole {
  teacher: Teacher;
  principalsQueue: PrincipalsQueue;
  role: OpenRole;
  teacherMatchCount: TeacherMatchCount;
}

export function matchTeacherToRole({
  teacher,
  principalsQueue,
  role,
  teacherMatchCount,
}: MatchTeacherToRole): boolean {
  const { id } = teacher;

  // set default matchLimit to 3
  const matchLimit = Number(process.env.MATCH_LIMIT) || 3;

  // disallow teachers that have already met the matchLimit value
  if ((teacherMatchCount.get(id) || 0) >= matchLimit) {
    return false;
  }

  // ignore teachers that have already matched with this principal
  if (principalsQueue.get(role.principalId)?.has(id)) {
    return false;
  }

  // check for grade/subject alignment
  if (
    teacher.subjects.includes(role.subject) &&
    teacher.grades.includes(role.grade)
  ) {
    return true;
  }

  return false;
}
