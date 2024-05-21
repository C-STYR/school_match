import { validateTeacher } from "../../../src/validators";
import { Teacher } from "../../../src/types/types";
import { data1 } from "../../data/testSample";

describe("tests validateTeacher()", () => {
  // happy path
  it("should return true for a teacher with a valid cert", () => {
    const teacher = data1.teachers[1] as Teacher;
    expect(validateTeacher(teacher)).toBeTruthy();
  });

  // sad path
  it("should return false for a teacher with an expired cert", () => {
    const teacher = data1.teachers[0] as Teacher;
    expect(validateTeacher(teacher)).toBeFalsy();
  });
});
