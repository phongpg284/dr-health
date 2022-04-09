import gql from "graphql-tag";

export const NOTIFICATIONS_SUBSCRIPTION = gql`
    subscription NewNotification($id: String!) {
        newNotification(id: $id) {
            title
            content
            createdAt
            seen
            mapUrl
        }
    }
`

export const GET_ACCOUNT_NOTIFICATIONS = gql`
    query GetAccountNotifications($inputs: GetAccountNotificationInput!) {
        getAccountNotifications(inputs: $inputs) {
            _id
            title
            content
            createdAt
            seen
            mapUrl
        }
    }
`

export const UPDATE_NOTIFICATION = gql`
    mutation UpdateNotification($inputs: NotificationUpdateInput!) {
        updateNotification(inputs: $inputs)
    }
`

export const SEEN_ALL_NOTIFICATION = gql`
    mutation SeenAllNotification($inputs: GetAccountNotificationInput!) {
        seenAllNotification(inputs: $inputs)
    }
`