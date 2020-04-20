/* import { example } from './example.js';

example();*/


const getRandomImage = (num) => {
    const ranImage = Math.round(Math.random()*num);
    return ranImage;
}
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
const imageRandom = `<img src="./img/ImgRandom/${arrImage[randomNumber]}" alt="Image Gereral" class="img-general">`
figure.innerHTML = imageRandom;