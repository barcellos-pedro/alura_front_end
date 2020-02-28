var frase = $(".frase").text(); // $ é igual jQuery, a variável irá retornar um objeto jQuery que contém nosso elemento
var numPalavras = frase.split(" ").length; // quebra a frase sempre que houve espaços e guarda em um Array '[]' a quantidade de palavras a cada 'espaço'
var tamanhoFrase = $("#tamanho-frase").text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input", function(){
    var conteudo = campo.val(); // val é abreviação de 'value', val pega conteudo das tags de 'Input'
    var qtdPalavras = conteudo.split(/\S+/).length-1; // Expressão regular que busca qualquer tipo de espaço vazio
    var qtdCaracteres = conteudo.length; // quantidade de caracteres do textearea
    
    $("#contador-palavras").text(qtdPalavras);
    $("#contador-caracteres").text(qtdCaracteres);
    
});
