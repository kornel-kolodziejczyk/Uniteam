import { gql } from "@apollo/client";

export const ADD_OFFER = gql`
  mutation AddOffer($companyName: String!, $positionName: String!, $salary: Int!, $technologies: [ID]) {
    addOffer(companyName: $companyName, positionName: $positionName, salary: $salary, technologies: $technologies) {
      id
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation DeleteOffer($id: ID!) {
    deleteOffer(id: $id) {
      id
    }
  }
`;

export const EDIT_OFFER = gql`
  mutation EditOffer($id: ID!, $companyName: String, $positionName: String, $salary: Int, $technologies: [ID]) {
    editOffer(id: $id, companyName: $companyName, positionName: $positionName, salary: $salary, technologies: $technologies) {
      id
      companyName
      positionName
      salary
      technologies {
        id
        name
      }
    }
  }
`;

export const ADD_APPLICATION = gql`
  mutation AddApplication($name: String!, $technologies: [ID], $salary: Int!, $email: String!, $offer: ID!) {
    addApplication(name: $name, technologies: $technologies, salary: $salary, email: $email, offer: $offer) {
      id
      applications {
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
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: ID!, $offer: ID!) {
    deleteApplication(id: $id, offer: $offer) {
      id
      applications {
        id
      }
    }
  }
`;

export const EDIT_APPLICATION = gql`
  mutation EditApplication($id: ID!, $name: String, $technologies: [ID], $salary: Int, $email: String) {
    editApplication(id: $id, name: $name, technologies: $technologies, salary: $salary, email: $email) {
      id
      name
      salary
      technologies {
        id
        name
      }
      email
    }
  }
`;
