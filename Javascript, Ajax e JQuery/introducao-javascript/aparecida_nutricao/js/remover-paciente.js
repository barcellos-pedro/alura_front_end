var pacientes = document.querySelectorAll(".paciente"); // pega todos os pacientes e retornar uma lista

var tabela = document.querySelector("#tabela-pacientes"); // pega a tbody, tabela completa

tabela.addEventListener("dblclick", function(event){
    console.log(event.target); //target é quem sofreu o evento de fato, no caso não foi o pai (tabela), e sim o filho (alguma tr = paciente)
    
    event.target.parentNode.classList.add("fadeOut");

    setTimeout(()=>{
        event.target.parentNode.remove();
    }, 500);

})

/*
pacientes.forEach(function(paciente){
    paciente.addEventListener("dblclick", function(){
        console.log("Fui clicado com um duplo click");
        this.remove(); //this = paciente - quem foi clicado - o this está indicando que a remoção será feita para o dono do evento, o paciente
    });
});
*/
