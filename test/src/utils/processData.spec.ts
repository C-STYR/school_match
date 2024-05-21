import { processData } from "../../../src/utils";
import { pMap, rawTeacher as HankScorpio } from "../../data/testData";
import { Credential, PrincipalsQueue, Teacher } from "../../../src/types/types";
import cloneDeep from "clone-deep";

describe("tests processData", () => {
  it("should return a valid PrincipalsQueue", () => {
    const output = processData({
      teachers: [HankScorpio as Teacher],
      principalsMap: pMap,
    });

    const expected: PrincipalsQueue = new Map();
    expected.set(1, new Set([3]));
    expect(output).toEqual(expected);
  });

  it("should correctly match teachers with open roles", () => {
    const output = processData({
      teachers: [HankScorpio as Teacher],
      principalsMap: pMap,
    });
    expect(output.get(1)).toContain(3);
  });

  it("should add a teacher to a queue that already exists", () => {
    const AlsoQualified = cloneDeep(HankScorpio);
    AlsoQualified.id = 2;
    const output = processData({
      teachers: [HankScorpio as Teacher, AlsoQualified as Teacher],
      principalsMap: pMap,
    });
    expect(output.get(1)?.has(2)).toBeTruthy();
  });

  // sad paths
  it("should not match teachers with inappropriate roles", () => {
    const EvilScorpio = cloneDeep(HankScorpio);
    EvilScorpio.id = 9;
    EvilScorpio.subjects = ["World Conquest"];
    const output = processData({
      teachers: [HankScorpio as Teacher, EvilScorpio as Teacher],
      principalsMap: pMap,
    });
    expect(output.get(1)?.has(9)).toBeFalsy();
  });

  it("should skip processing a teacher with an invalid credential", () => {
    const Retiree = cloneDeep(HankScorpio);
    Retiree.id = 5;
    Retiree.credentials = Credential.EXP;
    const output = processData({
      teachers: [HankScorpio as Teacher, Retiree as Teacher],
      principalsMap: pMap,
    });
    expect(output.get(1)?.has(5)).toBeFalsy();
  });

  it("should skip processing a teacher with no location match", () => {
    const HillBilly = cloneDeep(HankScorpio);
    HillBilly.geography = "Branson, Missouri";
    HillBilly.id = 4;
    const output = processData({
      teachers: [HankScorpio as Teacher, HillBilly as Teacher],
      principalsMap: pMap,
    });
    expect(output.get(1)?.has(4)).toBeFalsy();
  });
});
