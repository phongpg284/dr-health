import { gql } from "@apollo/client";

export const GET_PATIENTS_OF_DOCTOR = gql`
    query GetPatientsOfDoctor($id: String!) {
        getPatientsOfDoctor(id: $id) {
            _id
            fullName
            email
            age
            gender
            phone
            birth
            relativePhone
            address
            street
            ward
            district
            province
            ethnic
            nationalId
            nationality
            job
            avatar
            weight
            bloodType
            height
            deviceId
            pathologicalDescription
            medicineSchedule {
                name
                scheduleDateRange
                scheduleHours
                note
            }
        }
    }
`;

export const GET_ALL_TEST = gql`
    query GetAllTest($id: String!) {
        getAllTests(id: $id) {
            totalPoint
            _id
            updatedAt
            questions {
                id
                point
                options
                title
            }
        }
    }
`;

export const UPDATE_PATIENT = gql`
    mutation UpdatePatient($inputs: PatientUpdateInput!) {
        updatePatient(inputs: $inputs)
    }
`;

export const GET_DEVICE = gql`
    query GetDevice($id: String!) {
        getDevice(id: $id) {
            _id
            name
            SpO2Threshold
            heartRateThreshold
            bodyTempThreshold
            diasLowThreshold
            diasHighThreshold
            sysLowThreshold
            sysHighThreshold
        }
    }
`;

export const GET_INFO_DEVICE = gql`
    query GetDevice($id: String!) {
        getDevice(id: $id) {
            _id
            name
            SpO2 {
                data
            }
            SpO2Threshold
            heartRate {
                data
            }
            heartRateThreshold
            bodyTemp {
                data
            }
            bodyTempThreshold
            diastole {
                data
            }
            diasLowThreshold
            diasHighThreshold
            systolic {
                data
            }
            sysLowThreshold
            sysHighThreshold
            isConnect
            face{
                data
            }
            voice{
                data
            }
            armMovement{
                data
            }
        }
    }
`;

export const NEW_DEVICE_DATA = gql`
    subscription newDeviceData($id: String!) {
        newDeviceData(id: $id) {
            key
            value {
                data
                createdAt
            }
        }
    }
`;

export const PUSH_NEW_DATA = gql`
    mutation UpdateDevice($inputs: DeviceUpdateInput!) {
        updateDevice(inputs: $inputs)
    }
`;
