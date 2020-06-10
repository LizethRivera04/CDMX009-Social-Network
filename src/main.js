// import { changeView } from './views/viewcontroler.js'
import { renderHomeView } from "./views/home.js"
import { renderPostView } from "./views/post.js"
//import { showPosts } from "./views/home.js"
import { userObserverProfile } from "./views/profile.js"
import { renderExitView } from "./views/exit.js"
import login from "./views/login.js"
import signIn from "./views/signIn.js"
import principal from "./views/principal.js"
import { loginGoogle } from '/index.js'// Se importa para usar addEventListener
import { loginFacebook } from '/index.js'
import { createUser } from '/index.js'
import { loginUser } from '/index.js'
import { signoutUser } from '/index.js'


// Nodos
export const root = document.querySelector('#root');
export const showP = document.querySelector('#showP')
export const navBar = document.querySelector('#navBar');
const homeButton = document.querySelector('#home');
const postButton = document.querySelector('#post');
const profileButton = document.querySelector('#profile');
const exitButton = document.querySelector('#exit');

homeButton.addEventListener('click', renderPostView);
//homeButton.addEventListener('click', showPosts);
postButton.addEventListener('click', renderHomeView);
profileButton.addEventListener('click', userObserverProfile);
exitButton.addEventListener('click', signoutUser);


// Función de inicio que cambia la URL
/* const init = () => {
    window.addEventListener('hashchange', () => changeView(window.location.hash))
}
window.addEventListener('load', init);
 */
// Boton para cerrar sesión
/* const btnExit = document.querySelector('#goOut')
btnExit.addEventListener('click', signoutUser)
 */
// Al cargar la pag mostrar vista (una antes de iniciar sesión)
window.onload = principalView();

export function principalView() {
    root.innerHTML = principal();
    let goLogin = document.querySelector('#goLogin')
    goLogin.addEventListener('click', viewLogin)
}

// Mostrar vista iniciar sesión
export function viewLogin() {
    root.innerHTML = login()
    let goSignIn = document.querySelector('#goSignIn');

    // Listeners modales
    const btnCloseError = document.querySelector('#btnCloseError');
    btnCloseError.addEventListener('click', closeError);
    const errorGooFbkModal = document.querySelector('#noAccountGooFbk');
    const btnCloseGoogleError = document.querySelector('#btnCloseNoGooFbk');
    btnCloseGoogleError.addEventListener('click', closeGooFbkError)

    // Ingresar
    let btnEnter = document.querySelector('#enter');
    btnEnter.addEventListener('click', function (e) {
        e.preventDefault();
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        const errorModal = document.querySelector('#errorModal');
        /* console.log(email);
        console.log(password); */
        loginUser(email, password, errorModal);
    })
    // Ocultar Modaless
    function closeError() {
        errorModal.classList.remove('is-active');
    }
    function closeGooFbkError() {
        errorGooFbkModal.classList.remove('is-active');
    }
    viewSign(goSignIn)
    loginGoogle(errorGooFbkModal)
    loginFacebook(errorGooFbkModal)
}

//Mostrar vista Resgistro
export function viewSign(goSignIn) {
    goSignIn.addEventListener('click', (e) => {
        e.preventDefault()
        root.innerHTML = signIn()

        //Listeners Modales
        const btnCloseError = document.querySelector('#btnCloseError');
        btnCloseError.addEventListener('click', closeError);
        const btnCloseExist = document.querySelector('#btnCloseExistAccount');
        btnCloseExist.addEventListener('click', closeErrorExist);
        let btnBack = document.querySelector('#backOne')
        const errorGooFbkModal = document.querySelector('#noAccountGooFbk');
        const btnCloseGoogleError = document.querySelector('#btnCloseNoGooFbk');
        btnCloseGoogleError.addEventListener('click', closeGooFbkError)

        //Crear cuenta
        let btnRegister = document.querySelector('#signIn')
        btnRegister.addEventListener('click', function (e) {
            e.preventDefault()

            //Leer variables del form
            const newName = document.querySelector('#newName').value
            const newEmail = document.querySelector('#newEmail').value
            const newPassword = document.querySelector('#newPassword').value
            const registryModal = document.querySelector('#registryModal');// el id lo tiene el overlay
            const alreadyExistModal = document.querySelector('#alreadyExistModal');
            /* console.log(newName);
            console.log(newEmail);
            console.log(newPassword); */
            createUser(newName, newEmail, newPassword, registryModal, alreadyExistModal)


        })
        //Ocultar Modales
        function closeError() {
            registryModal.classList.remove('is-active');
        }
        function closeErrorExist() {
            alreadyExistModal.classList.remove('is-active');
        }
        function closeGooFbkError() {
            errorGooFbkModal.classList.remove('is-active');
        }
        arrowBack(btnBack)
        loginGoogle(errorGooFbkModal)
        loginFacebook(errorGooFbkModal)
    })

}

//Regresar a inicio de sesión
function arrowBack(btnBack) {
    btnBack.addEventListener('click', (e) => {
        e.preventDefault()
        root.innerHTML = login()
        viewLogin()
    })
}


