export const shareImgPost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPosts/${uid}/${file.name}`);
  const taskStorage = refStorage.put(file);

  const stateSnapshot = (snapshot) => {
    const percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    const progress = document.querySelector('.progress');
    progress.parentNode.classList.add('showProgress');
    progress.innerText = `${percent.toFixed(0)}%`;
    progress.style.width = `${percent}%`;
    // console.log(percent);
  };

  const catchError = (err) => {
    const progress = document.querySelector('.progress');
    progress.parentNode.innerText = 'Error al cargar foto';
    console.log(err.message);
  };

  const fileReady = () => {
    taskStorage.snapshot.ref.getDownloadURL()
      .then((url) => {
        // console.log(url);
        sessionStorage.setItem('imgNewPost', url);
        const pic = document.querySelector('.picPost');
        pic.parentNode.classList.remove('hide');
        pic.setAttribute('src', url);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setTimeout(() => {
      const progress = document.querySelector('.progress');
      progress.parentNode.classList.remove('showProgress');
    }, 2500);
  };
  taskStorage.on('state_changed', stateSnapshot, catchError, fileReady);
};
