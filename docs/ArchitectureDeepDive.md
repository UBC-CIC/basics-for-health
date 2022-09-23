# Backend and Frontend Stack Deep Dive

## Architecture

![Architecture diagram](images/architecture-diagram.png)

## Description

1. User launches the application from an EHR.

2. The selected patient's data is retrieved from the FHIR server along with the necessary authorization tokens.

3. The user signs-in to access the application through Amazon Cognito, which assigns them different permissions depending on if they are an administrator or not.

4. An API call is made to the GraphQL API by the app.

5. The GraphQL API call queries Amazon DynamoDB for relevant data about the form.

6. The result of the query is passed back from the API.

7. The result of the query is returned to the app.

8. The app uses the returned data to send an authorized request to the FHIR server to retrieve the appropriate resources.

This flow is for retrieving the forms. Uploading the forms is identical, just in a different order. When uploading, the FHIR resource is first sent to the server before necessary data about the form is stored into the database.