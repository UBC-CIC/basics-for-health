/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      name
      version
      otherUser
      owner
      formID
      createdAt
      updatedAt
    }
  }
`;
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        version
        otherUser
        owner
        formID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFormByName = /* GraphQL */ `
  query GetFormByName(
    $name: String!
    $version: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getFormByName(
      name: $name
      version: $version
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        version
        otherUser
        owner
        formID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
