import createBrowserHistory from 'history/createBrowserHistory';

let instance;

class History {
  constructor() {
    if (!instance) {
      instance = createBrowserHistory();
    }
    return instance;
  }
}

export default new History();
