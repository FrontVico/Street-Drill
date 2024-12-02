document.addEventListener('DOMContentLoaded', () => {
    // Renderizar informações do usuário
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Você não está logado. Redirecionando para a página de login.');
        window.location.href = '../pages/login.html';
        return;
    }

    document.getElementById('nome-usuario').textContent = currentUser.nome;
    document.getElementById('email-usuario').textContent = currentUser.email;

    const comprasRecentes = JSON.parse(localStorage.getItem('comprasRecentes')) || [];
    const recentPurchasesList = document.getElementById('recent-purchases-list');

    if (comprasRecentes.length === 0) {
        recentPurchasesList.innerHTML = '<p>Nenhuma compra recente encontrada.</p>';
        return;
    }

    comprasRecentes.forEach((compra) => {
        compra.itens.forEach((item) => {
            const productCard = document.createElement('div');
            productCard.classList.add('flex', 'gap-2', 'p-4', 'rounded-lg', 'ml-4', 'product-card');

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const imgFront = document.createElement('img');
            imgFront.classList.add('product-image', 'front');
            imgFront.src = item.fotoFrente;
            imgFront.alt = item.name;

            const imgBack = document.createElement('img');
            imgBack.classList.add('product-image', 'back');
            imgBack.src = item.fotoCosta;
            imgBack.alt = item.name;
            imgBack.style.display = 'none';

            imageContainer.appendChild(imgFront);
            imageContainer.appendChild(imgBack);

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('ml-3');

            const productName = document.createElement('p');
            productName.classList.add('font-bold', 'md:text-3xl', 'text-xl');
            productName.textContent = item.name;

            const collectionText = document.createElement('p');
            collectionText.classList.add('text-lg');
            collectionText.textContent = 'Coleção Exclusiva';

            const productPrice = document.createElement('p');
            productPrice.classList.add('font-bold', 'text-lg');
            productPrice.textContent = `R$ ${item.price.toFixed(2)}`;

            detailsContainer.appendChild(productName);
            detailsContainer.appendChild(collectionText);
            detailsContainer.appendChild(productPrice);

            productCard.appendChild(imageContainer);
            productCard.appendChild(detailsContainer);

            recentPurchasesList.appendChild(productCard);
        });
    });
    
    function logoutUser() {
        Parse.User.logOut().then(() => {
            localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
            window.location.href = '../cadastro/login.html'; // Redireciona para a página de login
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
        });
    }
    
});
