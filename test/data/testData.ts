import {
  PrincipalsMap,
  Location,
  OpenRole,
  PrincipalId,
  Subject,
  Grade,
  PrincipalsQueue,
} from "../../src/types/types";

export const rawPrincipal = [
  {
    id: 1,
    name: "Howard T. Duck",
    location: "Cleveland",
    openRoles: [
      {
        subject: "Math",
        grade: "Kindergarten",
      },
    ],
  },
];

export const rawTeacher = {
  id: 3,
  name: "Hank Scorpio",
  geography: "Cleveland",
  subjects: ["Math"],
  grades: ["Kindergarten"],
  credentials: "Active",
};

export const cleveland: Location = "Cleveland";

export const openRole: OpenRole = {
  principalId: 1 as PrincipalId,
  subject: Subject.MATH,
  grade: Grade.K,
};

export const pMap: PrincipalsMap = new Map();
pMap.set(cleveland, [openRole]);

export const pQueue: PrincipalsQueue = new Map();

export const teacherMatchCount = new Map<number, number>();
