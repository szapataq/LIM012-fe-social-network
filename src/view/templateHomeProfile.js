export const homeHeader = `
  <a href="#/home"><img src="./img/home.png" alt="Home" class="icons-cp">
  <span>Inicio</span></a>`;

export const profile = `
  <a href="#/profile"><img src="./img/profile.png" alt="Profile" class="icons-cp usercp">
  <span>Perfil</span></a>`;

export const optionsMobile = `
  <div class="items itemsHover">${homeHeader}</div>
  <div class="items itemsHover">${profile}</div>`;

export const postProfile = `
<div class="new-post">
<textarea rows="4" cols="50" placeholder="¿Qué quieres compartir?"></textarea>
<div class="container-functions">
  <div class="camera-privacity">
    <img src="./img/camera.png" class="camera">
    <div class="privacidad">
      <!--<img src="img/public.png">-->
      <select>
        <option value="1"> 🌐 Público</option>
        <option value="1"> 🔓 Solo yo </option>
      </select>
    </div>
  </div>
  <button> Compartir</button>
</div>
</div>`;

export const imgUserDefault = './img/user.png';

export const postHome = `
  <div class="own-post">
    <div class="title-new-post-own">
      <img src="${localStorage.getItem('userImg') || imgUserDefault}" alt="" class="user-foto">
      <div class="comun-ocupation">
        <h4>${localStorage.getItem('userName')}</h4>
        <img src="./img/public.png" alt="" class="icon-own">
      </div>
      <div class="simulator-select">
        <span><i class="fas fa-ellipsis-v"></i></span>
        <ul>
          <li>🌐 Público</li>
          <li>🔓 Solo yo</li>
        </ul>
      </div>
    </div>
    <div class="new-post">
      <textarea rows="4" cols="50" placeholder="¿Qué quieres compartir?"></textarea>
      <div class="container-functions">
        <div class="camera-privacity">
          <img src="./img/camera.png" class="camera">
        </div>
        <button> Compartir</button>
      </div>
    </div>
  </div>`;

const iconEdit = () => {
  let icon = '';
  if (/profile/.test(window.location.hash)) {
    icon = '<img src="./img/edit.png" class="edit">';
  }
  return icon;
};

export const userLoggedIn = () => `
<figure>
  <img src="./img/ImgRandom/image_3.png" alt="cover image" class="img-general">
</figure>
<img src="${localStorage.getItem('userImg') || imgUserDefault}" class="photo">
<div class="user-data">
<div class="container-info">
  <div class="name">
    <p>${localStorage.getItem('userName')}</p>
    ${iconEdit()}
  </div>
  <div class="description">
    <p>&lt;/&gt;Developer Ingenieria de sistemas Universidad nacional de san Agustin desarrolladora de fron End</p>
    ${iconEdit()}
  </div>
</div>
</div>`;
