import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from './LoginPage';
import LoginForm from '../components/session/LoginForm';

describe('<LoginPage />', () => {
  it('should contain <LoginForm />', () => {
    const actions = {
      login: () => {}
    };
    const wrapper = shallow(<LoginPage actions={actions}/>);

    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});
