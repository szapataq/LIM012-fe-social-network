import {
  homeHeader,
  profile,
  postHome,
  postProfile,
  optionsMobile,
  userLoggedIn,
}
  from './templateHomeProfile.js';

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
    post = postProfile;
  } else {
    post = (/profile/.test(window.location.hash)) ? postProfile : postHome;
  }
  return post;
};

export default () => {
  const headerHome = `<input type="checkbox" id="btnMenu">
  <label for="btnMenu">&#9776;</label>
  <h1 class="coderPlace">&lt;CoderPlace/&gt;</h1>
  <nav class="menu">
    <section class="separator">
      <section>
        <div class="items userLogged">
          <img src="./img/user.png" alt="Profile" class="userImage">
          <span class="userName"> ${localStorage.getItem('userName') || 'Nombre y Apellido '}</span>
        </div>
        ${changeMenu()}
      </section>
      <div class="main-title">
        <h1 class="coderPlaceDesktop">&lt;CoderPlace/&gt;</h1>
      </div>
      <div class="items itemsHover">
        <img src="./img/log-out.png" alt="Log Out" class="icons-cp">
        <span><a href="./index.html" class="salir">Cerrar Sesión</a></span>
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
                <p>Isabel Angelica Lucia Paredes Apaza</p>
              </div>
              <p>&lt;/&gt;Developer</p>
            </div>
          </div>
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
      <div class="container-new-post">
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
  </div>

   `;
  const sectionMain = document.createElement('section');
  sectionMain.className = 'section-main';
  const header = document.querySelector('header');
  sectionMain.innerHTML = mainHome;
  header.innerHTML = headerHome;
  return sectionMain;
};
