import {
  homeHeader,
  profile,
  postHomeMobile,
  postArea,
  optionsMobile,
  userLoggedIn,
  imgProfileUserDefault,
} from './templateHomeProfile.js';

import {
  signOutUser,
  codersArea,
} from '../controller/homeProfile-controller.js';

import {
  createNewPost,
  readingPosts,
} from '../controller/post-controller.js';

import {
  readPostDB,
} from '../model/posts-firestore-model.js';

import {
  shareImgPost,
} from '../model/storage-firestore-model.js';

// FUNCIÓN UTILITARIA PARA DETECTAR EL DISPOSITIVO
const device = () => {
  const dv = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|SymbianOS|Windows Phone/i.test(window.navigator.userAgent) ? 'Mobile' : 'Desktop';
  return dv;
};

const deviceIPad = () => {
  const dv = /Android|webOS|iPhone|iPod|BlackBerry|BB|PlayBook|SymbianOS|Windows Phone/i.test(window.navigator.userAgent) ? 'Mobile' : 'Desktop';
  return dv;
};

const changeUserLogged = () => {
  let userData = '';
  if (deviceIPad() === 'Mobile' && /home/.test(window.location.hash)) {
    userData = '';
  } else {
    userData = userLoggedIn();
  }
  return userData;
};

const changeMenu = () => {
  let menu = '';
  if (device() === 'Mobile') {
    menu = optionsMobile;
  } else {
    menu = `<div class="items itemsHover">${(/profile/.test(window.location.hash)) ? homeHeader : profile}</div>`;
  }
  return menu;
};

const changeViewPost = () => {
  let post = '';
  if (device() === 'Desktop') {
    post = postArea;
  } else {
    post = (/profile/.test(window.location.hash)) ? postArea : postHomeMobile();
  }
  return post;
};

const changeContainerPosts = () => {
  let containerPosts = '';
  if (/home/.test(window.location.hash)) {
    containerPosts = '<div class="container-new-post-home">';
  } else {
    containerPosts = '<div class="container-new-post">';
  }
  return containerPosts;
};

