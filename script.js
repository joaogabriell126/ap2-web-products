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

botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {

        const categoriaSelecionada = botao.dataset.category;

        renderizarProdutos(categoriaSelecionada);
    });
});

function renderizarProdutos(categoriaSelecionada) {
    const itensFiltrados = todosOsProdutos.filter(todosOsProdutos => todosOsProdutos.category == categoriaSelecionada)

    const cardsProdutos = itensFiltrados.map(item => {
        return `
      <div class="card-produto">
        <img src="${item.thumbnail}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p>Categoria: ${item.category}</p>
      </div>
    `}).join('')

    containerProdutos.innerHTML = cardsProdutos
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
