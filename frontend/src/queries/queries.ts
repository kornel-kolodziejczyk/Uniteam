import { gql } from "@apollo/client";

export const GET_OFFERS = gql`
  query GetOffers {
    offers {
      id
      companyName
      positionName
      salary
      technologies {
        id
        name
      }
      applications {
        id
      }
    }
  }
`;

export const GET_APPLICATIONS = gql`
  query GetApplications($offer: ID) {
    applications(offer: $offer) {
      id
      name
      technologies {
        id
        name
      }
      salary
      email
    }
  }
`;

export const GET_TECHNOLOGIES = gql`
  query GetTechnologies {
    technologies {
      id
      name
    }
  }
`;
