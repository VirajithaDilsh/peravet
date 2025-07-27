export interface Cattle {
    id: number;
    sex: string;
    breed: string;
    weight: number;
    age: number;
    lastAIdate?:Date;
    pregnancyStatus?: "Pregnant" | "Not pregnant" | "To be check"|"Infertile";
    expectedCalvingDate?:Date;
    status:"Live" | "Died" | "Culled"|"Sold"|"Diseased";
}

export const cattleData: Cattle[] = [
    { id: 1, sex: "Female", breed: "JF", weight: 100, age:12,lastAIdate: new Date('2025-07-27'),pregnancyStatus:"Pregnant",expectedCalvingDate: new Date('2026-04-15'), status: "Live"},
    { id: 2, sex: "Male", breed: "JF", weight: 100, age:12, status: "Live"},
    { id: 3, sex: "Female", breed: "JF", weight: 100, age:12,lastAIdate: new Date('2025-07-27'),pregnancyStatus:"Pregnant",expectedCalvingDate: new Date('2026-04-15'), status: "Live"},
    { id: 4, sex: "Female", breed: "JF", weight: 100, age:12,lastAIdate: new Date('2025-07-27'),pregnancyStatus:"Pregnant",expectedCalvingDate: new Date('2026-04-15'), status: "Live"},
    { id: 5, sex: "Female", breed: "JF", weight: 100, age:12,lastAIdate: new Date('2025-07-27'),pregnancyStatus:"Pregnant",expectedCalvingDate: new Date('2026-04-15'), status: "Live"},
    { id: 6, sex: "Female", breed: "JF", weight: 100, age:12,lastAIdate: new Date('2025-07-27'),pregnancyStatus:"Pregnant",expectedCalvingDate: new Date('2026-04-15'), status: "Live"},
    { id: 7, sex: "Female", breed: "JF", weight: 100, age:12,lastAIdate: new Date('2025-07-27'),pregnancyStatus:"Pregnant",expectedCalvingDate: new Date('2026-04-15'), status: "Live"},
    { id: 8, sex: "Male", breed: "JF", weight: 100, age:12, status: "Live"},
    { id: 9, sex: "Male", breed: "JF", weight: 100, age:12, status: "Live"},
    { id: 10, sex: "Male", breed: "JF", weight: 100, age:12, status: "Live"},
    { id: 11, sex: "Male", breed: "JF", weight: 100, age:12, status: "Live"},




    // add more cattle here
];
