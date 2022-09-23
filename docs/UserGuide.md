# User Guide

**Before Continuing with this User Guide, please make sure you have deployed the stack.**

- [Deployment Guides](./DeploymentGuide.md)

| Index                              | Description                            |
| :--------------------------------- | :------------------------------------- |
| [Docker](#docker)                  | Docker container for app launch        |
| [Main Page](#main-page)            | Fill out forms                         |
| [Upload Form](#upload-form)        | Upload new / update existing forms     |
| [Add Admin User](#add-admin-user)  | Set other users as admins              |

## Docker

**The application is configured to launch from an EHR. The docker container installed during the deployment guide simulates an EHR and is where the application will be launched from.**

Start the docker container as described [here](https://github.com/smart-on-fhir/smart-dev-sandbox).

Click on `Launch a SMART App`.
    ![alt text](images/userGuide/user-guide.PNG)

Scroll down and enter the app URL in the `App Launch URL` field.
    ![alt text](images/userGuide/user-guide2.PNG)

Log in as the provided practitioner and select a patient from the list. The sign in/sign up screen for the app will then be displayed.

## Main Page

**This will be the only page available to regular, non-admin users.**

When a user signs in, the first page shown will be the page for filling out forms.
    ![alt text](images/userGuide/user-guide3.PNG)

There is a dropdown menu that will display all the forms that the user has uploaded or that has been assigned to them. Next to it is a spinbox that allows the user to pick the version of the form to render (if updates have been made to it). Clicking on `LOAD` after selecting a form and its version will render the form to be filled out.
    ![alt text](images/userGuide/user-guide4.PNG)

If the form has been submitted before, the answers will also be loaded with it.

## Upload Form

This page allows admin users to either upload new forms or update existing ones.

When uploading a new one, a name for the form is required; this is what will be shown in the dropdown selection menu. There is another field (optional) that allows the user to enter the name of another user to give them access to the form as well.
    ![alt text](images/userGuide/user-guide5.PNG)

When updating an existing one, the user must select the form they are updating from the dropdown menu.
    ![alt text](images/userGuide/user-guide6.PNG)

To actually create these forms, online tools exist for building FHIR questionnaires. The one we used can be found [here](https://lhcformbuilder.nlm.nih.gov/previous/).
    ![alt text](images/userGuide/user-guide7.PNG)

When adding questions, please use LOINC codes when possible.
    ![alt text](images/userGuide/user-guide8.PNG)

After you are finished building your form, click `Export` to download it as a file; this is what will be uploaded to the application.

If updating an existing form, click `Import` and select the one you wish to edit. After you make your changes, download it again and upload it to the update page of the application.

## Add Admin User

This page allows the admin user to set other users as admins.
    ![alt text](images/userGuide/user-guide9.PNG)

To set up the **first** admin account, you will need to do the following steps. (Note: this assumes the user has already signed up on the app)

1. On the [AWS online console](https://console.aws.amazon.com/console/home), enter `Cognito` in the search bar.
   ![alt text](images/adminSetup/admin-setup.PNG)
2. Click `Manage User Pools` and select the user pool that corresponds to the project name. The following screen will then be shown.
   ![alt text](images/adminSetup/admin-setup2.PNG)
3. On the left side menu, under General settings, click `Users and groups`. Select the user you wish to set as an admin.
   ![alt text](images/adminSetup/admin-setup3.PNG)
4. Click the `Add to group` button and select **Admins** from the drop down menu.
   ![alt text](images/adminSetup/admin-setup4.PNG)

    You must sign out of the app and sign back in to see the change.
