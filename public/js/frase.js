$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);


function fraseAleatoria() {
	$("#spinner").toggle(); //mostrando o spinner

    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle(); //ao falhar mostra a mensagem de erro
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){ //escondendo o spinner
        $("#spinner").toggle();
    });
}

//Selecionar uma frase aleatória do Array

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    //utilizar número aleatório como índice para acessar o array e modificar a frase pela propriedade texto

    frase.text(data[numeroAleatorio].texto);

    // Atualizar o tempo de digitação de acordo com o tamanhoa da frase

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);

}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();

    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId}; 

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
    },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {

    console.log(data);

    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

