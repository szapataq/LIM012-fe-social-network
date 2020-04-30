import { createNewUser } from '../src/model/authentication-model.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

describe('Creando una cuenta', () => {
  it('Debería crear una cuenta', (done) => {
    createNewUser('alguien@example.com', '123456')
      .then((user) => {
        expect(user.email).toBe('alguien@example.com');
        expect(user.isAnonymous).toBe(false);
        done();
      });
  });
});
