import { gql } from "@apollo/client";

export const GET_DOCTOR_PROFILE = gql`
    query GetDoctor($id: String!) {
        getDoctor(id: $id) {
            fullName
            email
            avatar
            age
            phone
            education
            jobPosition
            department
            gender
            birth
        }
    }
`

export const GET_PATIENT_PROFILE = gql`
    query GetPatient($id: String!) {
        getPatient(id: $id) {
            fullName
            gender
            email
            avatar
            age
            phone
            birth
            relativePhone
            address
            street
            ward
            district
            province
            height
            weight
            bloodType
            pathologicalDescription
            doctorId
            medicineSchedule {
                name
                scheduleDateRange
                scheduleHours
                note
            }
        }
    }
`
export const GET_ALLPATIENT_PROFILE = gql`
    query GetAllPatient($id: String!) {
        getPatientsOfDoctor(id: $id) {
            fullName
            avatar
            age
            phone
        }
    }
`