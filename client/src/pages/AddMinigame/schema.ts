import { gql } from "@apollo/client";

export const CREATE_GAME = gql`
    mutation CreateGame($inputs: GameCreateInput!) {
        createGame(inputs: $inputs)
    }
`;
