$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody"); // vai na section e depois procura a tbody dentro dela
    var usuario = "Pedro";
    var numPalavras = $("#contador-palavras").text();
    // Não é possível atrelar evento de remover para string com elementos HTML, por isso é necessário CRIAR UM ELEMENTO HTML com o jQuery (função novaLinha())
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha); // Para poder remover a linha desejada após criada
    corpoTabela.prepend(linha); // prepend adiciona como elemento filho no início da tabela(inverso do append)
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    // A função offset() nos retorna a distância em que o elemento está do topo e da esquerda da página.
    // Se acessarmos o valor do topo (top), teremos o valor exato para onde queremos scrollar a página.
    //console.log(posicaoPlacar);
    $("html, body").animate(
        {
            scrollTop: posicaoPlacar+"px" // Concatena o valor da variável com o 'px', necessário para ser um valor CSS da propiedade scrollTop
        }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>"); // Criando elemento HTML de fato com jQuery, ao invés de criar em uma STRING ao estilo innerHTML
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) { // passa o event para em seguida previnir a ação padrão (linha seguinte) do href de subir para o topo da página
    event.preventDefault();
    // Envolvemos o this no seletor $() para ele poder ter os poderes do jQuery
    //$(this).parent().parent().remove(); // this não funcionou com arrow function // parent 2x para poder subir para a TR, a<td<tr
    $(this).parent().parent().fadeOut(1000); // Oculta o elemento com efeito de animação -possui fadeToggle tbm-
    setTimeout(() => {
        $(this).parent().parent().remove();
    }, 1000);
};

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
    // Antes de executar a animação, paramos a que estiver acontecendo através da função stop do jQuery
    //Agora, ao clicarmos diversas vezes no botão do placar, a animação não será executada várias vezes, só será executada a última animação que nós chamamos!
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){ // Utilizei o function comum para poder funcionar o $(this) abaixo
      var usuario = $(this).find("td:nth-child(1)").text();
      var palavras = $(this).find("td:nth-child(2)").text();

      var score = {
        usuario: usuario,
        pontos: palavras
      };

      placar.push(score);
    });

    var dados = {placar: placar}; // Guarda a lista em um objeto para poder fazer o POST

    $.post("http://localhost:3000/placar", dados, ()=>{
      console.log("Placar sincronizado com sucesso!")
    })
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar", (data)=>{
    $(data).each(function(){ // Envolvemos o data no $() para poder utilizar o this na linha abaixo
        var linha = novaLinha(this.usuario, this.pontos);
        linha.find(".botao-remover").click(removeLinha); // Para poder remover a linha desejada após criada
        $("tbody").append(linha);
    });

  });

}
