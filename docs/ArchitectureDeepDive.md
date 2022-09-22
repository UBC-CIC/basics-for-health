# Backend and Frontend Stack Deep Dive

## Architecture

![Architecture diagram](../docs/images/architecture-diagram.png)

## Description

1. User launches the application from an EHR.

2. The selected patient's data is retrieved from the FHIR server along with the necessary authorization tokens.

3. The user signs-in to access the application through Amazon Cognito, which assigns them different permissions depending on if they are an administrator or not.

4. An API call is made to the GraphQL API by the app.

5. The GraphQL API call queries Amazon DynamoDB for the form name, version, and ID.

6. The result of the query is passed back from the API.

7. The result of the query is returned to the app.

8. The app uses the returned data to send a request to the FHIR server to retrieve the appropriate resource.