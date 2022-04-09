import { gql } from "@apollo/client";

export const GET_DOCTOR_PROFILE = gql`
    query GetDoctor($id: String!) {
        getDoctor(id: $id) {
            fullName
            avatar
        }
    }
`;

export const GET_PATIENT_PROFILE = gql`
    query GetPatient($id: String!) {
        getPatient(id: $id) {
            fullName
            avatar
            deviceId
        }
    }
`;

export const GET_DEVICE_STATUS = gql`
    query GetDevice($id: String!) {
        getDevice(id: $id) {
            isConnect
        }
    }
`;

export const REMOVE_DEVICE = gql`
    mutation RemoveDevice($id: String!) {
        removeDevice(id: $id)
    }
`;

export const ADD_DEVICE = gql`
    mutation AddDevice($id: String!) {
        addDevice(id: $id)
    }
`;
