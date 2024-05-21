// token validator - prod implementation would depend upon external factors
export function validateInput(data: any) {
  if (!data.hasOwnProperty("teachers")) {
    throw new Error("invalid format - missing TEACHERS");
  }

  if (!data.hasOwnProperty("principals")) {
    throw new Error("invalid format - missing PRINCIPALS");
  }

  if (!Array.isArray(data.teachers)) {
    throw new Error("invalid format - TEACHERS is not an ARRAY");
  }

  if (!Array.isArray(data.principals)) {
    throw new Error("invalid format - PRINCIPALS is not an ARRAY");
  }
}
