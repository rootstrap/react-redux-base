import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

let instance;

class History {
  constructor() {
    if (!instance) {
      instance = process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();
    }
    return instance;
  }
}

export default new History();
