import { Credential, Teacher } from "../types/types";

export function validateTeacher(teacher: Teacher): boolean {
  if (teacher.credentials !== Credential.ACT) {
    return false;
  }

  // add any further validations as that definition changes

  return true;
}
