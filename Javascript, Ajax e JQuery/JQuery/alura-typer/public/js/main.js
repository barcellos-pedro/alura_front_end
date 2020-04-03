var tempoInicial = $("#tempo-digitacao").text() // essa variavel não será alterada no cronometro
var campo = $(".campo-digitacao");

$(() => { // Igual a $(document).ready(), roda quando a página for carregada completamente
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTempoInicial(tempo){
    tempoInicial = tempo; // Seta o tempo de acordo com a nova frase ao reiniciar o jogo.
    $("#tempo-digitacao").text(tempo);
}

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
    campo.one("focus", () => { // focus considera o foco mesmo com dando tab no teclado // .one funciona somente uma vez
        var tempoRestante = $("#tempo-digitacao").text(); // Pega o tempo da frase ao estar em foco o campo 
        var cronometroId = setInterval(() => {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
};

function finalizaJogo() {
    campo.attr("disabled", true); // adiciona um novo atributo no textarea, e como o 'disabled' não possui valor precisamos setar se é true ou false
    campo.toggleClass("campo-desativado"); // ao invés de usar campo.addClass()
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", () => {
        var frase = $(".frase").text(); // Pega o conteúdo ao começar digitar
        var digitado = campo.val();
        var digitouCorreto = frase.startsWith(digitado); // função do ECMA Script 6, que retorna true ou false
        if (digitouCorreto) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
        /*var comparavel = frase.substr(0, digitado.length); // Comparação feita com substr()
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }
        else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }*/
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
    campo.toggleClass("campo-desativado"); // ao invés de usar campo.removeClass()
    inicializaCronometro(); // chama a função novamente por conta do evento 'one'
};