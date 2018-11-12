import faker from 'faker';

const fakeSessionUser = uid => ({
  uid,
  client: faker.random.number(),
  token: faker.random.number()
});

export default fakeSessionUser;
