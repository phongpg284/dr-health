import gql from "graphql-tag";

export const GET_QUESTIONS = gql`
    query {
        clientGetQuestions {
            id
            title
            options
        }
    }
`;

export const GET_PATIENTS_OF_DOCTOR = gql`
    query GetPatientsOfDoctor($id: String!) {
        getPatientsOfDoctor(id: $id) {
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
`;

export const CREATE_PATIENT_BLOOD = gql`
    mutation CreatePatientBlood($input: BloodCreateInput!) {
        createPatientBlood(inputs: $input)
    }
`;
