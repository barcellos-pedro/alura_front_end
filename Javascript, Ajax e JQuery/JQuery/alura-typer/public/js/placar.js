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