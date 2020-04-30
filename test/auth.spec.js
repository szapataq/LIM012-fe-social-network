import {
  signIn,
  createNewUser,
} from '../src/model/authentication-model.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);
// test crear un usuario
describe('Crear un usuario', () => {
  it('Debería poder registrarse con email szapata013@gmail.com y password 12345678', () => createNewUser('szapata013@gmail.com', '12345678')
    .then((user) => {
      expect(user.email).toBe('szapata013@gmail.com');
      expect(user.password).toBe('12345678');
    }));
});
// funcion de firebase de iniciar sesion
describe('signIn', () => {
  it('Debería poder iniciar sesión', () => {
    signIn('soyuncacahuate@gmail.com', '12345678').then((user) => {
      expect(user.email).toBe('soyuncacahuate@gmail.com');
      expect(user.password).toBe('12345678');
    });
  });
});
