import { gql } from "@apollo/client";

export const CREATE_MEETING = gql`
    mutation CreateMeeting($inputs: MeetingCreateInput!) {
        createMeeting(inputs: $inputs)
    }
`;
