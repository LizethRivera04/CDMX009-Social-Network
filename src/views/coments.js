

function createComent() {
    let contentsComents = document.querySelectorAll('.contentComent')
    let contentComent = contentsComents[contentsComents.length - 1]
    console.log('Hola desde comentss', contentComent)
    let contentPost = document.querySelectorAll('.putComent')
    let content = contentPost[contentPost.length - 1]

    console.log();

    let inputTitle = document.querySelector(`#${doc.id}-title`)
    inputTitle.style.display = "block";

    let coment = `
    <div class="contentComent"
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
    
    `
    content.innerHTML = coment
}

export default createComent