var frase = $(".frase").text(); // $ é igual jQuery, a variável irá retornar um objeto jQuery que contém nosso elemento
var numPalavras = frase.split(" ").length; // quebra a frase sempre que houve espaços e guarda em um Array '[]' a quantidade de palavras a cada 'espaço'
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input", ()=>{
    var conteudo = campo.val(); // val é abreviação de 'value', val pega conteudo das tags de 'Input'
    var qtdPalavras = conteudo.split(/\S+/).length-1; // Expressão regular que busca qualquer tipo de espaço vazio
    var conteudoSemEspaco = conteudo.replace(/\s+/g,''); // Retira os espaço da String 
    var qtdCaracteres = conteudoSemEspaco.length; // Quantidade de caracteres do textearea
    
    $("#contador-palavras").text(qtdPalavras);
    $("#contador-caracteres").text(qtdCaracteres);
    
});

var tempoRestante = $("#tempo-digitacao").text()
campo.one("focus",()=>{ // focus considera o foco mesmo com dando tab no teclado // .one funciona somente uma vez
    var cronometroId = setInterval(()=>{
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);

        if(tempoRestante<1){
            campo.attr("disabled", true);
            clearInterval(cronometroId);
        }
    },1000);
});