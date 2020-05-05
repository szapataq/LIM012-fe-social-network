export default () => {
  const viewDifferent = `
    <div class="error">
      <figure class="container-img-error">
        <img src="./img/error.png" alt="" class="img-error">
      </figure>
      <div class="body-error">
        <h2>Oops!, page not found...</h4>
        <P>Page doesn't exist or some other error occured. Go to our home page or go back to previous page.</P>
      </div>
    </div>`;

  const sectionError = document.createElement('section');
  sectionError.innerHTML = viewDifferent;

  return sectionError;
};
