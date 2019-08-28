# Cypress testing in react-redux-base

## Table of contents
- [Cypress testing in react-redux-base](#cypress-testing-in-react-redux-base)
  - [Table of contents](#table-of-contents)
  - [Setup](#setup)
  - [Running tests](#running-tests)
      - [Test selection](#test-selection)
      - [Test running](#test-running)
  - [Writing tests](#writing-tests)
    - [General structure](#general-structure)
    - [Testing commands](#testing-commands)
    - [Integrations](#integrations)
    - [What type of tests do you want to write?](#what-type-of-tests-do-you-want-to-write)
    - [Stubbing requests](#stubbing-requests)
      - [Basic attributes](#basic-attributes)
      - [Cases](#cases)
      - [When to stub and how to stub?](#when-to-stub-and-how-to-stub)
    - [Fixtures](#fixtures)
    - [Assert form validations](#assert-form-validations)
      - [Test it the react-redux-base way](#test-it-the-react-redux-base-way)
      - [Defining fields](#defining-fields)
        - [Basic attributes](#basic-attributes-1)
        - [Validation structure](#validation-structure)
        - [Validation options](#validation-options)
  - [Code Coverage](#code-coverage)


----

## Setup
Congratulations, you are almost set. There are a few configurations you need to do to get your testing environment up and running.

* **Set record key:** Cypress has a handy feature called Cypress dashboard, there you can see video recordings of failed tests run in the CI of your choice.

  It's very easy to get it configured, here is a [link](https://docs.cypress.io/guides/core-concepts/dashboard-service.html#Setup) to the official documentation with the steps you need to follow.

* **Set `API_URL`:** If you are planning to use E2E testing remove `.example` from `.env.test_e2e.example` and substitute `API_URL` with the backend url you are going to use. If that is not the case `.env.test` comes already set with a fake `API_URL` that you don't need to change since calls won't be reaching the backend.

-----

## Running tests
Running tests is very easy, and we have already included some for you. To get a taste of how cypress works start your server with `ENV=test yarn start` and then run `yarn test:open`. The Test Runner will open and a list of tests to run will appear. Choose one of them and voilá, you will see screenshots of the test running in real time.

Something fails? Hover over that step in the left sidebar and you will see a screenshot of that exact moment. You can usually find useful information in said sidebar as well.

#### Test selection
![Test Runner List](https://i.imgur.com/m7ApbOo.png)

#### Test running
![test running in Test Runner](http://g.recordit.co/vGBmlfJDte.gif)


-------
## Writing tests

Now that you have seen how to run tests with Cypress is time to dive into writing tests. Let's get to know the structure the base has in place to make testing even faster and easier.

If this is your first time using Cypress you might want to take a look at Cypress [documentation](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) first. It is very well written and very extensive.

[Here](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file) is how to write your first test.



### General structure
```
cypress
├───fixtures/             # Model fakers
├───integration/          # Here is where the test suites go
│   └───pages/            # Designated place for pages test suites
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

### Testing commands
* Run all tests in console:
```bash
$ yarn test
```
* Open test runner
```bash
$ yarn test:open
```
* Run a specific spec in console
```bash
$ yarn test:spec "cypress/integration/pages/NameOfSpec.spec.js"
```
* Command used for CI configuration
```bash
$ yarn test:ci
```

By default all test commands use `.env.test` as their env. If you want to run a different env just add `ENV=test_e2e` for example.

-----

### Integrations
As you might have seen in the Cypress documentation, here is where all your test specs should go. Cypress recommends to keep all your suites in this folder.

To keep a similar structure to `src`, all page test suites are in `pages` folder.

Out of the box the `react-redux-base` comes with three tests, one for each page (`LoginPage`, `SignUpPage`, `HomePage`).

### What type of tests do you want to write?
* **Integration or unit tests:**

  When doing this kind of tests one thing you have do to is make sure that all requests done to the backend are stubbed. This way you make sure you always get the response you want from the api calls.

  This is especially important if you are testing an app that needs authentication. If you forget to stub a request, when you send the backend your fake authentication headers it will kick you out and the tests will fail.

* **E2E:**

  If E2E is the way yo want to go, you won't need to do stubs to the backend. That being said, you will need to have a proper env setup in the backend for testing and use `cy.realLoginUser` instead of `cy.loginUser` to make sure that the user is authenticated from the backend's perspective.

### Stubbing requests
To stub any request you can use the custom command `cy.stubRequest` (defined in `support/commands`).

You can see examples of how it's used in all of the provided specs.

For each stub you want to do, you will need to define certain parameters you want to pass to it.

To keep stubs organized, there is a folder called `stubs` that should be the equivalent to `api` folder in `src`.

For each `[model]Api.js` you should create a `[model]Stubs.js` inside `stubs` folder.

Here is an example of one of the `sessionStubs`:
```javascript
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

When calling `cy.stubRequest`, first parameter is always this stub config object. Second parameter is the case you want to stub. By default the case to be stubbed is `SUCCESS_CASE`.

As you can see the function is receiving a parameter called `customUser`. This can come in handy if for a specific case in one call you need to customize the response or any other attribute.

#### Basic attributes


 | Parameter | Description                                                                                                                        | Values / Type                         |
 | --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
 | name      | this will be the stub identifier                                                                                                   | **string**                            |
 | method    | Select the http method the request you want to stub has.                                                                           | **HTTP METHODS** defined in constants |
 | url       | url you want to mock, `stubRequest` will pre-append `'**'` for you so any urls ending with the one you provide match               | **string**                            |
 | cases     | A request to the backend not always responds with the same values. For each case you need to stub here is the place to define them | **object**                            |

#### Cases
Usual cases are `'success'` (`SUCCESS_CASE`) and `'fail'` (`FAIL_CASE`), because of that, those are already defined in the constants file so you can reuse them. If there are any other common cases that you find yourself using you might want to define them there as well.

 | Parameter   | Description                                                                                             | Values / Type                       | Required                        |
 | ----------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------- |
 | status      | This is the status code of the case, usually something like 200 or 400.                                 | **HTTP CODES** defined in constants | **true**                        |
 | response    | This is the response object as the backend would send it, usually contains a fixture or error messages. | **object**, no default value        | **false** but usually necessary |
 | withHeaders | Add authentication headers to response? Set it to false if user should not be logged in after response. | **bool**, default value: `true`     | **false**                       |

#### When to stub and how to stub?
Now that you have the tools, how do you actually implement a stub?

If we continue with the `SignUpPage` spec example you will see that in the `Form submission` section the `cy.stubRequest` is being called.

The important thing about using a stub is that you define the stub before the call to the backend is made and you wait for it to happen before making any assertions.

For example, in the case of `Submit failure, should display has already been taken`:

```javascript
cy.stubRequest(signUpStub(), FAIL_CASE);     // define stub

...                                          // set form values

cy.get('form').submit().wait('@signUpStub'); // submit form and wait for stub

cy.contains('has already been taken');       // assert


```

### Fixtures
Fixtures are what Cypress's version of mock models. As previously mentioned, they are useful if you are doing integration or unit tests and want to stop the requests made to the backend by mocking the response.

It's what you will use in the response attribute of stubs.

You can take `fakeUser.js` as a reference on how to define fixtures and how to use them.

`faker` library is already integrated so it's easier to create fake data.

-----

### Assert form validations

Asserting that a form is being validated correctly is something that you will often find yourself doing. It is also quite a repetitive task that can be somewhat automated to make it faster to write and have less code repetition.

When testing that a field shows a certain validation error you would usually write something like:

```javascript
it('Display email is invalid error', () => {
  cy.get('form').within(() => {
    cy.get('input[name="email"]').clear().type('this is not an email').blur();
  });
  cy.contains('Email is invalid');
});
```
And you would have to write that bit of code for each field for each of it's validations.

#### Test it the react-redux-base way
This base comes with a solution where you can simply define the fields of a form and the `errors` and `warnings` that you want to check and just call the following code to test form validation:

```javascript
context('Form Validations', () => {
  const fields = [
    ... // Field definitions
  ]
  testFields(fields);
});
```

#### Defining fields

Let's take as an example `signUpPage.spec.js`:
```javascript
...
const fields = [
  ...,
  {
    title: 'Password Confirmation',
    name: 'passwordConfirmation',
    inputType: INPUT,
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
...
```
##### Basic attributes
 | Parameter | Description                                                                                                                                  | Values / Type                                                       | Required  |
 | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------- |
 | title     | This is to show in the test case definition and to define default validation messages.                                                       | **string**                                                          | **true**  |
 | name      | Input name                                                                                                                                   | **string**                                                          | **true**  |
 | inputType | Input type, used to identify element. By default the defined `inputTypes` are `INPUT` and `TEXTAREA`, you can expand that to fit your needs. | **string**, default value: `INPUT` from `inputTypes`                | **false** |
 | errors    | Define errors to check.                                                                                                                      | **array of object**, objects inside follow **validation structure** | **false** |
 | warnings  | Define warnings to check.                                                                                                                    | **array of object**, objects inside follow **validation structure** | **false** |

Inside errors and warnings arrays you can define validations with these attributes:

##### Validation structure
 | Parameter      | Description                                                                                     | Type       | Required  |
 | -------------- | ----------------------------------------------------------------------------------------------- | ---------- | --------- |
 | validationType | Select which validation you want to run. Choose from and extend `validationTypes` in constants. | **string** | **true**  |
 | options        | Any extra configurations that you need to set                                                   | **object** | **false** |

Said options are described below

##### Validation options
 | Parameter     | Description                                                                                                                | Type       | Required  |
 | ------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- | --------- |
 | customValue   | For each validation a default value is already provided, if for some reason you need to change it just set this parameter. | **string** | **false** |
 | customMessage | As with the value, a default message is provided but you sometimes need a custom one.                                      | **string** | **false** |
 | setup         | function where you can define any steps to be run before the validation                                                    | **func**   | **false** |
 | [custom]      | You can define any custom option                                                                                           | **any**    | **false** |


Certain validations might need special options. For example, `EQUALITY` needs to know the name of the input to compare with, that is called `otherInput`.

Aside from that, if you ever need to expand validations you can always add other custom options to use in those specific cases.

As validation definitions can get long you might want to consider storing them in a separate folder with an associated file for each spec.


------

## Code Coverage

To set up code coverage you need to set in circleCi the environment variable `NODE_ENV` to `test` so the code coverage is run in the CI. This is because [Istanbul](https://istanbul.js.org/) (the package use for calculating the coverage) is set as a test plugin in `.babelrc`.
