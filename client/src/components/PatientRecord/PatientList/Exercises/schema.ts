import { gql } from "@apollo/client";

const schema = {
    getAllExercisesOfPatient: gql`
        query GetAllExercisesOfPatient($id: String!) {
            getAllExercisesOfPatient(id: $id) {
                _id
                sessionId
                exerciseKey
                step {
                    id
                    createdAt
                    fail
                }
                updatedAt
            }
        }
    `,
};
export default schema;
