import { ExportFormatEntry, PrincipalsQueue } from "../types/types";

/*
converts the Map object to an array of arrays
*/
export function convertToExportFormat(
  queue: PrincipalsQueue,
): ExportFormatEntry[] {
  const output: ExportFormatEntry[] = [];
  for (const [pid, tids] of queue) {
    output.push({
      principalId: pid,
      principalQueue: [...tids],
    });
  }
  return output;
}
