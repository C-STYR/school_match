import sample_data from "../data/sample_data.json";
import {
  generatePrincipalsMap,
  processData,
  convertToExportFormat,
  normalizeData,
} from "./utils";
import { validateInput } from "./validators";

function main() {
  // validate data
  try {
    // error handling here will depend on architecture - this is just an example
    validateInput(sample_data);
  } catch (error: any) {
    console.error(error);
  }

  // normalize data
  const normalizedData = normalizeData(sample_data);

  // build a hashmap of open roles by location
  const principalsMap = generatePrincipalsMap(normalizedData.principals);

  // match teachers to open roles and write output in Map format
  const outputMap = processData({
    teachers: normalizedData.teachers,
    principalsMap,
  });

  // convert output to serializable format
  const result = convertToExportFormat(outputMap);
  console.log("queues: ", result);
  return result;
}

main();

// { 6 => [ 5, 8 ], 2 => [ 19 ], 7 => [ 19 ], 10 => [ 25 ] }
