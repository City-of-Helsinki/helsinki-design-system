import { gql } from '@apollo/client';
// https://www.apollographql.com/docs/react/development-testing/testing/
export const USER_QUERY = gql`
  query user {
    id
    name
    profile {
      email
    }
  }
`;
