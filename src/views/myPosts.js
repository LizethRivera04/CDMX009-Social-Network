import { renderPostView } from "./post.js"
import { root } from "../main.js";
import { navBar } from "../main.js";

/* const myPosts = document.querySelector('#btnMyPost')
console.log(myPosts); */

//myPosts.addEventListener('click', orderMyPosts)
//const allPosts = document.querySelector('#btnAllPost')
//allPosts.addEventListener('click', orderAllPosts)
let db = firebase.firestore()
export function renderMyPosts() {
    const myPosts = `
    <div class=" container-myposts">
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
    root.innerHTML = myPosts
    const allPosts = document.querySelector('#btnAllPost')
    allPosts.addEventListener('click', renderPostView)
    const sectionPosts = document.querySelector("#putPosts")

    showMyPosts(sectionPosts)
}
function showMyPosts(sectionPosts) {

    console.log('ordenar tus posts');
    let user = firebase.auth().currentUser;
    let userUid = user.uid
    console.log(userUid);
    const postRef = db.collection("postsList")
    const mypostRef = postRef.where("uid", "==", userUid)
        .onSnapshot((snap) => {
            clean(sectionPosts)
            snap.forEach((doc) => {
                console.log(doc);
                //doc.exists===true(entonces me muestras el template con las publicaciones en root para que reemplace el snapshot general)
                console.log(doc.id, " => ", doc.data(), doc.data().text, doc.data().title);
                if (doc.exists === true && doc.data().img === undefined) {
                    let showPosts = `
                    <div class="postContent" dataid="${doc.id}">
            <div class="container-btnEdit">
            <a href="#" class="deletePost" dataid="${doc.id}"><i class="far fa-trash-alt"></i></a>
            <a href="#" class="editPost" dataid="${doc.id}"> <i class="fas fa-pencil-alt"></i></a>
            </div>
          <div class="userPost">
          <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p><strong> ${doc.data().user}</strong></p>
          </div>
          
          <h1>${doc.data().title}</h1>
          <input type="text" id = "A${doc.id}-title" class="item-none" placeholder="${doc.data().title}">
        <p>${doc.data().text}</p>
        <input type="text" id = "A${doc.id}-text" class="item-none" placeholder="${doc.data().text}">
        <div id="${doc.id}-divNew"></div>
        <label for="${doc.id}-file" id="A${doc.id}-labelfile" class="item-none"><i class="far fa-image" title="Upload"></i></label>
          <input class = "item-none fileInput" type="file" accept="image/*" id="A${doc.id}-file">
        <div class="contentLikes">
        <a href="#" dataid="${doc.id}" class="likes btnLike"><i class="fas fa-heart"></i></a>
        <div class="resultCounter counter">${doc.data().likes}</div>
        <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
        <a href="#" class="savePost item-none" dataid="${doc.id}"><i class="fas fa-save"></i></a>
        </div>
      </div>`
                    const newNode = document.createElement("div")
                    newNode.innerHTML = showPosts
                    sectionPosts.appendChild(newNode)
                    //root.innerHTML += myPosts

                } if (doc.exists === true && doc.data().img != undefined) {
                    let showPosts = `<div class="postContent" dataid="${doc.id}">
            <div class="container-btnEdit">
            <a href="#" class="deletePost" dataid="${doc.id}"><i class="far fa-trash-alt"></i></a>
            <a href="#" class="editPost" dataid="${doc.id}"><i class="fas fa-pencil-alt"></i></a>
            </div>
            
            <div class="userPost">
            <img max- width="70" class="imgUserPost" src="${doc.data().photo}"/><p><strong> ${doc.data().user}</strong></p>
            </div>
            <h1>${doc.data().title}</h1>
            <input type="text" id = "A${doc.id}-title" class="item-none" placeholder="${doc.data().title}">
          <p>${doc.data().text}</p>
          <input type="text" id = "A${doc.id}-text" class="item-none" placeholder="${doc.data().text}">
          <div id= "${doc.id}-imag" class="imgPost">
          <img id="${doc.id}-postimag" src="${doc.data().img}" />
          </div>
            <div id="${doc.id}-divNew"></div>
          <label for="${doc.id}-file" id="A${doc.id}-labelfile" class="item-none"><i class="far fa-image" title="Upload"></i></label>
          <input class = "item-none fileInput" type="file" accept="image/*" id="A${doc.id}-file">
          
          <div class="contentLikes">
          <a href="#" dataid="${doc.id}" class="likes btnLike "><i class="fas fa-heart"></i></a>
          <div class="resultCounter counter">${doc.data().likes}</div>
          <a href="#" dataid="${doc.id}" class="comentPost counter"><i class="far fa-comment-alt"></i></a>
          <a href="#" class="savePost item-none" dataid="${doc.id}"><i class="fas fa-save"></i></a>
          </div>
        </div>`
                    const newNode = document.createElement("div")
                    newNode.innerHTML = showPosts
                    sectionPosts.appendChild(newNode)


                }

                //Listeners Edit Posts
                let inputTitle = document.querySelector(`#A${doc.id}-title`)
                console.log(inputTitle);
                let inputText = document.querySelector(`#A${doc.id}-text`)
                let inputFile = document.querySelector(`#A${doc.id}-labelfile`)
                let fileInput = document.querySelector(`#A${doc.id}-file`)

                let btnsEdit = document.querySelectorAll('.editPost')
                //console.log(btnsEdit);
                let btnEdit = btnsEdit[btnsEdit.length - 1]
                let btnsSave = document.querySelectorAll('.savePost')
                //console.log(btnsSave);
                let btnSave = btnsSave[btnsSave.length - 1]
                btnEdit.addEventListener('click', editPost)
                btnSave.addEventListener('click', saveNewPost)

                //Listeners Delete Posts
                let btnsDeletePost = document.querySelectorAll('.deletePost')
                let btnDeletePost = btnsDeletePost[btnsDeletePost.length - 1]
                console.log(btnsDeletePost);
                btnDeletePost.addEventListener('click', deletePost)


                function editPost() {

                    /* let prevImage = document.querySelector(`#${doc.id}-imag`)
                    let divNewImage = document.querySelector(`#${doc.id}-divNew`) */

                    /* let idEdit = btnEdit.getAttribute('dataid')*/
                    inputTitle.style.display = "block";
                    inputText.style.display = "block";
                    inputFile.style.display = "block";
                    btnSave.style.display = "block";
                    readNewFile()

                }

                function readNewFile() {
                    let prevImage = document.querySelector(`#${doc.id}-imag`)
                    let divNewImage = document.querySelector(`#${doc.id}-divNew`)

                    fileInput.onchange = (e) => {
                        console.log(e);
                        let file = e.target.files[0]
                        console.log(file);
                        firebase.storage().ref("photoUsers").child(file.name).put(file)
                            .then(snap => {
                                console.log(snap);
                                return snap.ref.getDownloadURL()

                            })
                            .then(link => {
                                if (prevImage) {
                                    prevImage.remove()
                                    let url = link
                                    console.log(url);
                                    const img = document.createElement('img')
                                    img.id = 'newPostImage'
                                    img.src = url
                                    divNewImage.appendChild(img)
                                } else {
                                    console.log('hola! no hay imag')
                                    let url = link
                                    console.log(url);
                                    const img = document.createElement('img')
                                    img.id = 'newPostImage'
                                    img.src = url
                                    console.log(img)
                                    console.log(divNewImage)
                                    divNewImage.appendChild(img)
                                }


                            })
                            .catch(err => {
                                alert("Error:", err);
                            })


                    }
                }


                function saveNewPost() {
                    let idSave = btnSave.getAttribute('dataid')
                    console.log(idSave);
                    let newTitle = inputTitle.value
                    let newText = inputText.value
                    console.log(newTitle);
                    console.log(newText);
                    let placeInputTitle = inputTitle.getAttribute('placeholder')
                    let placeInputText = inputText.getAttribute('placeholder')
                    if (newTitle === "" && newText === "") {
                        newTitle = placeInputTitle
                        newText = placeInputText
                        //updatePost(idSave, newTitle, newText)
                    } if (newTitle === "") {
                        newTitle = placeInputTitle
                    } if (newText === "") {
                        newText = placeInputText
                    }

                    inputTitle.style.display = "none";
                    inputText.style.display = "none";
                    inputFile.style.display = "none";
                    btnSave.style.display = "none";


                    updatePost(idSave, newTitle, newText)
                    /* if (newTitle === "" && newText === "") {
                      newTitle = doc.data().title
                      newText = doc.data().text
                      console.log(newTitle, newText);
                      //updatePost(idSave, newTitle, newText) 
                    } if (newTitle === "" && newText === "")*/
                    //updatePost(idSave, newTitle, newText)
                }

                function deletePost() {
                    let idDelete = btnDeletePost.getAttribute('dataid')
                    console.log(idDelete);
                    const docPost = firebase.firestore().collection("postsList").doc(idDelete).delete()
                        .then(function () {
                            console.log("Document successfully deleted!");
                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                }

                function updatePost(idSave, newTitle, newText) {
                    let newImage = document.querySelector('#newPostImage')
                    let thisImage = document.querySelector(`#${doc.id}-postimag`)
                    let urlImage
                    console.log(newImage);
                    console.log(thisImage);

                    if (newImage === null && thisImage === null) {
                        const docPost = firebase.firestore().collection("postsList").doc(idSave)
                        docPost.update({
                            title: newTitle,
                            text: newText
                        })
                            .then(function () {
                                console.log("Se actualizó el post", idSave);
                            })
                            .catch(function (error) {
                                console.log('Hubo en error editando el post:', error);
                            })
                    }
                    if (thisImage === null && newImage) {
                        urlImage = newImage.getAttribute('src')
                        const docPost = firebase.firestore().collection("postsList").doc(idSave)
                        docPost.update({
                            title: newTitle,
                            text: newText,
                            img: urlImage
                        })
                            .then(function () {
                                console.log("Se actualizó el post", idSave);
                            })
                            .catch(function (error) {
                                console.log('Hubo en error editando el post:', error);
                            })
                    }
                    if (newImage) {
                        urlImage = newImage.getAttribute('src')
                        console.log(urlImage);
                        const docPost = firebase.firestore().collection("postsList").doc(idSave)
                        docPost.update({
                            title: newTitle,
                            text: newText,
                            img: urlImage
                        })
                            .then(function () {
                                console.log("Se actualizó el post", idSave);
                            })
                            .catch(function (error) {
                                console.log('Hubo en error editando el post:', error);
                            })
                    } if (newImage === null) {
                        //let thisImage = document.querySelector(`#${doc.id}-postimag`)
                        urlImage = thisImage.getAttribute('src')
                        console.log(urlImage);
                        const docPost = firebase.firestore().collection("postsList").doc(idSave)//la / y el + user.uid hace que no se duplique el usuario
                        docPost.update({
                            title: newTitle,
                            text: newText,
                            img: urlImage
                        })
                            .then(function () {
                                //saveChange.classList.add('is-active');
                                console.log("Se actualizó el post", idSave);
                            })
                            .catch(function (error) {
                                console.log('Hubo en error editando el post:', error);
                            })


                    }
                }

            })
        })
}




function clean(sectionPosts) {
    sectionPosts.innerHTML = '';
}