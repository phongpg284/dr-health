import { gql } from "@apollo/client";

export const CREATE_DOCTOR = gql`
    mutation CreateDoctor($inputs: DoctorCreateInput!) {
        createDoctor(inputs: $inputs) 
    }
`

export const CREATE_PATIENT = gql`
    mutation CreatePatient($inputs: PatientCreateInput!) {
        createPatient(inputs: $inputs) 
    }
`