import faker from 'faker';

const fakeUser = ({
  email = faker.internet.email(),
  createdAt = faker.date.past(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  username = faker.internet.userName(),
  provider = 'email',
  updatedAt = faker.date.past(),
  id = faker.random.number()
} = {}) => ({
  email,
  createdAt,
  firstName,
  lastName,
  username,
  provider,
  updatedAt,
  id,
  uid: email
});

export default fakeUser;
