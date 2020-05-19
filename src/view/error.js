export default () => {
  const viewDifferent = `
    <div class="error">
      <figure class="container-img-error">
        <img src="./img/error.png" alt="" class="img-error">
      </figure>
      <div class="body-error">
        <h2>Oops!, Pagina no encontrada...</h4>
        <P>La página no existe o se produjo algún otro error. Vaya a nuestra página de inicio o regrese a la <span class="back">página anterior</span>.</P>
      </div>
    </div>`;

  const sectionError = document.createElement('section');
  sectionError.innerHTML = viewDifferent;

  const back = sectionError.querySelector('.back');
  back.addEventListener('click', () => {
    window.history.back();
  });

  return sectionError;
};
