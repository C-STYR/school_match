import { normalizeData } from "../../../src/utils";
import { data1 } from "../../data/testSample";

describe("tests normalizeData", () => {
  // token test for token function
  it("should normalize data", () => {
    expect(normalizeData(data1)).toEqual(data1);
  });
});
