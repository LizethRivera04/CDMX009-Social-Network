import { root } from "../main.js";
import { navBar } from "../main.js";
//import { userObserver } from '/index.js'

const db = firebase.firestore();

export function userObserverProfile() {
  firebase.auth().onAuthStateChanged(function (user) {
    // if (user) {
    const docRef = db.collection('datausers/').doc(user.uid);
    docRef.get().then(function (snapshot) {
      let myData = snapshot.data();
      console.log(myData);
      root.innerHTML = renderProfileView(myData)
      edit()

    })
    /* } else {
      // No user is signed in.
      console.log('No user');
    } */

  });

}

/* export function renderProfileView(myData) {
  //console.log(myData);
  if (myData) {
    const profile =
      `
      <button class = "button is-rounded btnIcon" id="editProfile" ><span class="icon is-small"><i class="fas fa-pencil-alt"></i></span></button>
      <h1>Mi perfil</h1>
      <div id="changeImage"><img id="thisPhoto" src="${myData.photo}"></div>
      <div id="photoProfile"></div>
      <input class = "ocultEditProfile" type="file" accept="image/*" id="file">
    <h1 id="nameProfile">${myData.name}</h1>
    <h1 id="emailProfile">${myData.email}</h1>
    <div id="interest">${myData.interests}</div>
    <textarea class = "ocultEditProfile" id="interestsProfile" maxlength="200">${myData.interests}</textarea>
    
    
    <button class = "button is-rounded btnIcon ocultEditProfile" id="saveProfile" >Guardar</button>
    <button class = "button is-rounded btnIcon ocultEditProfile" id="cancelEdit">Cancelar</button>

    <div class="modal" id="saveChange">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">
            <button class="modal-close is-large" aria-label="close"  id="btnCloseChange"></button>
            <a href = "#" id="dataComplete" class = "imagePop"><i class="far fa-grin"></i></i></a>
            <p>Se han guardado tus cambios </p>
        </div>
    </div>
</div>
`
    navBar.style.display = 'block'
    return profile
  }

}
 */
/* export function renderProfileView(myData) {
  //console.log(myData);
  if (myData) {
    const profile =
      `
      <button class = "button is-rounded btnIcon" id="editProfile" ><span class="icon is-small"><i class="fas fa-pencil-alt"></i></span></button>
      <h1 class="title has-text-centered has-text-grey-lighter title is-5">Mi perfil</h1>
      <figure class='image container is-128x128'>
      <div id="changeImage"><img id="thisPhoto" src="${myData.photo}" class="is-rounded"></div>
      </figure>
      <div id="photoProfile"></div>
        <input class = "ocultEditProfile fileInput" type="file" accept="image/*" id="file">

      <h1 class="title has-text-centered has-text-grey-lighter title is-7" id="nameProfile">${myData.name}</h1>
 <h2 class="title has-text-centered has-text-grey-lighter title is-4" id="emailProfile">${myData.email}</h2>
    <div class="centerIndepent">
      <div id="interest">${myData.interests}</div>
      <div>
        <textarea class = "ocultEditProfile textareaInterest" id="interestsProfile" maxlength="200" placeholder="${myData.interests}">${myData.interests}</textarea>
      </div>
      
      <button class = "button is-rounded btnIcon ocultEditProfile saveBtn" id="saveProfile" >Guardar</button>
    </div>
    
    
    <div class="modal" id="saveChange">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">
            <button class="modal-close is-large" aria-label="close"  id="btnCloseChange"></button>
            <a href = "#" id="dataComplete" class = "imagePop"><i class="far fa-grin"></i></i></a>
            <p>Se han guardado tus cambios </p>
        </div>
    </div>
</div>
`
    navBar.style.display = 'block'
    return profile
  }

} */

