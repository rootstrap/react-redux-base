import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import { sessionService } from 'redux-react-session';
import Immutable from 'immutable';

import configureStore from 'store/configureStore';
import HomePage from 'containers/HomePage';
import { withStore } from 'utils/testHelpers';
import LogoutButton from 'components/user/LogoutButton';
import { FormattedMessage } from 'react-intl';

describe('<HomePage />', () => {
  let store;
  let subject;

  beforeEach(() => {
    const email = 'john@test.com';

    store = configureStore(Immutable.fromJS({
      session: {
        user: {
          email
        }
      }
    }));
    subject = mount(withStore(<HomePage />, store));
  });

  it('should display a welcome message', () => {
    expect(subject.find(FormattedMessage).get(0).props.values.email).toEqual('john@test.com');
  });

  it('should display a logout button', () => {
    expect(subject.find(LogoutButton)).toHaveLength(1);
  });

  describe('click logout', () => {
    beforeEach(() => {
      nock(process.env.API_URL)
        .delete('/users/sign_out')
        .reply(204);

      sessionService.deleteSession = jest.fn(() => Promise.resolve());
      sessionService.deleteUser = jest.fn(() => Promise.resolve());
      const logoutButton = subject.find(LogoutButton).at(0);
      logoutButton.simulate('click');
    });

    it('should call redux-session-service to delete the user data', (done) => {
      sessionService.deleteUser = jest.fn(() => {
        expect(sessionService.deleteUser).toHaveBeenCalled();
        expect(sessionService.deleteSession).toHaveBeenCalled();
        done();
        return Promise.resolve();
      });
    });
  });
});
