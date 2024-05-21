// test snippets here with "npm run sb"

import cloneDeep from "clone-deep";
import { convertToExportFormat } from "./src/utils";
import { pQueue } from "./test/data/testData";

const pQ = cloneDeep(pQueue);
pQ.set(1, new Set([1]));

console.log(convertToExportFormat(pQ));
