import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

let instance;

class History {
  constructor() {
    if (!instance) {
      instance = process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();
    }
    // if (window.Cypress) {
    window.cypressHistory = instance;
    // }
    return instance;
  }
}

export default new History();
