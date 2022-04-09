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

export const UPLOAD_TEST = gql`
    mutation UploadTest($inputs: UploadTestInput!) {
        uploadTest(inputs: $inputs)
    }
`;
