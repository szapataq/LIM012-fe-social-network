export const shareImgPost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPosts/${uid}/${file.name}`);
  const taskStorage = refStorage.put(file);

  const stateSnapshot = (snapshot) => {
    const percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    console.log(percent);
    // $('.determinate').attr('style', `width: ${percent}%`);
  };

  const catchError = (err) => {
    console.log(err.message);
  };

  const fileReady = () => {
    taskStorage.snapshot.ref.getDownloadURL()
      .then((url) => {
        console.log(url);
        sessionStorage.setItem('imgNewPost', url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  taskStorage.on('state_changed', stateSnapshot, catchError, fileReady);
};
