import cloneDeep from "clone-deep";
import { convertToExportFormat } from "../../../src/utils";
import { pQueue } from "../../data/testData";

describe("should convert PrincipalsQueue to serializable format", () => {
  it("should contain valid output data", () => {
    const pQ = cloneDeep(pQueue);
    pQ.set(1, new Set([2]));

    const validOutput = convertToExportFormat(pQ);

    expect(Array.isArray(validOutput)).toBeTruthy();
    expect(validOutput[0]).toHaveProperty("principalId");
    expect(validOutput[0]).toHaveProperty("principalQueue");
    expect(validOutput[0].principalId).toBe(1);
    expect(validOutput[0].principalQueue).toEqual([2]);
  });
});
