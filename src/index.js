
import { changeView } from './view-controller/index-route.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

init();


/* import { example } from './example.js';
example(); */

/*
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
const proyect = firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log(proyect);
*/
/* import login from './view/login.js'; */


/* const main = document.querySelector('main');
main.appendChild(login()); */

/*
const getRandomImage = (num) => {
  const ranImage = Math.round(Math.random() * num);
  return ranImage;
};

const numImage = 10;
const randomNumber = getRandomImage(numImage);
const arrImage = ['image_1.png',
  'image_2.png',
  'image_3.png',
  'image_4.png',
  'image_5.png',
  'image_6.png',
  'image_7.png',
  'image_8.png',
  'image_9.png',
  'image_10.png',
  'image_11.png'];
const figure = document.querySelector('figure');
const imageRandom = `<img src="./img/ImgRandom/${arrImage[randomNumber]}"
  alt="Image Gereral" class="img-general">`;
figure.innerHTML = imageRandom; */
