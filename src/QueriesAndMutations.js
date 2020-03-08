import { gql } from "apollo-boost";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $name: String!,
    $status: String!,
    $gender: String!
  ){
    characters(name: $name, status: $status, gender: $gender) {
      id
      name
      status
      image
      gender
    }
  }
`;

export const CREATE_CHARACTER = gql`
  mutation CreateCharacters(
      $name: String!,
      $status: String!,
      $gender: String!,
      $image: String!
    ){
      createCharacter(
        name: $name,
        status: $status,
        gender: $gender,
        image: $image
      ) {
        id
        name
        status
        image
        gender
      }
    }
  `
;