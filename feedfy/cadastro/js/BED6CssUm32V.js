window.onload = function() {
    const logo = document.getElementById('logo');
    const content = document.getElementById('content');
    const circleOverlay = document.getElementById('circle-overlay');

    // Aplica a animação de aparecer com efeito
    setTimeout(() => {
        logo.classList.add('show-logo');
    }, 100);

    // Após a logo desaparecer, ativa o efeito de círculo que encolhe
    setTimeout(() => {
        circleOverlay.classList.add('shrink-circle');
    }, 1000);

    // Após o círculo encolher, revela o conteúdo da página
    setTimeout(() => {
        circleOverlay.style.display = 'none';
        // Adiciona a classe para animar o conteúdo
        content.classList.add('show-content');
    }, 2000);
};

document.getElementById('continue-button').addEventListener('click', function() {
    const nameInput = document.getElementById('name-input').value;

    if (nameInput.trim() !== '') {
        // Extrai o primeiro nome
        const firstName = nameInput.split(' ')[0];

        // Captura a URL da página de destino
        const url = this.getAttribute('data-url');

        // Redireciona para a nova página com o primeiro nome na URL
        window.location.href = `${url}?name=${encodeURIComponent(firstName)}`;
    } else {
        // Exibe uma mensagem de alerta se o campo estiver vazio
        alert('Por favor, preencha seu nome antes de continuar.');
    }
});

// Desativar clique com o botão direito e exibir aviso
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert('O conteúdo desta página é protegido.');
        });

        // Desativar a tecla F12 e exibir aviso
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
                e.preventDefault();
                alert('O conteúdo desta página é protegido.');
            }
        });