// CAPTURAR OS ELEMENTOS DA DOM

//ELEMENTOS DO FORMULÁRIO
let formulario = document.querySelector("#form-cadastro");
let inputRegistro = document.querySelector("#input-registro");
let inputTitulo = document.querySelector("#input-titulo");
let inputDescricao = document.querySelector("#input-descricao");
let botaoCancelar = document.querySelector("#btn-cancelar");
let botaoAtualizar = document.querySelector("#btn-atualizar");
let botaoSalvar = document.querySelector("#btn-salvar");
let tabelarecado = document.querySelector("#tabela-registros");
//EVENTOS
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionarNovoRegistro();
});

document.addEventListener("DOMContentLoaded", pegarDadosStorage);
botaoCancelar.addEventListener("click", cancelarEdicao);

function adicionarNovoRegistro() {
  let listaderec = JSON.parse(localStorage.getItem("Meusrecados")) || [];

  let registroID = inputRegistro.value;

  let existe = listaderec.some((recado) => recado.registroID == registroID);

  if (existe) {
    alert("Já existe um recado cadastrado com esse registro ID!");
    inputRegistro.value = "";
    inputRegistro.focus();

    return;
  }

  let tituloderec = inputTitulo.value;
  let descricaorecados = inputDescricao.value;

  let recado = {
    registroID,
    tituloderec,
    descricaorecados,
  };

  listaderec.push(recado);

  console.log(listaderec);

  salvarNaTabela(recado);
  limparCampos();
  salvarNoStorage(listaderec);
}

function salvarNaTabela(dadosrecados) {
  let novaLinha = document.createElement("tr");
  let colunaRegistro = document.createElement("td");
  let colunaTitulo = document.createElement("td");
  let colunaDescricao = document.createElement("td");
  let colunaAcoes = document.createElement("td");

  novaLinha.setAttribute("class", "registros");
  novaLinha.setAttribute("id", dadosrecados.registroID);
  colunaRegistro.innerHTML = dadosrecados.registroID;
  colunaTitulo.innerHTML = dadosrecados.tituloderec;
  colunaDescricao.innerHTML = dadosrecados.descricaorecados;
  colunaAcoes.innerHTML = `
    <button class="btn-editar" onclick="prepararEdicao(${dadosrecados.registroID})">Editar</button>
        <button class="btn-apagar" onclick="apagarRegistro(${dadosrecados.registroID})">Apagar</button>
                            `;

  novaLinha.appendChild(colunaRegistro);
  novaLinha.appendChild(colunaTitulo);
  novaLinha.appendChild(colunaDescricao);
  novaLinha.appendChild(colunaAcoes);

  tabelarecado.appendChild(novaLinha);
}

function limparCampos() {
  inputRegistro.value = "";
  inputTitulo.value = "";
  inputDescricao.value = "";
}

function salvarNoStorage(listaderec) {
  //setItem('chave', 'valor')
  //tornar tudo string => JSON.stringify(valor)
  localStorage.setItem("Meusrecados", JSON.stringify(listaderec));
}

function pegarDadosStorage() {
  //getItem('chave')
  //transformar tudo de volta para array e objetos JSON.parse(valor)
  let dadosStorage = JSON.parse(localStorage.getItem("Meusrecados"));

  if (dadosStorage) {
    for (let registro of dadosStorage) {
      salvarNaTabela(registro);
    }
  }

  return;
}

function apagarRegistro(registroID) {
  let listaRegistros = JSON.parse(localStorage.getItem("Meusrecados"));
  let indiceEncontrado = listaRegistros.findIndex(
    (recado) => recado.registroID == registroID
  );
  console.log(`Encontrei na posição ${indiceEncontrado}`);

  let confirma = window.confirm(
    `Tem certeza que deseja remover o recado de registro ID ${registroID}?`
  );

  if (confirma) {
    let linhasTabela = document.querySelectorAll(".registros");

    for (let linha of linhasTabela) {
      if (linha.id == registroID) {
        console.log(linha);
        tabelarecado.removeChild(linha);
        listaRegistros.splice(indiceEncontrado, 1);
        alert("Registro removido!");
      }
    }

    salvarNoStorage(listaRegistros);
  } else {
    return;
  }
}

function cancelarEdicao() {
  limparCampos();
  botaoSalvar.setAttribute("style", "display: inline-block");
  botaoAtualizar.setAttribute("style", "display: none");
  botaoCancelar.setAttribute("style", "display: none");
  inputRegistro.removeAttribute("readonly");
  inputRegistro.removeAttribute("disabled");
}

function prepararEdicao(registroID) {
  botaoSalvar.setAttribute("style", "display: none");
  botaoAtualizar.setAttribute("style", "display: inline-block");
  botaoAtualizar.setAttribute("onclick", `atualizarRegistro(${registroID})`);
  botaoCancelar.setAttribute("style", "display: inline-block");

  /* alert(`O registro que quero editar é ${registroID}`); */
  let listaderec = JSON.parse(localStorage.getItem("Meusrecados"));
  let recEncontrado = listaderec.find(
    (recado) => recado.registroID == registroID
  );

  inputRegistro.value = recEncontradoz;
  inputTitulo.value = recEncontrado.tituloderec;
  inputDescricao.value = recEncontrado.descricaorecados;
  inputRegistro.setAttribute("readonly", "true");
  inputRegistro.setAttribute("disabled", "true");
}

function atualizarRegistro(registroID) {
  /* alert(registroID); */

  let novoRegistro = inputRegistro.value;
  let novoTitulo = inputTitulo.value;
  let novaDescricao = inputDescricao.value;

  let recaAtualizado = {
    registroID: novoRegistro,
    tituloderec: novoTitulo,
    descricaorecados: novaDescricao,
  };

  let listaderec = JSON.parse(localStorage.getItem("Meusrecados"));
  let indiceEncontrado = listaderec.findIndex(
    (recado) => recado.registroID == registroID
  );

  listaderec[indiceEncontrado] = recaAtualizado;

  let linhasTabela = document.querySelectorAll(".registros");

  for (let linha of linhasTabela) {
    if (linha.id == registroID) {
      let colunas = linha.children;
      console.log(colunas);

      //equivale ao registroID
      colunas[0].innerText = recaAtualizado.registroID;

      //equivale ao titulo do recados
      colunas[1].innerText = recaAtualizado.tituloderec;

      //equivale a descricao do recados
      colunas[2].innerText = recaAtualizado.descricaorecados;
    }
  }

  salvarNoStorage(listaderec);
  cancelarEdicao();
}
