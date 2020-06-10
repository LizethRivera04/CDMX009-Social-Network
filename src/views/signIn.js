import { navBar } from "../main.js";
export default () => {
    const viewSignIn = `
<div class = "form-container ">
    <form id="newAccount">
        <div class="centerItem">
            <h1 class="titles">Crea una cuenta</h1>
        </div>
        <div class = "control has-icons-left container-separate">
            <input class ="input is-rounded" type="text" placeholder="Nombre" id="newName">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
        </div>
    
        <div class = "control has-icons-left container-separate">
            <input class ="input is-rounded" type="email" placeholder="Email" id="newEmail">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
        </div>

        <div class = "control has-icons-left container-separate" >
            <input class ="input is-rounded" type="password" placeholder="Password" id="newPassword">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
        </div>
        <button class = "button is-rounded is-fullwidth container-separate is-primary" id="signIn">Registrarme</button>
        <p class ="centerItem container-separate">O accede con:</p>
        <div class = "centerItem">
            <button class = "button is-rounded btnIcon" id="goFacebook" ><span class="icon is-small"><i class="fab fa-facebook-f"></i></span></button>
            <button class = "button is-rounded btnIcon" id="goGoogle"><span class="icon is-small"><i class="fab fa-google"></i></span></button>
        </div>

    </form>
</div>
<footer class ="back">
    <span class="icon is-small is-left">
        <button class = "button is-rounded is-white" id="backOne" ><a href="#/logIn"><span class="icon is-small"><i class="fas fa-arrow-left"></i></span></a></button>
    </span>
</footer>
<div class="modal" id="registryModal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class = "containerPop">
                <button class="modal-close is-large" aria-label="close"  id="btnCloseError"></button>
                <h1 class="title">ERROR</h1>
                <a href = "#" id="error" class = "imagePop"><i class="far fa-dizzy"></i></a>
                <p>Comprueba tu correo o contraseña: debe contener al menos 6 caracteres,un número, una minúscula y una mayúscula.</p>
            </div>
        </div>
</div>

<div class="modal" id="alreadyExistModal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class = "containerPop">
                <button class="modal-close is-large" aria-label="close"  id="btnCloseExistAccount"></button>
                <h1 class="title">ERROR</h1>
                <a href = "#" id="error" class = "imagePop"><i class="far fa-dizzy"></i></a>
                <p>La cuenta ya existe</p>
            </div>
        </div>
</div>

<div class="modal" id="noAccountGooFbk">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">  
            <h1 class="title">ERROR</h1>
            <a href = "#" id="error" class = "imagePop"><i class="far fa-dizzy"></i></a>
            <p>No tienes una cuenta</p>
        </div>
            <button class="modal-close is-large" aria-label="close"  id="btnCloseNoGooFbk"></button>
    </div>
</div>

    `
    navBar.style.display = 'none'
    return viewSignIn
}