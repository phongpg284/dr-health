import gql from "graphql-tag";

export const GET_PATIENT = gql`
    query GetPatient($id: String!) {
        getPatient(id: $id){
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
`

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
`


export const GET_INFO_DEVICE = gql`
    query GetDevice($id: String!) {
        getDevice(id: $id) {
            _id
            name
            SpO2{
                data
            }
            SpO2Threshold
            heartRate{
                data
            }
            heartRateThreshold
            bodyTemp{
                data
            }
            bodyTempThreshold
            diastole{
                data
            }
            diasLowThreshold
            diasHighThreshold
            systolic{
                data
            }
            sysLowThreshold
            sysHighThreshold
        }
    }
`