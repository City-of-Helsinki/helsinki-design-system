import { gql } from '@apollo/client/core';

export const MyProfileQuery = gql`
  query MyProfileQuery {
    myProfile {
      id
      firstName
      lastName
      nickname
      language
      primaryAddress {
        id
        primary
        address
        postalCode
        city
        countryCode
        addressType
      }
      addresses {
        edges {
          node {
            primary
            id
            address
            postalCode
            city
            countryCode
            addressType
          }
        }
      }
      primaryEmail {
        id
        email
        primary
        emailType
        verified
      }
      emails {
        edges {
          node {
            primary
            id
            email
            emailType
            verified
          }
        }
      }
      primaryPhone {
        id
        phone
        primary
        phoneType
      }
      phones {
        edges {
          node {
            primary
            id
            phone
            phoneType
          }
        }
      }
      verifiedPersonalInformation {
        firstName
        lastName
        givenName
        nationalIdentificationNumber
        municipalityOfResidence
        municipalityOfResidenceNumber
        permanentAddress {
          streetAddress
          postalCode
          postOffice
        }
        temporaryAddress {
          streetAddress
          postalCode
          postOffice
        }
        permanentForeignAddress {
          streetAddress
          additionalAddress
          countryCode
        }
      }
    }
  }
`;
