import { changeView } from './view-controller/index-route.js';
// import { createAccount } from './controller/createUser.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
const firebaseConfig = {
  apiKey: 'AIzaSyB7XXICckIQmK-SiDWZBagzx8GVU3unSSE',
  authDomain: 'coderplace-5d71e.firebaseapp.com',
  databaseURL: 'https://coderplace-5d71e.firebaseio.com',
  projectId: 'coderplace-5d71e',
  storageBucket: 'coderplace-5d71e.appspot.com',
  messagingSenderId: '1090567519373',
  appId: '1:1090567519373:web:b19c07f653d94cc3d436c4',
  measurementId: 'G-765SHE11K7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
init();
