import routesPaths from 'constants/routesPaths';
import HomePage from 'features/home/HomePage';
import LoginPage from 'features/login/LoginPage';
import SignUpPage from 'features/signUp/SignUpPage';
import NotFoundPage from 'features/notFound/NotFoundPage';

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.login,
    component: LoginPage
  },
  {
    path: routesPaths.signUp,
    component: SignUpPage
  },
  {
    component: NotFoundPage
  }
];

export default routes;