export default () => {
  const headerHome = `
  <input type="checkbox" id="btnMenu">
  <label for="btnMenu">&#9776;</label>
  <h1 class="coderPlace">&lt;CoderPlace/&gt;</h1>
  <nav class="menu">
    <section class="separator">
      <section>
        <div class="items userLogged">
          <img src="${localStorage.getItem('userProfileImg') || imgProfileUserDefault}" alt="Profile" class="userImage">
          <span class="userName"> ${localStorage.getItem('userName') || 'Nombre y Apellido '}</span>
        </div>
        ${changeMenu()}
      </section>
      <div class="main-title">
        <h1 class="coderPlaceDesktop">&lt;CoderPlace/&gt;</h1>
      </div>
      <div class="items itemsHover" id="log-out">
        <img src="./img/log-out.png" alt="Log Out" class="icons-cp">
        <span>Cerrar Sesión</span>
      </div>
    </section>
  </nav>`;

  const mainHome = `
  <div class="container-main">
    <div class="general-information">
      <div class="user-logged">${changeUserLogged()}</div>
      <div class="coder-information">
        <div class="coder-header">
          <p>&lt; Coders /&gt;</p>
        </div>
        <div class="container-coders">
          <div class="info-coder">
            <img src="./img/user.png" class="user-comment">
            <div class="name-ocupation">
              <div class="comun-coders">
                <p>Juan Jose Gallegos Valdivia</p>
              </div>
              <p>&lt;/&gt;Developer</p>
            </div>
          </div>
          <div class="info-coder">
            <img src="./img/user.png" class="user-comment">
            <div class="name-ocupation">
              <div class="comun-coders">
                <p>Isabel Angelica Lucia Paredes Apaza</p>
              </div>
              <p>&lt;/&gt;Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-post">
      <div class = "change-post">${changeViewPost()}</div>
      ${changeContainerPosts()}
        <div class="each-post">
          <div class="title-new-post">
            <img src="" alt="" class="user-foto">
            <div>
              <h4></h4>
              <div class="time">
                <p></p>
                <img src="" alt="privacidad">
              </div>
            </div>
          </div>
          <div class="body-post">
            <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
              incidunt.</p>
          </div>
          <div class="like-comment">
            <div>
              <img src="./img/like.png" alt="" class="icon-like">
              <img src="./img/comment.png" alt="" class="icon-comment">
            </div>
            <p>1234 Me Gusta</p>
          </div>
          <div class="new-comment">
            <img src="./img/user.png" alt="" class="user-comment">
            <input type="text" placeholder="Agrega un comentario...">
            <img src="./img/icon-send.png" alt="" class="icon-send">
          </div>
          <div class="container-comments">
            <div class="name-comment">
              <img src="./img/user.png" alt="" class="user-comment">
              <div>
                <h4>Juan Jose Gallegos Valdivia</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem autem illo fugit, voluptate
                laborum possimus in quia, aut nesciunt alias voluptatem? Animi amet dolorum labore! Exercitationem
                rem asperiores quo maxime.
                </p>
              </div>
              <div class="simulator-select">
                <span><i class="fas fa-ellipsis-v"></i></span>
                <ul>
                  <li>✎ Editar</li>
                  <li>✖ Eliminar</li>
                </ul>
              </div>
            </div>
            <div class="name-comment">
            <img src="./img/user.png" alt="" class="user-comment">
            <div>
              <h4>Juan Jose Gallegos Valdivia</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem autem illo fugit, voluptate
              laborum possimus in quia, aut nesciunt alias voluptatem? Animi amet dolorum labore! Exercitationem
              rem asperiores quo maxime.
              </p>
            </div>
            <div class="simulator-select">
              <span><i class="fas fa-ellipsis-v"></i></span>
              <ul>
                <li>✎ Editar</li>
                <li>✖ Eliminar</li>
              </ul>
            </div>
          </div>
          </div>
        </div>

        <div class="each-post">
          <div class="title-new-post">
            <img src="./img/user.png" alt="" class="user-foto">
            <div>
              <h4>Laura Zapata Quentasi</h4>
              <div class="time">
                <p>20/09/2020</p>
                <p>23:14</p>
                <img src="./img/public.png" alt="">
              </div>
            </div>
          </div>
          <div class="body-post">
            <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
            incidunt.</p>
          </div>
          <div class="like-comment">
            <div>
              <img src="./img/like.png" alt="" class="icon-like">
              <img src="./img/comment.png" alt="" class="icon-comment">
            </div>
            <p>1234 Me Gusta</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  // CREANDO EL CONTENEDOR DE LOS TEMPLATES
  const sectionMain = document.createElement('section');
  sectionMain.className = 'section-main';
  sectionMain.innerHTML = mainHome;
  const header = document.querySelector('header');
  header.innerHTML = headerHome;

  // PARA MOSTRAR EL AREA DE CODERS
  codersArea();

  // PARA MOSTRAR TODOS LOS POSTS
  readPostDB(readingPosts);

  // PARA ELIMINAR LA IMG CARGADA EN EL POST
  const btnDeleteImg = sectionMain.querySelector('.deleteImg');
  if (btnDeleteImg) {
    btnDeleteImg.addEventListener('click', () => {
      sessionStorage.removeItem('imgNewPost');
      btnDeleteImg.parentNode.classList.add('hide');
    });
  }

  // FUNCION DE COMPARTIR POST EN PERFIL E INICIO ESCRITORIO
  const btnSharePost = sectionMain.querySelector('#btnSharePost');

  if (btnSharePost) {
    btnSharePost.addEventListener(('click'), () => {
      const post = sectionMain.querySelector('#postArea');
      const privacyPostArea = sectionMain.querySelector('#privacyPostArea');
      const postContent = post.value;
      const privacyPost = privacyPostArea.value;

      if (!postContent && !sessionStorage.getItem('imgNewPost')) {
        const emptyPostMessage = document.querySelector('#emptyPost');
        emptyPostMessage.classList.remove('hide');
        emptyPostMessage.innerText = '👀 Parece que tu post está vacío. 👆';
        setTimeout(() => {
          emptyPostMessage.classList.add('hide');
        }, 1500);
      } else {
        createNewPost(postContent, privacyPost);
        if (btnDeleteImg) btnDeleteImg.parentNode.classList.add('hide');
        post.value = '';
      }
    });
  }

  // FUNCIÓN PARA CERRAR SESIÓN
  const btnLogOut = header.querySelector('#log-out');

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      signOutUser();
    });
  }

  // FUNCIÓN PARA SUBIR LAS IMAGENES EN LOS POSTS
  const bntImgPost = sectionMain.querySelector('#photoPost');

  if (bntImgPost) {
    bntImgPost.addEventListener(('change'), (e) => {
      const file = e.target.files[0];
      const userPost = firebase.auth().currentUser;
      shareImgPost(file, userPost.uid);
    });
  }

  // SIMULATOR SELECT PRIVACY
  const priv = sectionMain.querySelector('#private');
  const pub = sectionMain.querySelector('#public');

  if (priv) {
    pub.addEventListener('click', () => {
      sessionStorage.setItem('privacy', 1);
      const privPost = document.querySelector('#privPost');
      if (privPost) privPost.setAttribute('src', './img/public.png');
    });
  }

  if (pub) {
    priv.addEventListener('click', () => {
      sessionStorage.setItem('privacy', 2);
      const privPost = document.querySelector('#privPost');
      if (privPost) privPost.setAttribute('src', './img/private.png');
    });
  }

  // FUNCIÓN PARA TOMAR EL VALOR DEL SELECT PRIVACIDAD
  const selectPrivacy = sectionMain.querySelector('#privacyPostArea');
  if (selectPrivacy) {
    selectPrivacy.addEventListener(('change'), () => {
      if (selectPrivacy.value === '1') {
        sessionStorage.setItem('privacy', '1');
      } else {
        sessionStorage.setItem('privacy', '2');
      }
    });
  }

  return sectionMain;
};
