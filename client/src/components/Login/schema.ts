import { gql } from "@apollo/client";

export const LOGIN = gql`
    query Login($inputs: AccountLoginInput!) {
        login(inputs: $inputs) {
            accessToken
            role
            email
            message
            id
        }
    }
`