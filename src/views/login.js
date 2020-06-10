import { navBar } from "../main.js";
export default () => {
    const viewLogin = `
<div class = "form-container ">
    <form id="login">
        <div class="centerItem">
            <h1 class="titles">Iniciar Sesión</h1>
        </div>
        <div class = "control has-icons-left container-separate">
            <input class ="input is-rounded" type="email" placeholder="Email" id="email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
        </div>
        <div class = "control has-icons-left container-separate" >
            <input class ="input is-rounded" type="password" placeholder="Password" id="password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
        </div>
        <button class = "button is-rounded is-fullwidth container-separate is-primary "  id="enter">Entrar</button>
    
        <p class ="centerItem container-separate">O accede con:</p>

        <div class="centerItem rudyIcon">
            <span class="icon is-small centerItem"><i class="fas fa-minus"></i></span>
        </div>
        
        <div class = "centerItem">
            <button class = "button is-rounded btnIcon" id="goFacebook" ><span class="icon is-small"><i class="fab fa-facebook-f"></i></span></button>
            <button class = "button is-rounded btnIcon" id="goGoogle"><span class="icon is-small"><i class="fab fa-google"></i></span></button>
        </div>
        <div class="centerItem  registryLink">
            <p>¿Eres nuevo? <a href="#/signIn" id="goSignIn">Resgistrate</a></p>
        </div>

        
    </form>
</div>
<div class="modal" id="errorModal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">  
            <h1 class="title">ERROR</h1>
            <a href = "#" id="error" class = "imagePop"><i class="far fa-dizzy"></i></a>
            <p>Intenta de nuevo, alguno de tus datos no coincide</p>
        </div>
            <button class="modal-close is-large" aria-label="close"  id="btnCloseError"></button>
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

    `;
    navBar.style.display = 'none'
    return viewLogin

}


