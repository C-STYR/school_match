import { Principal, PrincipalsMap } from "../types/types";

/*
Creates a hashmap of all opened roles indexed by location; this aids in
lookup efficiency during the matching process
*/

export function generatePrincipalsMap(principals: Principal[]): PrincipalsMap {
  const geoMap: PrincipalsMap = new Map();

  for (const principal of principals) {
    const { id, location } = principal;
    for (const role of principal.openRoles) {
      const { subject, grade } = role;
      const consolidatedRole = {
        principalId: id,
        subject,
        grade,
      };
      geoMap.has(location)
        ? geoMap.get(location)?.push(consolidatedRole)
        : geoMap.set(location, [consolidatedRole]);
    }
  }
  return geoMap;
}
