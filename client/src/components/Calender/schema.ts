import { gql } from "@apollo/client/core";

export const GET_PATIENTS_OF_DOCTOR = gql`
    query GetPatientsOfDoctor($id: String!) {
        getPatientsOfDoctor(id: $id){
            _id
            fullName
            medicineSchedule {
                name
                scheduleDateRange
                scheduleHours
                note
            }
        }
    }
`

export const GET_MEDICINES = gql`
    query GetMedicines {
        getMedicines {
            _id
            name
        }
    }
`

export const CREATE_MEDICINE = gql`
    mutation CreateMedicine($inputs: MedicineCreateInput!) {
        createMedicine(inputs: $inputs) 
    }
`
export const SAVE_MEDICINE_SCHEDULE = gql`
    mutation SaveMedicineSchedule($inputs: SaveMedicineScheduleInput!) {
        saveMedicineSchedule(inputs: $inputs)
    }
`