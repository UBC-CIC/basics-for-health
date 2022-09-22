import { Auth } from 'aws-amplify';

async function AdminStatus() {
  let user = await Auth.currentAuthenticatedUser();
  let group = user.signInUserSession.accessToken.payload['cognito:groups'];
  if (group === undefined) {
    return false;
  } else {
    if (group.includes('Admins')) {
      return true;
    }
  }
};

export default AdminStatus;