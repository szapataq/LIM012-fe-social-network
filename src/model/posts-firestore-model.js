export const datePostDB = () => {
  const datePost = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const timePost = {
    hour12: 'true',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date().toLocaleDateString('es-Es', datePost);
  const time = new Date().toLocaleTimeString('es-Es', timePost);
  const dateTime = `${date} ${time}`;

  return dateTime;
};

export const createPostDB = (post, privacy) => {
  const db = firebase.firestore();
  return db.collection('posts').add({
    uid: firebase.auth().currentUser.uid,
    post,
    photo: '',
    privacy,
    date: datePostDB(),
    likes: 0,
    comments: [],
  }).then((refDoc) => {
    console.log(`Id del usuario => ${refDoc.id}`);
  })
    .catch((error) => {
      console.log(error);
    });
};
