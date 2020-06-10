import { navBar } from "../main.js";
export default () => {
    /* const principal = `
        <button class = "button is-rounded container-separate is-primary" id="goLogin">Iniciar</button>
    `
    navBar.style.display = 'block'
    return principal */
    const principal = `
    
    <div class="slider">
    <ul>
         <li><img src="/img/slider1.png" alt=""></li>
         <li><img src="/img/slider2.png" alt=""></li>
         <li><img src="/img/slider3.png" alt=""></li>
    </ul>
    </div>
        <div class="welcome cover">
            <div class="welcome-info">
                <h1 class="title has-text-centered has-text-warning title is-3" id='welcome-title'>Microcuentos</h1>
                <h2 class="title has-text-centered has-text-warning title is-4" id='welcome-subtitle'>ilustrados</h2>
                <p class="title has-text-centered has-text-warning title is-6" id='instructions'><em>*Escribe un microcuento*<br>*Ilustra un microcuento*<br>++Escribe e ilustra++</em></p>
                <div class="img-enter centerItem">
                    <figure>
                        <img src="/img/ojo.png" id="goLogin" alt="">
                    </figure>
                </div> 
            </div>
        </div>
    `

    navBar.style.display = 'block'
    return principal
}