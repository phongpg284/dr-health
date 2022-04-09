import gql from "graphql-tag";

export const GET_DOCTOR = gql`
    query GetDoctor($id: String!) {
        getDoctor(id: $id){
            _id
            fullName
            email
            age
            birth
            gender
            jobPosition
            department
            phone
            age
            avatar
        }
    }
`
export const UPDATE_DOCTOR = gql`
    mutation UpdateDoctor($inputs: DoctorUpdateInput!) {
        updateDoctor(inputs: $inputs) 
    }
`

