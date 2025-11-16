const headerMenu = document.getElementById("headerMenu")
const sideMenu = document.getElementById("sideMenu")

headerMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('active');

    const isActive = sideMenu.classList.contains('active');

    if (isActive) {
        headerMenu.classList.remove('fa-bars');
        headerMenu.classList.add('fa-xmark');
    } else {
        headerMenu.classList.remove('fa-xmark');
        headerMenu.classList.add('fa-bars');
    }
});

const botoesCategoria = document.querySelectorAll('.btn-category');
const containerProdutos = document.getElementById('gallery__placeholder');

let todosOsProdutos = []
if (containerProdutos) {
    botoesCategoria.forEach(botao => {
        botao.addEventListener('click', () => {

            const categoriaSelecionada = botao.dataset.category;

            renderizarProdutos(categoriaSelecionada);
        });
    });
}

function renderizarProdutos(categoriaSelecionada) {
    const itensFiltrados = todosOsProdutos.filter(todosOsProdutos => todosOsProdutos.category == categoriaSelecionada)

    const cardsProdutos = itensFiltrados.map(item => {
        return `
        <div class="card-produto">
            <div class="card-produto__imagem">
                <img src="${item.images[0]}" alt="${item.title}">
                <div class="card-produto__categoria">
                    <span>${item.category}</span>
                </div>
            </div>
            <div class="card-produto__description">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `}).join('')

    containerProdutos.innerHTML = cardsProdutos
}

const galeryRandom = document.getElementById("gallery-random")
const randomButton = document.getElementById("randomButton")

if (randomButton) {
    randomButton.addEventListener('click', () => {
        produtoAleatorio();
    })
}

function produtoAleatorio() {
    min = 1;
    max = 30;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    console.log(randomNumber)

    const randomItemFilter = todosOsProdutos.find(produtos => produtos.id == randomNumber)
    console.log(randomItemFilter)

    const cardHTML = `
        <div class="card-produto">
            <div class="card-produto__imagem">
                <img src="${randomItemFilter.images[0]}" alt="${randomItemFilter.title}">
                <div class="card-produto__categoria">
                    <span>${randomItemFilter.category}</span>
                </div>
            </div>
            <div class="card-produto__description">
                <h3>${randomItemFilter.title}</h3>
                <p>${randomItemFilter.description}</p>
            </div>
        </div>`

    galeryRandom.innerHTML = cardHTML;
}

fetch('https://dummyjson.com/products')
    .then(response => {
        if (!response.ok) throw new Error('Erro na resposta da API');
        return response.json();
    })
    .then(data => {
        todosOsProdutos = data.products;
    })
    .catch(error => {
        console.error('Erro ao encontrar algum produto. Por favor tente novamente mais tarde!', error);
    });
