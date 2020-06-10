import { root } from "../main.js";
import { navBar } from "../main.js";
import { renderMyPosts } from "./myPosts.js"
import createComent from "./coments.js"
//Esto dibuja la vista donde se puede agregar un post

let db = firebase.firestore()

export function renderPostView() {
  const posts =
    `
    <div class="containerWritePost">
      <div class="writeTitle">
        <h1>Escribe tu Microcuento</h1>
      </div>
      <div class="inputPost">
        <input id="title" class="input is-success  is-rounded input-separate" type="text" placeholder="Título">
        <textarea id="body" class=" textAreaPost input-separate" type="text" placeholder="Escribe acá tu cuento"></textarea>
      </div>
      <div class="inputFile">
            <label for="file" id="labelFile"><i class="far fa-image fileIcon" title="Upload"></i></label>
            <input class= "ocultEditProfile" type="file" accept="image/*" id="file">
      </div>
      
      <div class="btnPost">
        <button id="newPost" class="button container-separateis-fullwidth is-primary is-rounded">Publicar</button>
      </div>
    </div>
      <div class="containerPost">
      <div class="containerBtnFilter">
      <button class="btnMyPost" id="btnMyPost">Mis Posts</button>
      <button class="btnAllPost" id="btnAllPost">Todos los posts</button>
      </div>
      <section id="putPosts" class="sectionPosts"></section>
      </div>
      <footer class="container-footer">
      </footer>
    
    `
  navBar.style.display = 'block'
  root.innerHTML = posts

  //Nodos Imagen
  const fileInput = document.querySelector("#file")
  const sectionPosts = document.querySelector("#putPosts")
  //Nodos publicación
  const newPost = document.querySelector("#newPost")
  newPost.addEventListener('click', readText)
  //Nodos filtro 
  const myPosts = document.querySelector('#btnMyPost')
  myPosts.addEventListener('click', renderMyPosts)
  //myPosts.addEventListener('click', orderMyPosts)
  const allPosts = document.querySelector('#btnAllPost')
  allPosts.addEventListener('click', orderAllPosts)
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
      cleanForm()

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

function cleanForm() {
  document.querySelector("#title").value = ""
  document.querySelector('#body').value = ""

}
//Muestra los posts en tiempo real
function showPosts(sectionPosts) {

  firebase.firestore().collection("postsList").orderBy('date', 'desc').onSnapshot(snap => {
    clean(sectionPosts)
    snap.forEach(doc => {
      //console.log(doc.data());
      //Post solo texto
      if (doc.data().img === undefined && doc.data().likes != undefined) {
        let renderPosts = `<div class="postContent" dataid="${doc.id}">
       
        <div class="userPost">
        <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p><strong> ${doc.data().user}</strong></p>
        </div>
        
        <h1>${doc.data().title}</h1>
      <p>${doc.data().text}</p>
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike"><i class="fas fa-heart"></i></a>
      <div class="resultCounter counter">${doc.data().likes}</div>
      <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
      </div>
    </div>
    <div class="modal" id= "A${doc.id}-modalComent">
        <div class="modal-background"></div>
        <div class="modal-content">
        <div class="container-modal-coment">
        <div class="contentComent">
        <div class="photoComent">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJaBifR3vaLnaThPnmGIuRCDhjGtdQA66z9KElRdECzeiWyGuO&usqp=CAU"
                alt="">
            <div class="contentUser">
                <div class="nameComent">
                    <h3 class="nameCom">Arturo</h3>
                </div>
                <div class="comentUser ">
                    <p class="userCom oneComment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quos
                        repellat
                        quibusdam vel
                        aspernatur
                        non
                        ex impedit vitae libero est. Architecto consectetur laudantium eaque fugiat! Adipisci
                        repellendus
                        commodi libero molestias!</p>
                    <div class="showTheComment">
                        <p class="showMore btnShowMore">Ver más</p>
                        <a href="" class=" arrowHide ocultShowMore"><i class="fas fa-angle-up"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
<div class = "container-send-coment">
<textarea  id="" cols="40" rows="2"></textarea>
    <a href="#" dataid="${doc.id}" class=""><i class="fab fa-telegram-plane"></i></a>
</div>
    
        </div>
        </div>
        <button class="modal-close is-large" aria-label="close" id= "A${doc.id}-closeComent"></button>
      </div>
    
    
    `
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)

        //Post con imagen y texto
      } if (doc.data().img != undefined && doc.data().photo != undefined && doc.data().likes != undefined) {
        let renderPosts = `<div class="postContent" dataid="${doc.id}">
        
        <div class="userPost">
        <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p><strong> ${doc.data().user}</strong></p>
        </div>
        <h1>${doc.data().title}</h1>
      <p>${doc.data().text}</p>
      <div class="imgPost">
      <img src="${doc.data().img}" />
      </div>
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike "><i class="fas fa-heart"></i></a>
      <div class="resultCounter counter">${doc.data().likes}</div>
      <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
      </div>
    </div>
    <div class="modal" id= "A${doc.id}-modalComent">
        <div class="modal-background"></div>
        <div class="modal-content">
        <div class="container-modal-coment">
        <div class="contentComent">
        <div class="photoComent">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJaBifR3vaLnaThPnmGIuRCDhjGtdQA66z9KElRdECzeiWyGuO&usqp=CAU"
                alt="">
            <div class="contentUser">
                <div class="nameComent">
                    <h3 class="nameCom">Arturo</h3>
                </div>
                <div class="comentUser ">
                    <p class="userCom oneComment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quos
                        repellat
                        quibusdam vel
                        aspernatur
                        non
                        ex impedit vitae libero est. Architecto consectetur laudantium eaque fugiat! Adipisci
                        repellendus
                        commodi libero molestias!</p>
                    <div class="showTheComment">
                        <p class="showMore btnShowMore">Ver más</p>
                        <a href="" class=" arrowHide ocultShowMore"><i class="fas fa-angle-up"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

        </div>
        

        </div>

        
        <button class="modal-close is-large" aria-label="close" id= "A${doc.id}-closeComent"></button>
      </div>
    

      
    `
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)

        //Post sin likes
      } if (doc.data().likes === undefined && doc.data().img != undefined) {
        let renderPosts = `<div class="postContent" dataid="${doc.id}">
        
        <div class="userPost">
        <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p><strong> ${doc.data().user}</strong></p>
        </div>
        <h1>${doc.data().title}</h1>
      <p>${doc.data().text}</p>
      <div class="imgPost">
      <img src="${doc.data().img}" />
      </div>
      
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike "><i class="fas fa-heart"></i></a>
      <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
      
      </div>
    </div>
    <div class="modal" id= "A${doc.id}-modalComent">
        <div class="modal-background"></div>
        <div class="modal-content">
        <div class="container-modal-coment">
        <div class="contentComent">
        <div class="photoComent">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJaBifR3vaLnaThPnmGIuRCDhjGtdQA66z9KElRdECzeiWyGuO&usqp=CAU"
                alt="">
            <div class="contentUser">
                <div class="nameComent">
                    <h3 class="nameCom">Arturo</h3>
                </div>
                <div class="comentUser ">
                    <p class="userCom oneComment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quos
                        repellat
                        quibusdam vel
                        aspernatur
                        non
                        ex impedit vitae libero est. Architecto consectetur laudantium eaque fugiat! Adipisci
                        repellendus
                        commodi libero molestias!</p>
                    <div class="showTheComment">
                        <p class="showMore btnShowMore">Ver más</p>
                        <a href="" class=" arrowHide ocultShowMore"><i class="fas fa-angle-up"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

        </div>
        

        </div>

        
        <button class="modal-close is-large" aria-label="close" id= "A${doc.id}-closeComent"></button>
      </div>
    
   
    `
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)

      } if (doc.data().likes === undefined && doc.data().img === undefined) {
        let renderPosts = `<div class="postContent" dataid="${doc.id}">
       
        <div class="userPost">
        <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p><strong> ${doc.data().user}</strong></p>
        </div>
        
        <h1>${doc.data().title}</h1>
      <p>${doc.data().text}</p>
      <div class="contentLikes">
      <a href="#" dataid="${doc.id}" class="likes btnLike"><i class="fas fa-heart"></i></a>
      
      <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
      </div>
    </div>
    
    <div class="modal" id= "A${doc.id}-modalComent">
        <div class="modal-background"></div>
        <div class="modal-content">
        <div class="container-modal-coment">
        <div class="contentComent">
        <div class="photoComent">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJaBifR3vaLnaThPnmGIuRCDhjGtdQA66z9KElRdECzeiWyGuO&usqp=CAU"
                alt="">
            <div class="contentUser">
                <div class="nameComent">
                    <h3 class="nameCom">Arturo</h3>
                </div>
                <div class="comentUser ">
                    <p class="userCom oneComment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quos
                        repellat
                        quibusdam vel
                        aspernatur
                        non
                        ex impedit vitae libero est. Architecto consectetur laudantium eaque fugiat! Adipisci
                        repellendus
                        commodi libero molestias!</p>
                    <div class="showTheComment">
                        <p class="showMore btnShowMore">Ver más</p>
                        <a href="" class=" arrowHide ocultShowMore"><i class="fas fa-angle-up"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>


        </div>
        
<p>Holi</p>
        </div>

        
        <button class="modal-close is-large" aria-label="close" id= "A${doc.id}-closeComent"></button>
      </div>
    
    
    
    `
        const newNode = document.createElement("div")
        newNode.innerHTML = renderPosts
        sectionPosts.appendChild(newNode)

      }

      //COMENTS

      let btnComents = document.querySelectorAll('.comentPost')
      let btnComent = btnComents[btnComents.length - 1]
      btnComent.addEventListener('click', createComent)
      let comentModal = document.querySelector(`#A${doc.id}-modalComent`)


      function createComent() {



        console.log(comentModal)

        comentModal.classList.add('is-active')

        let btnCloseComent = document.querySelector(`#A${doc.id}-closeComent`)
        btnCloseComent.addEventListener('click', closeChange)


      }
      function closeChange() {
        comentModal.classList.remove('is-active');
      }


      //LIKES
      let btnLike = document.querySelectorAll('.btnLike')
      //console.log(btnLike);
      let btnClick = btnLike[btnLike.length - 1]
      //console.log(btnClick);

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
      let btnComent = btnComentPost[btnComentPost.length - 1] */
      //console.log(btnComent);

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



function orderAllPosts() {
  console.log('ordenar todos los posts');
  const sectionPosts = document.querySelector("#putPosts")
  showPosts(sectionPosts)


}
//Antes de poner el nuevo post limpia la sectionPost para evitar se dupliquen 
function clean(sectionPosts) {
  sectionPosts.innerHTML = '';
}


