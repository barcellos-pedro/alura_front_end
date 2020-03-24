var tempoInicial = $("#tempo-digitacao").text() // essa variavel não será alterada no cronometro
var campo = $(".campo-digitacao");

$(function(){ // Igual a $(document).ready(), roda quando a página for carregada completamente
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text(); // $ é igual jQuery, a variável irá retornar um objeto jQuery que contém nosso elemento
    var numPalavras = frase.split(" ").length; // quebra a frase sempre que houve espaços e guarda em uma variavel a quantidade de palavras a cada 'espaço'
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", () => {
        var conteudo = campo.val(); // val é abreviação de 'value', val pega conteudo das tags de 'Input'
        var qtdPalavras = conteudo.split(/\S+/).length - 1; // Expressão regular que busca qualquer tipo de espaço vazio

        var conteudoSemEspaco = conteudo.replace(/\s+/g, ''); // Expressão regular que retira os espaço da String
        var qtdCaracteres = conteudoSemEspaco.length; // Quantidade de caracteres do textearea

        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(qtdCaracteres);
    });
};

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text()
    campo.one("focus", () => { // focus considera o foco mesmo com dando tab no teclado // .one funciona somente uma vez
        var cronometroId = setInterval(() => {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if (tempoRestante < 1) {
                campo.attr("disabled", true); // adiciona um novo atributo no textarea, e como o 'disabled' não possui valor precisamos setar se é true ou false
                clearInterval(cronometroId);
            }
        }, 1000);
    });
};

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
};