export function renderProfileView(myData) {
  //console.log(myData);
  if (myData) {
    const profile = `
  
<section class="section">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
          <div class="profile">
            <div id="changeImage">
              <figure class='image container is-128x128'>
                <img id="thisPhoto" src="${myData.photo}" class="is-rounded">
              </figure>
            </div>
            <div class= "centerItem">   
            <div id="photoProfile">
            <input class = "ocultEditProfile fileInput" type="file" accept="image/*" id="file">
            </div>
            </div>
            <h1 class="title has-text-centered has-text-grey-lighter title is-8" id="nameProfile">
            ${myData.name}
            </h1>
            </div>
            <h2 class="title has-text-centered has-text-grey-lighter title is-4" id="emailProfile">
            ${myData.email}
            </h2>
 
            <div class= "centerItem" id="interest">${myData.interests}</div>
            <div class= "centerItem">
                <button class = "button is-rounded btnIcon  is-outlined is-primary" id="editProfile" >
                <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span></button>
            </div>
            <div class= "centerItem">
              <textarea class = "textarea is-primary ocultEditProfile subtitle is-6" rows="2" placeholder="***Bio*** / ¿De qué forma participarás? ¿Eres escritor?, ¿Ilustrador? o Ambos"  id="interestsProfile" maxlength="200">${myData.interests}</textarea>
            </div>
            <div class= "centerItem">
              <button class = "button is-rounded  is-outlined is-primary btnIcon ocultEditProfile" id="saveProfile" >Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
</section>
  
    <div class="modal" id="saveChange">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">
            <button class="modal-close is-large" aria-label="close"  id="btnCloseChange"></button>
            <a href = "#" id="dataComplete" class = "imagePop"><i class="far fa-grin"></i></i></a>
            <p>Se han guardado tus cambios </p>
        </div>
    </div>
</div>
`;

    navBar.style.display = "block";
    return profile;
  }
}

/* export function renderProfileView(myData) {
  //console.log(myData);
  if (myData) {
    const profile =
      `
      <button class = "button is-rounded btnIcon" id="editProfile" ><span class="icon is-small"><i class="fas fa-pencil-alt"></i></span></button>
      <h1 class="title has-text-centered has-text-grey-lighter title is-5">Mi perfil</h1>
      <figure class='image container is-128x128'>
      <div id="changeImage"><img id="thisPhoto" src="${myData.photo}" class="is-rounded"></div>
      </figure>
      <div id="photoProfile"></div>
      <input class = "ocultEditProfile" type="file" accept="image/*" id="file">
      <h1 class="title has-text-centered has-text-grey-lighter title is-7" id="nameProfile">
      ${myData.name}
 </h1>
 <h2 class="title has-text-centered has-text-grey-lighter title is-4" id="emailProfile">
      ${myData.email}
 </h2>
    <div id="interest">${myData.interests}</div>
    <textarea  class = "ocultEditProfile" id="interestsProfile" maxlength="200">${myData.interests}</textarea>
    
    <textarea class = "ocultEditProfile" id="interestsProfile" maxlength="200">${myData.interests}</textarea>
    
    
    <button class = "button is-rounded btnIcon ocultEditProfile" id="saveProfile" >Guardar</button>
    <button class = "button is-rounded btnIcon ocultEditProfile" id="cancelEdit">Cancelar</button>
    <div class="modal" id="saveChange">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">
            <button class="modal-close is-large" aria-label="close"  id="btnCloseChange"></button>
            <a href = "#" id="dataComplete" class = "imagePop"><i class="far fa-grin"></i></i></a>
            <p>Se han guardado tus cambios </p>
        </div>
    </div>
</div>
`
    navBar.style.display = 'block'
    return profile
  }

} */


