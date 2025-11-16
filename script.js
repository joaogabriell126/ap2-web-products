const headerMenu = document.getElementById("headerMenu")
const sideMenu = document.getElementById("sideMenu")

// 1. Lógica para o menu hamburguer
headerMenu.addEventListener('click', () => {
    // Remove ou adiciona a classe 'active' para aparecer ou sumir com o menu
    sideMenu.classList.toggle('active');

    const isActive = sideMenu.classList.contains('active');
    // Verifica se o menu está ativo ou não trocando os ícones
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
// Váriavel que vai armazenar todos os produtos 
let todosOsProdutos = []
// Esse if, resolve um erro causado pelo script compartilhado em ambas as páginas, permitindo que não haja erros e mantendo o funcionamento padrão dos botões
if (containerProdutos) {
    // Cria um Listener para cada botão, pegando o valor da categoria e chamando a função de acordo com o seu valor
    botoesCategoria.forEach(botao => {
        botao.addEventListener('click', () => {

            const categoriaSelecionada = botao.dataset.category;

            renderizarProdutos(categoriaSelecionada);
        });
    });
}
function renderizarProdutos(categoriaSelecionada) {
    // Crie um array com todos os itens filtrados e, em seguida, são jogados um a um no HTML através do .map()
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
                <span>id: ${item.id}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `}).join('')

    containerProdutos.innerHTML = cardsProdutos
}

const galeryRandom = document.getElementById("gallery-random")
const randomButton = document.getElementById("randomButton")

// A mesma funçãode proteger o Listener
if (randomButton) {
    // Chama a função para sortear o produto
    randomButton.addEventListener('click', () => {
        produtoAleatorio();
    })
}

function produtoAleatorio() {
    // Guardo em uma váriavel uma número gerado aleatoriamente, incluindo o número mínimo e máximo 
    min = 1;
    max = 30;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    // console.log(randomNumber)

    // Procura o primeiro item que tenha o id igual ao número gerado (semelhante ao filter)
    const randomItemFilter = todosOsProdutos.find(produtos => produtos.id == randomNumber)
    // console.log(randomItemFilter)

    const cardHTML = `
        <div class="card-produto">
            <div class="card-produto__imagem">
                <img src="${randomItemFilter.images[0]}" alt="${randomItemFilter.title}">
                <div class="card-produto__categoria">
                    <span>${randomItemFilter.category}</span>
                </div>
            </div>
            <div class="card-produto__description">
                <span>id: ${randomItemFilter.id}</span>
                <h3>${randomItemFilter.title}</h3>
                <p>${randomItemFilter.description}</p>
            </div>
        </div>`
    // gera o card no HTML
    galeryRandom.innerHTML = cardHTML;
}

// Busca da API com tratamento de erro
fetch('https://dummyjson.com/products')
    .then(response => {
        if (!response.ok) throw new Error('Erro na resposta da API');
        return response.json();
    })
    .then(data => {
        // Acessa a parte de produtos e guarda na váriavel lá em cima
        todosOsProdutos = data.products;
    })
    .catch(error => {
        console.error('Erro ao encontrar algum produto. Por favor tente novamente mais tarde!', error);
    });
