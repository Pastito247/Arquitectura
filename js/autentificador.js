function authenticate(username, password) {
    return username === 'ADMIN' && password === 'admin';
  }
  
  module.exports = {
    authenticate,
  };
  