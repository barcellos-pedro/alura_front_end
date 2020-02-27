var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function () {
    console.log("Buscando pacientes...");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); // realiza um GET no link informado

    xhr.addEventListener("load", function () { // escuta a requisição que foi feita e enviada
        var erroAjax = document.querySelector("#erro-ajax");

        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText; // guarda o retorno do JSON em uma variável
            var pacientes = JSON.parse(resposta); // converte -faz o parse- JSON para objeto em JS

            pacientes.forEach(function (paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        }else{
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }


    });

    xhr.send(); // envia e requisição feita no xhr.open
});
