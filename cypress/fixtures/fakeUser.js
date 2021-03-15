import { build, fake, sequence } from '@jackfranklin/test-data-bot';

const fakeUserBuilder = build('User', {
  fields: {
    email: fake(f => f.internet.email()),
    createdAt: fake(f => f.date.past()),
    firstName: fake(f => f.name.firstName()),
    lastName: fake(f => f.name.lastName()),
    username: fake(f => f.internet.userName()),
    provider: 'email',
    updatedAt: fake(f => f.date.past()),
    id: sequence()
  }
});

const userOne = fakeUserBuilder();
console.log(userOne);

export default fakeUserBuilder;
