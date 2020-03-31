$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)

}

function trocaFraseAleatoria(data) {    // Passa o argumento 'data' que guarda/retorna o conteúdo da requisição com vários objetos
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length); // Gera um número inteiro aleatório entre o total de objetos no banco
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}