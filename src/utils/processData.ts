import {
  PrincipalsMap,
  PrincipalsQueue,
  TeacherMatchCount,
  TeacherId,
  Teacher,
} from "../types/types";
import { validateTeacher } from "../validators";
import { matchTeacherToRole } from "./matchTeacherToRole";

export interface Match {
  teachers: Teacher[];
  principalsMap: PrincipalsMap;
}

/*
Creates the output queue in the form of a hashmap, indexed by Principal ID
*/
export function processData({
  teachers,
  principalsMap,
}: Match): PrincipalsQueue {
  const principalsQueue: PrincipalsQueue = new Map();

  // track the number of matches each teacher has
  const teacherMatchCount: TeacherMatchCount = new Map();

  // check teachers against open roles in their location
  for (const teacher of teachers) {
    const { id } = teacher;

    // discard teachers with invalid credentials (if not done during normalization/validation)
    if (!validateTeacher(teacher)) {
      continue;
    }

    // discard teachers from a location with no open roles
    const locationMatch = principalsMap.get(teacher.geography);
    if (!locationMatch || !locationMatch.length) {
      continue;
    }

    // once location match is established, check for teacher/role match
    for (const role of locationMatch) {
      const matchFound = matchTeacherToRole({
        teacher,
        role,
        principalsQueue,
        teacherMatchCount,
      });

      if (matchFound) {
        // add teacher id to principal's queue
        principalsQueue.has(role.principalId)
          ? principalsQueue.get(role.principalId)?.add(id)
          : principalsQueue.set(role.principalId, new Set<TeacherId>().add(id));

        // update match count
        teacherMatchCount.set(id, (teacherMatchCount.get(id) || 0) + 1);
      }
    }
  }
  return principalsQueue;
}
