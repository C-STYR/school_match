import cloneDeep from "clone-deep";
import { Principal } from "../../../src/types/types";
import { generatePrincipalsMap } from "../../../src/utils";
import { pMap, rawPrincipal } from "../../data/testData";

describe("tests generatePrincipalsMap", () => {
  it("should create a valid PrincipalsMap", () => {
    const result = generatePrincipalsMap(rawPrincipal as Principal[]);
    expect(result).toEqual(pMap);
  });

  it("should add open roles to a pre-existing location", () => {
    const anotherPrincipal = cloneDeep(rawPrincipal[0]);
    anotherPrincipal.id = 2;
    rawPrincipal.push(anotherPrincipal);
    const result = generatePrincipalsMap(rawPrincipal as Principal[]);
    expect(result.get("Cleveland")?.length).toEqual(2);
  });
});
