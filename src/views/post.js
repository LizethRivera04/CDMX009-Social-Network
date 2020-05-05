import { root } from "../main.js";
import { navBar } from "../main.js";
//Esto dibuja la vista donde se puede agregar un post

let db = firebase.firestore()

export function renderPostView() {
  const posts =
    `<section id="container">
    <div class="container has-text-white">
      <h1> Escribe tu microcuento:</h1>
      <h1>Titulo:</h1>
      <input id="title" class="input is-success" type="text" placeholder="Título">
      <textarea id="body" class="textarea is-success is-large" type="text" placeholder="Escribe acá tu cuento"></textarea>
      <div class="field is-horizontal">
        
        <div class="file is-primary is-centered">
          <label class="file-label">
            <input id="file" class="file-input" type="file" accept = "image/*" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Agrega una ilustración...
              </span>
            </span>
          </label>
        </div>
    <button id="newPost" class="button  is-fullwidth is-primary is-large">Publicar</button>
    <section id="putPosts" class="sectionPosts"></section>
    </section>
    
    `
  navBar.style.display = 'block'
  root.innerHTML = posts


  //Nodos Imagen
  const fileInput = document.querySelector("#file")
  const sectionPosts = document.querySelector("#putPosts")
  //Nodos publicación

  const newPost = document.querySelector("#newPost")
  newPost.addEventListener('click', readText)

  readFile(fileInput, sectionPosts)

  showPosts(sectionPosts)

}

function readFile(fileInput, sectionPosts) {
  let url

  //const fileInput = document.querySelector("#file")
  fileInput.onchange = (e) => {
    console.log(e);
    let file = e.target.files[0]
    console.log(file);
    firebase.storage().ref("postsList").child(file.name).put(file)
      .then(snap => {
        console.log(snap);
        return snap.ref.getDownloadURL()
      })
      .then(link => {
        url = link
        console.log(url);
        const img = document.createElement('img')
        img.src = url
        sectionPosts.appendChild(img)
        textImage()
      })
      .catch(err => {
        alert("Error:", err);
      })
  }
  function textImage() {
    const text = document.querySelector('#body').value
    const title = document.querySelector("#title").value

    firebase.auth().onAuthStateChanged(function (user) {
      //console.log(user);
      const docRef = db.collection('datausers/').doc(user.uid);
      docRef.get().then(function (snapshot) {
        let userData = snapshot.data();
        console.log(userData);
        let post = {
          title: title,
          text: text,
          user: userData.name,
          photo: userData.photo,//photoURL
          date: new Date(),
          img: url,
          //uid: userData.uid
        }
        addNewPost(post)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log("No hay nuevo post", err)
          })
        addPostBD(post)
      })
    });
  }

}

function readText() {
  const text = document.querySelector('#body').value
  const title = document.querySelector("#title").value
  /* let user = firebase.auth().currentUser;
  console.log(user);
 */
  firebase.auth().onAuthStateChanged(function (user) {
    //console.log(user);
    const docRef = db.collection('datausers/').doc(user.uid);
    docRef.get().then(function (snapshot) {
      let userData = snapshot.data();
      console.log(userData);
      let post = {
        title: title,
        text: text,
        user: userData.name,
        photo: userData.photo,//photoURL
        date: new Date(),
        uid: userData.uid
      }
      addNewPost(post)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log("No hay nuevo post", err)
        })
      addPostBD(post)

    })

  });

}


//Se agrega el post a la collección postsList en la BD 
function addNewPost(post) {
  return firebase.firestore().collection("postsList").add(post)
}


/* function dataBD() {
  firebase.firestore().collection("postsList").get().then(function (docs) {
    docs.forEach(function (doc) {
      console.log(doc.id);
    });
  });
}
dataBD()
 */

//Se agregan los post al perfil del usuario 
function addPostBD(post) {
  let user = firebase.auth().currentUser;
  console.log(user);
  const docRef = db.collection('datausers/').doc(user.uid);
  docRef.update({
    post: firebase.firestore.FieldValue.arrayUnion(post)
  })
}

