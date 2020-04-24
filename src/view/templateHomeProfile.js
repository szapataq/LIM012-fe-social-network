export const homeHeader = `
  <a href="#/home"><img src="./img/home.png" alt="Home" class="icons-cp">
  <span>Inicio</span></a>`;

export const profile = `
  <a href="#/profile"><img src="./img/profile.png" alt="Profile" class="icons-cp usercp">
  <span>Perfil</span></a>`;

export const postHome = `
<div class="new-post">
<textarea rows="4" cols="50" placeholder="¿Qué quieres compartir?"></textarea>
<div class="container-functions">
  <div class="camera-privacity">
    <img src="./img/camera.png" class="camera">
    <div class="privacidad">
      <!--<img src="img/public.png">-->
      <select>
        <option value="1"> 🌐 Público</option>
        <option value="1"> 🔓 Privado </option>
      </select>
    </div>
  </div>
  <button> Compartir</button>
</div>
</div>`;

export const postProfile = `<div class="own-post">
<div class="title-new-post-own">
  <img src="./img/user.png" alt="" class="user-foto">
  <div class="time">
    <h4>Laura Zapata Quentasi</h4>
    <img src="./img/public.png" alt="">
  </div>
  <div class="simulator-select">
    <span>...</span>
    <ul>
      <li><a href="#">🌐 Público</a></li>
      <li><a href="#">🔓 Privado </a></li>
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
