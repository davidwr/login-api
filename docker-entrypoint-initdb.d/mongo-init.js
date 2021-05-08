db = db.getSiblingDB('login-api-dev');
db.createUser(
  {
    user: 'davidwr',
    pwd: '123mudar',
    roles: [{ role: 'readWrite', db: 'login-api-dev' }]
  }
);
db.createCollection('users');