function edit() {
  //Listeners modal
  const btnCloseChange = document.querySelector('#btnCloseChange');
  btnCloseChange.addEventListener('click', closeChange);
  const saveChange = document.querySelector('#saveChange');
  function closeChange() {
    saveChange.classList.remove('is-active');
  }

  //Listeners Editar Perfil
  let btnEditProfile = document.querySelector('#editProfile')
  let btnSaveProfile = document.querySelector('#saveProfile')
  btnEditProfile.addEventListener('click', editProfile)
  btnSaveProfile.addEventListener('click', saveProfile)
  let textareaInterest = document.querySelector('#interestsProfile')
  //console.log(userObserver)


  function editProfile() {
    let file = document.querySelector('#file')
    let nameProfile = document.querySelector('#nameProfile').contentEditable = 'true'
    let emailProfile = document.querySelector('#emailProfile').contentEditable = 'true'
    let prevImage = document.querySelector('#changeImage')
    let photoProfile = document.querySelector('#photoProfile')
    readFile(file, photoProfile, prevImage)


    //console.log(text.innerHTML)
    btnSaveProfile.classList.add('active');
    textareaInterest.classList.add('active');
    file.classList.add('active')
  }

  function readFile(file, photoProfile, prevImage) {


    //const fileInput = document.querySelector("#file")
    file.onchange = (e) => {
      console.log(e);
      let file = e.target.files[0]
      console.log(file);
      firebase.storage().ref("photoUsers").child(file.name).put(file)
        .then(snap => {
          console.log(snap);
          return snap.ref.getDownloadURL()

        })
        .then(link => {
          prevImage.remove()
          let url = link
          console.log(url);
          const img = document.createElement('img')
          img.id = 'newImage'
          img.src = url
          photoProfile.appendChild(img)
        })


        .catch(err => {
          alert("Error:", err);
        })

    }
  }


  function saveProfile() {

    let divInterest = document.querySelector('#interest')
    let nameProfile = document.querySelector('#nameProfile')
    let emailProfile = document.querySelector('#emailProfile')

    //let textareaInterest = document.querySelector('#interestsProfile')
    let interestsProfile = textareaInterest.value
    divInterest.innerHTML = interestsProfile

    //console.log(nameProfile.innerHTML)
    //console.log(emailProfile.innerHTML)
    let newNameProfile = nameProfile.innerHTML
    let newEmailProfile = emailProfile.innerHTML

    btnSaveProfile.classList.remove('active');
    textareaInterest.classList.remove('active');
    file.classList.remove('active');
    if (btnSaveProfile.classList != 'active') {
      nameProfile.contentEditable = 'false'
      emailProfile.contentEditable = 'false'
    }

    //profileUpdate(newNameProfile, newEmailProfile)
    saveProfileBD(newNameProfile, newEmailProfile, interestsProfile)

  }

  function saveProfileBD(newNameProfile, newEmailProfile, interestsProfile) {
    let user = firebase.auth().currentUser;
    let imagProfile = document.querySelector('#newImage')
    let urlImage
    if (imagProfile) {
      urlImage = imagProfile.getAttribute('src')
      console.log(urlImage);
      const docRef = db.collection('datausers/').doc(user.uid);//la / y el + user.uid hace que no se duplique el usuario
      docRef.update({
        name: newNameProfile,
        email: newEmailProfile,
        interests: interestsProfile,
        photo: urlImage,
        //password: newPassword,
        uid: user.uid
      })
        .then(function () {
          saveChange.classList.add('is-active');
          console.log(saveChange);
        })
        .catch(function (error) {
          console.log('Hubo en error:', error);
        })
    } else {
      let thisPhoto = document.querySelector('#thisPhoto')
      urlImage = thisPhoto.getAttribute('src')
      console.log(urlImage);
      const docRef = db.collection('datausers/').doc(user.uid);//la / y el + user.uid hace que no se duplique el usuario
      docRef.update({
        name: newNameProfile,
        email: newEmailProfile,
        interests: interestsProfile,
        photo: urlImage,
        //password: newPassword,
        uid: user.uid
      })
        .then(function () {
          saveChange.classList.add('is-active');
          console.log('Se actualizaron datos de perfil');
        })
        .catch(function (error) {
          console.log('Hubo en error:', error);
        })

    }

    /* const docRef = db.collection('datausers/').doc(user.uid);//la / y el + user.uid hace que no se duplique el usuario
    docRef.update({
      name: newNameProfile,
      email: newEmailProfile,
      interests: interestsProfile,
      photo: urlImage,
      //password: newPassword,
      uid: user.uid
    })
      .then(function () {
        saveChange.classList.add('is-active');
        console.log(saveChange);
      })
      .catch(function (error) {
        console.log('Hubo en error:', error);
      }) */
  }


}




