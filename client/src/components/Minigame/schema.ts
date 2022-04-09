import { gql } from "@apollo/client";

export const GET_PATIENT_PROFILE = gql`
    query GetPatient($id: String!) {
        getPatient(id: $id) {
            games
        }
    }
`
export const GET_GAME = gql`
    query GetGame($id: String!){
        getGame(id: $id){
            type
            patientId
            imgPath
            imgName
            options
            question
            answer
            record
        }
    }
`
export const UP_GAME = gql`
    mutation UpGame($inputs: GameUpdateInput!){
        updateGame(inputs: $inputs)
    }
`