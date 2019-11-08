import { createBrowserHistory, createMemoryHistory } from 'history';

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
