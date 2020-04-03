$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(()=>{
      $('#erro').show();
      setTimeout(()=>{$('#erro').toggle()},2000)
    })
    .always(()=>{
      $("#spinner").toggle();  // Independente da requisição ser feita com sucesso (.get) ou falhar (.fail) o .always sempre será executado
    })
}

function trocaFraseAleatoria(data) {    // Passa o argumento 'data' que guarda/retorna o conteúdo da requisição com vários objetos
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length); // Gera um número inteiro aleatório entre o total de objetos no banco
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}
