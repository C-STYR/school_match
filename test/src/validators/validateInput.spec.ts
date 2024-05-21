import { validateInput } from "../../../src/validators";
import { data1 } from "../../data/testSample";
import cloneDeep from "clone-deep";

describe("tests validateInput()", () => {
  // happy path
  it("should check for required fields", () => {
    const result = validateInput(data1);
    expect(result).toBeUndefined();
  });

  // sad paths

  it("should thrown an error when missing teachers field", () => {
    const missingTeachers: any = cloneDeep(data1);
    delete missingTeachers.teachers;
    expect(() => validateInput(missingTeachers)).toThrow(
      "invalid format - missing TEACHERS",
    );
  });

  it("should thrown an error when missing teachers field", () => {
    const missingPrincipals: any = cloneDeep(data1);
    delete missingPrincipals.principals;
    expect(() => validateInput(missingPrincipals)).toThrow(
      "invalid format - missing PRINCIPALS",
    );
  });

  it("should thrown an error when missing teachers field", () => {
    const badTeachers: any = cloneDeep(data1);
    badTeachers.teachers = 0;
    expect(() => validateInput(badTeachers)).toThrow(
      "invalid format - TEACHERS is not an ARRAY",
    );
  });

  it("should thrown an error when missing teachers field", () => {
    const badPrincipals: any = cloneDeep(data1);
    badPrincipals.principals = 0;
    expect(() => validateInput(badPrincipals)).toThrow(
      "invalid format - PRINCIPALS is not an ARRAY",
    );
  });
});
