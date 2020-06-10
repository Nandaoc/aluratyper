$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody"); //Busca filho de placar - tbody - para inseir a pontuação nele
    var usuario = $("#usuarios").val(); //Linha com o nome do usuário
    var numPalavras = $("#contador-palavras").text(); //Linha com o número de palavras

    var linha = novaLinha(usuario, numPalavras); //armazena o conteúdo criado pela função novaLinha
    linha.find(".botao-remover").click(removeLinha); //atrela função de click e remoção da linha ao ícone

    corpoTabela.append(linha); //Adiciona a nova linha ao final da tabela de acorcom com a função novaLinha

    $(".placar").slideDown(500); 
    scrollPlacar(); //Para inseir o placar quando o jogo acabar
}

function novaLinha(usuario, palavras) {
    //Criando elementos HTML para construir a tabela 

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    //Contruindo o link com botão

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    //Adicionando os elementos HTML dentro da linha

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault(); //previne o evento padrão de voltar para o topo da tela quando o botão é clicado
    $(this).parent().parent().remove(); //sube ao pai do pai do item para remover linha
    linha.fadeOut(); //colcoa animação na linha
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

$("#botao-placar").click(mostraPlacar);

function mostraPlacar() {
    $(".placar").slideToggle(600); 
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

//Sincronizando o placar com o servidor

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr"); //Pega filho direto de tbody

    //Laço: para cada iteração seleciona o nome e nº de palavras para criar um objeto

    linhas.each(function(){

        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        //Objeto js

        var score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score); //guardando o score no array

    });

    //enviando requisição AJAX: envio de dados através de um HTTP POST:

    var dados = {
            placar: placar
        };

        $.post("http://localhost:3000/placar", dados, function(){
            console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open"); 
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
    }).always(function(){ 
        setTimeout(function() {
        $(".tooltip").tooltipster("close"); 
        },  1200);
    });
}

//Placar será carregado ao abrir a página principal

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}



