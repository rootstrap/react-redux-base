import fetchUsername from 'services/testingService';
import createResource from 'actions/createResource';

export const userResource = createResource(
  'FETCH_USERNAME',
  state => state.user.name,
  fetchUsername
);

export const { success: getUsernameSuccess } = userResource;
