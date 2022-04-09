import { gql } from "@apollo/client";

export const GET_PATIENTS_OF_DOCTOR = gql`
    query GetPatientsOfDoctor($id: String!) {
        getPatientsOfDoctor(id: $id){
            _id
            fullName
        }
    }
`