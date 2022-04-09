import gql from "graphql-tag";

export const UPLOAD = gql`
  mutation UploadFile($ownerId: String!, $receiverId: String!, $file: Upload!) {
    singleUploadFile(
      inputs: { ownerId: $ownerId, receiverId: $receiverId, file: $file }
    )
  }
`;
export const RECORDING_DOCTOR = gql`
  query getRecordingsForDoctor($id: String!) {
    getRecordingDoctor(id: $id) {
      ownerId
      receiverId
      fileName
      createdAt
    }
  }
`;
