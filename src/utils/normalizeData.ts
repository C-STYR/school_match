import { NormalizedData } from "../types/types";

// token normalizer - prod implementation would depend upon external factors
export function normalizeData(data: any): NormalizedData {
  // perform some normalization process here
  // might also be part of validation step

  // possible examples:
  // remove teachers with invalid credentials
  // remove principals with empty openRoles array

  return data as NormalizedData;
}
