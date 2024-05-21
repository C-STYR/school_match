import { matchTeacherToRole } from "../../../src/utils";
import {
  openRole,
  pQueue,
  teacherMatchCount,
  rawTeacher as HankScorpio,
} from "../../data/testData";
import { PrincipalsQueue, Teacher } from "../../../src/types/types";
import cloneDeep from "clone-deep";

describe("tests matchTeacherToRole", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("should return false if the teacher has reached the match limit", () => {
    process.env.MATCH_LIMIT = "1";
    const matchCount = cloneDeep(teacherMatchCount);
    matchCount.set(3, 1);
    const pQ = cloneDeep(pQueue);
    pQ.set(1, new Set([1]));

    const result = matchTeacherToRole({
      teacher: HankScorpio as Teacher,
      principalsQueue: pQ,
      role: openRole,
      teacherMatchCount: matchCount,
    });

    expect(result).toBeFalsy();
  });

  it("should return false if the teacher has already matched with this principal", () => {
    process.env.MATCH_LIMIT = "2";
    const matchCount = cloneDeep(teacherMatchCount);
    matchCount.set(3, 1);
    const pQ = cloneDeep(pQueue);
    pQ.set(1, new Set([3]));

    const result = matchTeacherToRole({
      teacher: HankScorpio as Teacher,
      principalsQueue: pQ,
      role: openRole,
      teacherMatchCount: matchCount,
    });

    expect(result).toBeFalsy();
  });

  it("should return true if grade & subject match", () => {
    process.env.MATCH_LIMIT = "3";
    const matchCount = cloneDeep(teacherMatchCount);
    matchCount.set(3, 1);
    const pQ = cloneDeep(pQueue);
    pQ.set(1, new Set([1]));

    const result = matchTeacherToRole({
      teacher: HankScorpio as Teacher,
      principalsQueue: pQ,
      role: openRole,
      teacherMatchCount: matchCount,
    });

    expect(result).toBeTruthy();
  });
});
