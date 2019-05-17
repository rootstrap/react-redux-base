const user = ({ email = 'joe@joe.com', password = "password", isResponse = true } = {}) => {
  let user;
  if (isResponse) {
    user = { email , id: 1, uid: email, provider: 'email' }
  } else {
    user = { email, password };
  }
  return user;
}

export default user;
