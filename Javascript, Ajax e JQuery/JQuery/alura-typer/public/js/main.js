var tempoInicial = $("#tempo-digitacao").text() // essa variavel não será alterada no cronometro
var campo = $(".campo-digitacao");

$(() => { // Igual a $(document).ready(), roda quando a página for carregada completamente
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
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
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", () => { // focus considera o foco mesmo com dando tab no teclado // .one funciona somente uma vez
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
    var frase = $(".frase").text();
    campo.on("input", () => {
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

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody"); // vai na section e depois procura a tbody dentro dela
    var usuario = "Pedro";
    var numPalavras = $("#contador-palavras").text();
    // Não é possível atrelar evento de remover para string com elementos HTML, por isso é necessário CRIAR UM ELEMENTO HTML com o jQuery (função novaLinha())
    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha); // prepend adiciona como elemento filho no início da tabela(inverso do append)
}

function novaLinha(usuario, palavras){
    var linha = $("<tr>"); // Criando elemento HTML de fato com jQuery, ao invés de criar em uma STRING ao estilo innerHTML
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){ // passa o event para em seguida previnir a ação padrão (linha seguinte) do href de subir para o topo da página
    event.preventDefault();
    // Envolvemos o this no seletor $() para ele poder ter os poderes do jQuery
    $(this).parent().parent().remove(); // this não funcionou com arrow function // parent 2x para poder subir para a TR, a<td<tr
};

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