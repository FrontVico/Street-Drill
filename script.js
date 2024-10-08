function addToCart(name, price, imgFrente) {
    // Recupera o carrinho do localStorage ou inicializa um novo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o novo item ao carrinho
    cart.push({ name, price, imgFrente });

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe uma mensagem
    Swal.fire("Produto adicionado ao carrinho!");
}

    // Inicializa o Parse SDK com suas credenciais
    Parse.initialize("OEwZoFZ1YRhiEAKSM3o08SPWscNrLt6kTiWhjWWM", "fplCVBTYJw9iQrfUdB1b7vlkFPdG9OgZFCLhpvz7");
    Parse.serverURL = 'https://parseapi.back4app.com/';

    let cart = [];

    async function fetchAndRenderProducts() {
        const Camisetas = Parse.Object.extend("Camisetas");
        const query = new Parse.Query(Camisetas);
    
        try {
            document.getElementById('loading').style.display = 'flex';
            const results = await query.find();
            const productContainer = document.querySelector('#menu main');
            productContainer.innerHTML = ''; 
    
            if (results.length === 0) {
                productContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
            } else {
                results.forEach((produto, index) => {
                    const nome = produto.get("nome");
                    const preco = produto.get("preco");
                    const fotoFrenteFile = produto.get("fotoFrente");
                    const fotoCostaFile = produto.get("fotoCosta");
    
                    if (!nome || !preco || !fotoFrenteFile || !fotoCostaFile) {
                        console.error('Produto incompleto:', produto);
                        return;
                    }
    
                    const fotoFrenteUrl = fotoFrenteFile instanceof Parse.File ? fotoFrenteFile.url() : fotoFrenteFile;
                    const fotoCostaUrl = fotoCostaFile instanceof Parse.File ? fotoCostaFile.url() : fotoCostaFile;
    
                    // Cria um ID exclusivo para cada carrossel com base no índice do produto
                    const carouselId = `carousel-${index}`;
    
                    const productHtml = `
                    <div class="flex gap-2 p-4 rounded-lg ml-4 product-card">
                        <div class="image-container" id="${carouselId}">
                            <img class="product-image front" src="${fotoFrenteUrl}" alt="${nome}">
                            <img class="product-image back" src="${fotoCostaUrl}" alt="${nome}" style="display: none;">
                        </div>
                        <div class="ml-3">
                            <p class="font-bold md:text-3xl text-xl">${nome}</p>
                            <p class="text-lg">Coleção Exclusiva</p>
                            <p class="font-bold text-lg">R$ ${preco.toFixed(2)}</p>
                            <button class="bg-gray-950 text-white px-5 rounded-lg mt-3 add-to-cart" data-name="${nome}" data-price="${preco}" data-foto="${fotoFrenteUrl}">
                                <i class="bi bi-cart-plus text-lg"></i>
                            </button>
                        </div>
                    </div>
                    `;
                    productContainer.innerHTML += productHtml;
    
                    // Lógica do carrossel individual para cada produto
                    setInterval(() => {
                        const container = document.getElementById(carouselId);
                        const front = container.querySelector('.front');
                        const back = container.querySelector('.back');
    
                        if (front.style.display === 'none') {
                            front.style.display = 'block';
                            back.style.display = 'none';
                        } else {
                            front.style.display = 'none';
                            back.style.display = 'block';
                        }
                    }, 3000);
                });
            }
    
            document.getElementById('loading').style.display = 'none';
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            document.getElementById('loading').style.display = 'none';
        }
    }
    

    // Função para adicionar produto ao carrinho
    function addToCart(name, price, fotoFrenteUrl) {
        alert("Camisa adicionada ao carrinho");
        const item = { name, price, fotoFrente: fotoFrenteUrl };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
    }

    // Evento de clique para adicionar produtos ao carrinho
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const fotoFrenteUrl = event.target.getAttribute('data-foto');
            addToCart(name, price, fotoFrenteUrl);
        }
    });

    // Chama a função quando a página carregar
    document.addEventListener('DOMContentLoaded', fetchAndRenderProducts);


