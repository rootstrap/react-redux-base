let instance = null;

class loginPatch {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  getSession() {
    return this.session;
  }

  setSession(id, token, email) {
    this.session = { id: id, token: token, email: email };
  }

  deleteSession() {
    instance = null;
  }
}

export default loginPatch;
