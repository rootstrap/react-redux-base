# Cypress testing in react-redux-base

## Setup
Cypress comes almost ready for you to use in this branch. There are a few configurations that you need to change in order to get the most out of it.

* **Set record key:** Cypress has a handy feature called Cypress dashboard, there you can see video recordings of failed tests run in the CI of your choice.

  It's very easy to get it configured, here is a [link](https://docs.cypress.io/guides/core-concepts/dashboard-service.html#Setup) to the official documentation with the steps you need to follow.

* **Set `API_URL`:** Replace default values for `API_URL` in `cypress.json` and `.env.cypress` with your backend url.

-----

## General structure
```
cypress
├───fields/               # Field definitions for test suites
├───fixtures/             # Model fakers
├───integration/          # Here is where the test suites go
│   └───containers/       # Designated place for container test suites
├───plugins/
├───screenshots/          # Home for failing test screenshots
├───snapshots/            # Home for test snapshots if you have that set up
├───stubs/                # api call stub functions
├───support/              # tools
│   ├───commands.js       # Useful commands added to cypress
│   ├───constants.js      # Common constants
│   ├───index.js
│   └───reusableTests.js  # Generic functions for tests that can be reused
├───videos/               # Home for failing test videos
└───README.md
```

-----

### Integrations
Default folder for test suites. Cypress recommends to keep all your suites in this folder.
To keep a similar structure to `src`, all container test suites are in `containers` folder.

### Fields
Test your forms with ease, define the fields you want to test and the respective `errors` and `warnings` to check and the method `testFields` will do all the rest of the work for you.

#### How do I define fields to test?
For each test suite we recommend creating an associated fields file. This will keep your test suite clean.

Let's take as an example `signUpPageFields.js`:
```
const fields = [
  ...,
  {
    title: 'Password Confirmation',
    name: 'passwordConfirmation',
    inputType: INPUT, // Default value INPUT so here it shouldn't be necessary
    errors: [
      {
        validationType: PRESENCE,
        options: { customMessage: 'You must enter a password confirmation to continue' }
      },
      {
        validationType: EQUALITY,
        options: {
          otherInput: 'password',
          setup: () => {
            cy.get('input[name=password]').type('password123');
          }
        }
      }
    ]
  },
...
]
```
##### Basic attributes:
* `title`: this is mainly used to display a description of what is happening.
* `name`: way to identify the field.
* inputType: default value is `INPUT`so in most cases this is not needed. You can add any other input types to the

Out of the box the validationTypes provided are: `PRESENCE`, `EMAIL` and `EQUALITY` but you can easily expand this as explained in [Support/reusableTests](#Support/reusableTests).

Each validation has default value that should make the validation fail and a default message as well. If those don't fit your needs you can always provide your own in options by setting `customValue` and `customMessage`.

In the case that the field validation requires some setup like filling another field first, a `setup` function can be provided as in the example that will be run before the validations.


-----
### Fixtures
Fixtures are what Cypress likes to call mock models. They are useful if you are doing integration tests or unit testing and want to stop the requests made to the backend and mock the response.

You can take `fakeUser.js` as a reference on how to define fixtures and how to use them.

`faker` library is already integrated so it's easier to create fake data.

### Stubs
As mentioned before, if you don't want to do e2e testing then you will probably need to mock the calls done to your api. That's where stubs come to aid you.

For each `[model]api.js` file in the `api` folder you should create a stubs file in this folder.

We already provide you with `sessionStubs.js` that help you stub `login`, `signUp` and `logout` api calls.

As you will see stubs have a defined structure, this helps to reduce the amount of code repetition and it works well with the command `stubRequest`.

#### Here is an example of a stub definition:
As with field definitions, there is some basic params that you need to set like the name, method and url.

After that you have the different cases you want to stub, in most cases `success` and `fail`. All cases should have `status` and `response`. If the request shouldn't return auth headers you can also set `withHeaders` to `false`.
```
export const signUpStub = customUser => ({
  name: 'signUpStub',
  method: POST,
  url: '/users',
  cases: {
    success: {
      status: SUCCESS_CODE,
      response: { user: customUser || user({ complete: false }) },
    },
    fail: {
      status: UNPROCESSABLE_ENTITY_CODE,
      response: { errors: { email: ['has already been taken'] } },
      withHeaders: false
    }
  }
});
```

#### Here is an example of how those stubs can be used:
At the top of the test we tell Cypress to stub the request we want, this way when the request is actually made, Cypress will know what to do.

After we submit the form we tell Cypress to wait for the stub `@sub_name` to happen before continuing to the assertion.
```
it('Submit failure, should display has already been taken', () => {
  cy.stubRequest(signUpStub(), FAIL_CASE);

  ... // set all the field values

  cy.get('form').submit().wait('@signUpStub');

  ... // assertion
});
```

-----
### Support/commands
This file contains some command additions to Cypress. For example `cy.stubRequest` to stub backend request, `cy.logUser` to fake user authentication and `cy.removeSession` to log the user out.

If you ever need to add a new command this is the place to do so.
If it's getting a bit crowded you can always create more files and import them in `support/index.js`.

### Support/reusableTests
In order to reduce code repetition we added some generic testing functions that will allow you to write tests faster.

At the moment all reusable tests are focused on testing forms. Generic method to test a field and a method to test all fields.

As previously mentioned there are some validationTypes that come already defined.
As your project grows and you need to use different validation types we recommend adding them to the `getDefaults` switch in this file with a default value and message so they can be reused.

-----
## Test Runner

## CI integration
