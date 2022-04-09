import { gql } from "@apollo/client";

export const GET_PATIENT_DEVICE = gql`
query GetDevice($id: String!) {
    getDevice(id: $id) {
        _id
        patientId
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

export const GET_PATIENT = gql`
query GetPatient($id: String!) {
    getPatient(id: $id) {
        fullName
        deviceId
    }
}
`

export const UPDATE_THRESHOLD = gql`
mutation UpdateThreshold($value: Float!,$property:Float!,$id:String!) {
    setThreshold(value: $value,property:$property,id:$id)
}
`
