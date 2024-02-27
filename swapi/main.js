
const resources = [
    // {name: "films", htmlButton: null},
    { name: "people", model: ["name", "birth_year", "films"] },
    { name: "planets", model: ["name", "climate", "films"] },
    { name: "species", model: ["name", "classification", "films"] },
    { name: "starships", model: ["name", "model", "films"] },
    { name: "vehicles", model: ["name", "manufacturer", "films"] },
]

async function main() {
    const buttonContainer = document.querySelector('#button-container')
    const cardContainer = document.querySelector('#card-container')
    for (const resource of resources) {
        const button = document.createElement('button')
        button.classList.add('btn', 'btn-primary')
        button.textContent = resource.name

        resource.htmlButton = button


        button.addEventListener('click', async (event) => {
            resources.forEach(el => el.htmlButton.classList.remove('active'))
            event.target.classList.add('active')

            const results = await getResources(resource.name)

            cardContainer.innerHTML = ''
            for (const r of results) {
                const card = await getResourceCard(r, resource.model)
                cardContainer.append(card)
            }
        })

        buttonContainer.append(button)
    }
}

main()


async function getResources(resource) {
    const response = await fetch(`https://swapi.dev/api/${resource}`)
    const data = await response.json()
    return data.results
}

async function getFilm(filmUrl) {
    res = await fetch(filmUrl)
    const film = await res.json()
    return {
        title: film.title,
        episode: film.episode_id,
        releaseDate: film.release_date,
    }
}

async function getResourceCard(data, model) {
    const newEl = document.createElement('div')
    newEl.classList.add('col-6', 'p-3')
    newEl.innerHTML = `
<div class="card">
    <h5 class="card-header"></h5>
    <div class="card-body">
        <h5 class="card-title"></h5>
        <div>
            <button class="btn btn-primary"></button>
        </div>
    </div>
</div>
`
    const h5s = newEl.querySelectorAll('h5')
    h5s[0].textContent = data.name
    h5s[1].textContent = data[model[1]]

    const filmsButton = newEl.querySelector('button')
    filmsButton.textContent = `Films list`
    filmsButton.addEventListener('click', async (event) => {
        // Qui uso Promise.all per ottimizzare la performance delle chiamate ai vari film
        const films = await Promise.all(data.films.map(filmUrl => getFilm(filmUrl)))

        const parent = event.target.parentElement
        parent.innerHTML = ''

        const filmList = document.createElement('ul')
        filmList.classList.add('list-group')
        filmList.style = 'height: 38px; overflow-y: scroll;'
        films.forEach(f => {
            const filmEl = document.createElement('li')
            filmEl.classList.add('list-item-group')
            filmEl.textContent = `Episode ${f.episode} - ${f.title}`
            filmList.append(filmEl)
        })
        parent.append(filmList)
    })

    return newEl
}
