const keyDisplayNames: Record<string, Record<string, string>> = {
    default: {
        species: "Species",
        tag: "Tag Number",
        breed: "Breed",
        gender: "Gender",
        weight: "Weight",
        age: "Age",
        status: "Status",
        dam: "Dam",
        sire: "Sire",
        birthDate: "Birthday",
        birthWeight: "Birth Weight",
        lastCalvingDate: "Last Calving Date",
        lactationStage: "Lactation Stage",
        lastAiDate: "Last AI Date",
        nextAiDate: "Next AI Date",
        pregnancyStatus: "Pregnancy Status",
        ageOfPregnancy: "Age of Pregnancy",
        expectedCalvingDate: "Expected Calving Date",
        lastHeatDate: "Last Heat Date",
        reproductiveComment: "Reproductive Comment",
        vaccinationType: "Vaccination Type",
        vaccinationDate: "Vaccination Date",
        nextVaccinationDate: "Next Vaccination Date",
        dewormingType: "Deworming Type",
        lastDewormingDate: "Last Deworming Date",
        nextDewormingDate: "Next Deworming Date",
        diseaseComment: "Diseases Comment",
        treatmentComment: "Treatment Comment",
        initialFlockSize: "Initial Flock Size",
        currentFlockSize: "Current Flock Size",
        mortilityRate: "Mortility Rate",
        dateOfEntry: "Date of Entry",
    },
    Layer: {
        tag: "Flock ID",
        breed:"Strains",
        age:"Age Of Flock",
    },
    Broiler: {
        tag: "Flock ID",
        breed:"Strains",
        age:"Age Of Flock",
    },
    Pig: {
        tag: "Pig ID",
        litterSize: "Number of Piglets",

    },

};

export default keyDisplayNames;