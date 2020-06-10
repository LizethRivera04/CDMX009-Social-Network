/* import { root } from "/main.js";
import { viewLogin } from '/main.js'
import { viewSign } from '/main.js'
import { renderHomeView } from "./views/home.js" */
import { renderPostView } from "./views/post.js"
//import { renderProfileView } from "./views/profile.js"
//import { renderLoginView } from "./views/login.js"
/* import { renderExitView } from "./views/exit.js"
import { userObserverProfile } from "./views/profile.js" */
import { principalView } from "../main.js";

/* export const components = {
    home: renderHomeView,
    post: renderPostView,
    profile: renderProfileView,
    exit: renderExitView
}; */


//Instanciar Firestore
const db = firebase.firestore();

//login, instancia del provedor del servicio
const provider = new firebase.auth.GoogleAuthProvider();
const providerf = new firebase.auth.FacebookAuthProvider();

//Autenticar con Google
export function loginGoogle(errorGooFbkModal) {
    //console.log(viewLogin);
    let btngoGoogle = document.querySelector('#goGoogle')
    btngoGoogle.addEventListener('click', (e) => {
        e.preventDefault()
        firebase.auth()//Se llama a la func autenticar
            .signInWithPopup(provider)//Se va a usar una popUp y se va a loguear con la var provider que es google
            .then(function (result) {//lo que se hace cuando el usuario ya inicio sension y ya dio permisos, nos dio su info
                console.log(result.user);//trae info de usuario(correo, nombre, foto, etc)
                saveDataG(result.user)//Se le manda a la func guardDatos para hacer uns BD
                renderPostView();
                //userObserverProfile()


            })
            .catch(function (error) {
                errorGooFbkModal.classList.add('is-active');
                console.log('error:', error);
            })
    });
}

//Guardar datos gmail en BD
function saveDataG(user) {
    //console.log(user);
    const docRef = db.collection('datausers/').doc(user.uid)
    docRef.get().then(userBD => {
        if (userBD.exists === true) {
            console.log(userBD);
            console.log('ya existe');

        } else {
            console.log('no existe');
            console.log(userBD);
            docRef.set({
                uid: user.uid,//Servirá para eliminar
                name: user.displayName,//Se obtiene el nom
                email: user.email,
                photo: user.photoURL,
                //interests: 'uhuggy'
            })
                .then(function () {
                    console.log('Los datos se guardaron');
                })
                .catch(function (error) {
                    console.log('Hubo en error:', error);
                })

        }
    })
    /*     const docRef = db.collection('datausers/').doc(user.uid);//la / y el + user.uid hace que no se duplique el usuario */

    updateData(docRef)
}

//Leer los datos de la BD
function updateData(docRef) {
    docRef.get().then(function (snapshot) {
        let myData = snapshot.data();
        console.log(myData);
        /*  div.innerHTML = `Hola ${myData.nombre}` */
    })
}


//Autenticar con facebook
export function loginFacebook(errorGooFbkModal) {
    let btngoFacebook = document.querySelector('#goFacebook');
    btngoFacebook.addEventListener('click', function (e) {
        e.preventDefault()
        firebase.auth()//Se llama a la func autenticar
            .signInWithPopup(providerf)//Se va a usar una popUp y se va a loguear con la var provider que es google
            .then(function (result) {//lo que se hace cuando el usuario ya inicio sension y ya dio permisos, nos dio su info
                console.log(result.user);//trae info de usuario(correo, nombre, foto, etc)
                console.log(result.credential);
                saveDataF(result.user)//Se le manda a la func guardDatos para hacer una BD
                //userObserverProfile()
                renderPostView();

                //div.innerHTML = `<img src="${result.user.photoURL}"/>`

            })
            .catch(function (error) {
                errorGooFbkModal.classList.add('is-active');
                console.log('Hubo en error:', error);
            })
    });
}

//Guardar datos Fb en BD
function saveDataF(user) {
    //console.log(user);
    const docRef = db.collection('datausers/').doc(user.uid)
    docRef.get().then(userBD => {
        if (userBD.exists === true) {
            console.log(userBD);
            console.log('ya existe');

        } else {
            console.log('no existe');
            console.log(userBD);
            docRef.set({
                uid: user.uid,//Servirá para eliminar
                name: user.displayName,//Se obtiene el nom
                email: user.email,
                photo: user.photoURL,
                interests: 'Interes'
            })
                .then(function () {
                    console.log('Los datos se guardaron');
                })
                .catch(function (error) {
                    console.log('Hubo en error:', error);
                })

        }
    })
    updateDataFb(docRef)
}

//Leer los datos de la BD
function updateDataFb(docRef) {
    docRef.get().then(function (snapshot) {
        let myData = snapshot.data();
        console.log(myData);
        /* div.innerHTML = `Hola <img src='${myData.foto}'> ${myData.nombre} ` */
    })
}


//Crear cuenta con email
//Registrarse:
export function createUser(newName, newEmail, newPassword, registryModal, alreadyExistModal) {
    //console.log(user);
    console.log(newName + newEmail + newPassword);
    //const expRegName = /^[a-z0-9_-]{3,16}$/
    const expRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const expRegPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    if (expRegPass.test(newPassword) === true && expRegEmail.test(newEmail) === true) {
        firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)

            .then(function (user) {
                console.log('Se ha creado la cuenta!');
                console.log(user.user);
                saveEmailBD(newName, newEmail, newPassword, user)
                renderPostView();
            })
            .catch(function (error) {//Si la cuenta se ha creado se muestra el error
                alreadyExistModal.classList.add('is-active');
                console.log(error.message);
            })
    } else {
        registryModal.classList.add('is-active');
        //alert('Comprueba tu correo o contraseña (debe contener al menos 6 caracteres,un número, una minúscula y al menos una mayúscula).')
    }
}

//:Guardar los datos en BD
function saveEmailBD(newName, newEmail, newPassword, user) {
    const docRef = db.collection('datausers/').doc(user.user.uid);//la / y el + user.uid hace que no se duplique el usuario
    docRef.set({
        name: newName,
        email: newEmail,
        password: newPassword,
        interests: 'Interés',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_nu03Fphc39lFDYvqsGjluX8keorjzG79akJclhK2fS2SwLKo&usqp=CAU',
        uid: user.user.uid

    })
        .then(function () {
            console.log('Los datos se guardaron');
        })
        .catch(function (error) {
            console.log('Hubo en error:', error);
        })
}


//Inicio de Sesión:
//:Comparar los datos del usuario con los datos que usó para crear cuenta
export function loginUser(email, password, errorModal) {
    //console.log(email + password + errorModal);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log('Datos correctos, bienvenido!')
            //console.log(user);
            renderPostView()
        })
        .catch(function (error) {
            errorModal.classList.add('is-active');
            //alert('Upsi, datos incorrectos');
        })

}


//Salir de la sesión:
export function signoutUser() {
    //e.preventDefault()
    firebase.auth().signOut();
    console.log('Adiós Bye');
    /* const divRoot = document.querySelector('#root')
    divRoot.innerHTML = principal() */
    principalView()

}

//Nos dice que usuario tiene sesión abierta y nos trae sus datos de la BD
function userObserver() {
    firebase.auth().onAuthStateChanged(function (user) {
        //console.log(user);
        if (user) {
            const docRef = db.collection('datausers/').doc(user.uid);
            docRef.get().then(function (snapshot) {
                let myData = snapshot.data();
                console.log(myData)
            })
        } else {
            // No user is signed in.
            console.log('No user');
        }
    });
}
userObserver()

