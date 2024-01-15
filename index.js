const main = document.getElementById('principal')
const spanEp = document.getElementById('episodios')
const spanPersonagens = document.getElementById('personagens')
const spanLocais = document.getElementById('localizacoes')

let currentPage = 1
let totalPages = 1

const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')

async function fetch(page) {
    try {
        const response = await api.get(`/character?page=${page}`)
        const responseEp = await api.get('/episode') 
        const characters = response.data.results
        const episodiosPages = responseEp.data.info.pages
        console.log(episodiosPages)
        const listaEp = [];
        for (let index = 1; index <=episodiosPages; index++){
            let responseEp2 = await api.get(`/episode?page=${index}`)
            let episodios = responseEp2.data.results
            episodios.forEach(ep => {
                listaEp.push(
                    {
                        nome:ep.name,
                        url:ep.url
                    }
                )
            });
        }
        const responseFiltro=await api.get('/#filter-characters?name=morty')
        console.log(responseFiltro)
        const responseLocals = await api.get('location')
        totalPages = response.data.info.pages
        spanEp.innerHTML =`Episódios: ${listaEp.length}`
        spanPersonagens.innerHTML =`Personagens: ${response.data.info.count}`
        spanLocais.innerHTML =`Localizações: ${responseLocals.data.info.count}`
        main.innerHTML =""
        let contador = 1
        characters.forEach(c => {
            console.log(c.name)
            console.log(c.status)
            console.log(c.location.name)
            console.log(c.episode[c.episode.length-1])
            if(c.status==="Alive"){
                main.innerHTML += `<div class="card">
            <div class="card-img">
                <img class="pic" src="${c.image}" alt="Imagem 1">
            </div>
            <div class="card-info">
                <h2>${c.name}</h2>
                <ul class="circle-list green">
                    <li>${c.status}</li>
                </ul>
                <h3>Ultima Localização conhecida:</h3>
                <p>${c.location.name}</p>
                <h3>Visto ulktima vez em:</h3>
                <p>${c.episode[c.episode.length-1]}</p>
            </div>
        </div>`
            }else if(c.status==="Dead"){
                main.innerHTML += `<div class="card">
                <div class="card-img">
                    <img class="pic" src="${c.image}" alt="Imagem 1">
                </div>
                <div class="card-info">
                    <h2>${c.name}</h2>
                    <ul class="circle-list red">
                        <li>${c.status}</li>
                    </ul>
                    <h3>Ultima Localização conhecida:</h3>
                    <p>${c.location.name}</p>
                    <h3>Visto ulktima vez em:</h3>
                    <p>${c.episode[c.episode.length-1]}</p>
                </div>
            </div>` 
            }else{
                main.innerHTML += `<div class="card">
                <div class="card-img">
                    <img class="pic" src="${c.image}" alt="Imagem 1">
                </div>
                <div class="card-info">
                    <h2>${c.name}</h2>
                    <ul class="circle-list">
                        <li>${c.status}</li>
                    </ul>
                    <h3>Ultima Localização conhecida:</h3>
                    <p>${c.location.name}</p>
                    <h3>Visto ulktima vez em:</h3>
                    <p>${c.episode[c.episode.length-1]}</p>
                </div>
            </div>`
            }

            if(contador%2===0&&contador<characters.length){
                main.innerHTML+=`<div class="linha"></div>`
            }
            contador++
            
        });
        

    }catch (error) {
        console.log('Erro ao buscar mensagens', error)
        }
}
fetch(currentPage)

prevPage.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
    if (currentPage > 1) {
      currentPage--
      fetch(currentPage)
    }
  })
  
  nextPage.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
    if (currentPage < totalPages) {
      currentPage++;
      fetch(currentPage)
    }
  })
  