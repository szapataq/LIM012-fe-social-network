import {
  signIn,
  createNewUser,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
} from '../src/model/authentication-model.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

// funcion de firebase de iniciar sesion
describe('Iniciar sesion', () => {
  it('Debería poder iniciar sesión', (done) => {
    signIn('soyuncacahuate@gmail.com', '12345678').then((user) => {
      expect(user.email).toBe('soyuncacahuate@gmail.com');
      expect(user.password).toBe('12345678');
      done();
    });
  });
});

// test crear un nuevo usuario
describe('Crear un usuario', () => {
  it('Debería poder registrarse con email szapata013@gmail.com y password 12345678', () => createNewUser('szapata013@gmail.com', '12345678')
    .then((user) => {
      expect(user.email).toBe('szapata013@gmail.com');
      expect(user.password).toBe('12345678');
    }));
});

// funcion de iniciar sesion con google
describe('Iniciar sesion con google', () => {
  it('Deberia iniciar sesion con Google', () => {
    signInWithGoogle().then((user) => {
      expect(user.isAnonymous).toBe(false);
    });
  });
});

// funcion de iniciar sesion con google
describe('Iniciar sesion con facebook', () => {
  it('Deberia iniciar sesion con Google', () => {
    signInWithFacebook().then((user) => {
      expect(user.isAnonymous).toBe(false);
    });
  });
});

// funcion de cerrar asesion
describe('Cerrar sesion', () => {
  it('Deberia cerrar sesion', () => {
    signOut().then((user) => {
      expect(user).toBe(null);
    });
  });
});