//Muestra los posts en tiempo real
function showPosts(sectionPosts) {

  firebase.firestore().collection("postsList").onSnapshot(snap => {
    clean(sectionPosts)
    snap.forEach(doc => {
      console.log(doc.data());

      if (doc.data().img === undefined && doc.data().photo != undefined) {
        let renderPosts = `<div class="postContent" dataid="${doc.id}">
        <a href="#" class="editPost"> <i class="fas fa-pencil-alt"></i></a>
        <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p> ${doc.data().user}</p>
      <p>${doc.data().title}</p>
      <p>${doc.data().text}</p>
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike"><i class="fas fa-heart"></i></a>
      <div class="resultCounter counter">${doc.data().likes}</div>
      <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
      </div>
    </div>`
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)

      } if (doc.data().img != undefined && doc.data().photo != undefined) {
        let renderPosts = `<div class="postContent" dataid="${doc.id}">
        <a href="#" class="editPost"> <i class="fas fa-pencil-alt"></i></a>
        <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p> ${doc.data().user}</p>
      <p>Titulo:${doc.data().title}</p>
      <p>${doc.data().text}</p>
      <img max- width="200" src="${doc.data().img}" />
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike "><i class="fas fa-heart"></i></a>
      <div class="resultCounter counter">${doc.data().likes}</div>
      <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
      
      </div>
    </div>`
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)

      } /* else {
        let renderPosts = `<div>
        <p> Autor: ${doc.data().user}</p>
      <p>Titulo:${doc.data().title}</p>
      <p>${doc.data().text}</p>
      <img max- width="200" src="${doc.data().img}" />
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike "><i class="fas fa-heart"></i></a>
      <div class="resultCounter counter">${doc.data().likes}</div>
      <button class="comentPost">Comentar</button>
      </div>
      
    </div>`
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)
      } */

      //LIKES
      let btnLike = document.querySelectorAll('.btnLike')
      //console.log(btnLike);
      let btnClick = btnLike[btnLike.length - 1]
      console.log(btnClick);

      btnClick.addEventListener('click', counter)
      //let resultLikes = document.querySelectorAll('.resultCounter')
      //let listResultLikes = resultLikes[resultLikes.length - 1]
      let countLikes = 0
      function counter() {
        let user = firebase.auth().currentUser;

        console.log(user.displayName);
        let whoLike = user.displayName

        let idPost = btnClick.getAttribute('dataid')
        console.log(idPost);
        countLikes = countLikes + 1
        console.log(countLikes);

        const docPost = firebase.firestore().collection("postsList").doc(idPost)
        docPost.get().then(docPost => {
          let whosLikePost = docPost.data().whoLike
          console.log(whosLikePost);
          /* console.log(whosLikePost.includes(whoLike));
          let checkUser = whosLikePost.includes(whoLike) */
          if (whosLikePost === undefined) {
            saveLikes(countLikes, idPost, whoLike)
            btnClick.classList.add('colorLike')

          } if (whosLikePost != undefined) {
            console.log(whosLikePost.includes(whoLike));
            let checkUser = whosLikePost.includes(whoLike)
            if (checkUser === false) {
              saveLikes(countLikes, idPost, whoLike)
              btnClick.classList.add('colorLike')
            }

          }
        });
      }

      //COMENTS
      /* let btnComentPost = document.querySelectorAll('.comentPost')
      let btnComent = btnComentPost[btnComentPost.length - 1]
      console.log(btnComent); */
      //EDITAR
      /* let btnComentPost = document.querySelectorAll('.comentPost')
      let btnComent = btnComentPost[btnComentPost.length - 1]
      console.log(btnComent);
 */
    })
  })


}

function saveLikes(countLikes, idPost, whoLike) {
  const docPost = firebase.firestore().collection("postsList").doc(idPost)
  docPost.update({
    likes: firebase.firestore.FieldValue.increment(countLikes),
    whoLike: [whoLike]
  })
}


//Antes de poner el nuevo post limpia la sectionPost para evitar se dupliquen 
function clean(sectionPosts) {
  sectionPosts.innerHTML = '';
}


