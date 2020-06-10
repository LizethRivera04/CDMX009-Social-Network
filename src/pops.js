const areYouSure = `
<div class="modal is-active" id="areYouSureModal">
    <div class="modal-background"></div>
    <div class="modal-content>
        <div class = "containerPop">
            <button class="modal-close is-large" aria-label="close"  id="btn-cerrar-error"></button>
            <a href = "#" id="youSure" class = "imagePop"><i class="far fa-frown-open"></i></a>
            <p>Estás seguro que quieres eliminar el elemento?</p>
            <button type="button" id="acceptDelete" class = "acceptDelete"><i class="fas fa-check"></i></button>
             <button type="button" id="cancelDelete" class = "cancelDelete"><i class="fas fa-times"></i></button>
        </div>
    </div>
</div>

`


const saveChange = `
<div class="modal is-active" id="saveChange">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class = "containerPop">
            <button class="modal-close is-large" aria-label="close"  id="btn-cerrar-error"></button>
            <a href = "#" id="dataComplete" class = "imagePop"><i class="far fa-grin"></i></i></a>
            <p>Se han guardado tus cambios </p>
        </div>
    </div>
</div>

`
const divRoot = document.querySelector('#root')
divRoot.innerHTML = saveChange

// Are you sure that you want to delete the element?
/* const overDelete = document.createElement('div');
overDelete.className = 'overSmall';
overDelete.id = 'overDelete';
overDelete.innerHTML = `
    <div class = "popSmall">
        <div class = "containerPop">
            <div class = "closeButton">
                <a href = "#" id="btn-cerrar-delete" class = "btn-cerrar-popup"><i class = "far fa-times-circle"></i></a>
            </div>
            <div class = "textSmall">
                <a href = "#" id="youSure" class = "imagePop"><i class="far fa-frown-open"></i></a>
                <p>Estás seguro que quieres eliminar el elemento?</p>

                <a href = "#" id="acceptDelete" class = "acceptDelete"><i class="fas fa-check"></i></a>
                <a href = "#" id="cancelDelete" class = "cancelDelete"><i class="fas fa-times"></i></a>
            </div>

        </div>
    </div>
`
document.body.appendChild(overDelete);

// Open PopUpDelete
const btnPop = document.querySelector('#pop')
const overlayDelete = document.querySelector('#overDelete');// el id lo tiene el overlay
const popup = document.querySelector('.popSmall');
const btnClosePopup = document.querySelector('#btn-cerrar-delete');
btnPop.addEventListener('click', abrirPopup);
btnClosePopup.addEventListener('click', cerrarPopup);

function abrirPopup() {
    overlayDelete.classList.add('active');
    popup.classList.add('active');
}
function cerrarPopup() {
    overlayDelete.classList.remove('active');
    popup.classList.remove('active');
}

//Task Completed

const overComplete = document.createElement('div');
overComplete.className = 'overSmall';
overComplete.id = 'overComplete';
overComplete.innerHTML = `
    <div class = "popSmall">
        <div class = "containerPop">
            <div class = "closeButton">
                <a href = "#" id="btn-cerrar-complete" class = "btn-cerrar-popup"><i class = "far fa-times-circle"></i></a>
            </div>
            <div class = "textSmall">
                <a href = "#" id="dataComplete" class = "imagePop"><i class="fas fa-crow"></i></a>
                <p>Se han guardado tus cambios </p>
            </div>

        </div>
    </div>
`
document.body.appendChild(overComplete);

// Open PopUp Task Complete
const btnComplete = document.querySelector('#taskCompleted')
const overComp = document.querySelector('#overComplete');// el id lo tiene el overlay
const popuptask = document.querySelector('.popSmall');
const btnCloseTask = document.querySelector('#btn-cerrar-complete');
btnComplete.addEventListener('click', openComplete);
btnCloseTask.addEventListener('click', closeComplete);

function openComplete() {
    overComp.classList.add('active');
    popuptask.classList.add('active');
}
function closeComplete() {
    overComp.classList.remove('active');
    popuptask.classList.remove('active');
}

//Show Error

const overError = document.createElement('div');
overError.className = 'overSmall';
overError.id = 'overError';
overError.innerHTML = `
    <div class = "popSmall">
        <div class = "containerPop">
            <div class = "textSmall">
                <h1>ERROR</h1>
                <a href = "#" id="error" class = "imagePop"><i class="far fa-dizzy"></i></a>
                <p>Intenta de nuevo, alguno de tus datos no coincide</p>
            </div>
            <div class = "closeButton">
                <a href = "#" id="btn-cerrar-error" class = "btn-cerrar-popup"><i class="fas fa-check"></i></a>
            </div>

        </div>
    </div>
`
document.body.appendChild(overError);

// Open PopUp error
const btnError = document.querySelector('#showError')
const overErr = document.querySelector('#overError');// el id lo tiene el overlay
const popupError = document.querySelector('.popSmall');
const btnCloseError = document.querySelector('#btn-cerrar-error');
btnError.addEventListener('click', openError);
btnCloseError.addEventListener('click', closeError);

function openError() {
    overErr.classList.add('active');
    popupError.classList.add('active');
}
function closeError() {
    overErr.classList.remove('active');
    popupError.classList.remove('active');
}
 */

/* const profileCard = document.createElement('div');
profileCard.className = 'profileCard';
profileCard.innerHTML = `
    <div class = "containerPop">
    <div class = "closeButton">
    <a href = "#" id="btn-cerrar-popup" class = "btn-cerrar-popup"><i class = "far fa-times-circle"></i></a></div>
    <p>Estás seguro que quieres eliminar el elemento?</p>

    </div>


`
profileContainer.appendChild(profileCard); */

/* const closeButton = document.createElement('div');
closeButton.className = 'closeButton';
profileCard.appendChild(closeButton); */

/* const close = document.createElement('a');
close.className = 'btn-cerrar-popup';
closeButton.appendChild(close);
const icon = document.createElement('i');
icon.className = 'far fa-times-circle';
close.appendChild(icon); */