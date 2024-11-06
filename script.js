const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sEmail = document.querySelector("#m-email");
const sIdade = document.querySelector("#m-idade");
const sAtividades = document.querySelector("#m-atividades");
const btnSalvar = document.querySelector("#btn-salvar");
const filterInput = document.querySelector("#filter-name");

let itens;
let id;

const getItensBD = () => JSON.parse(localStorage.getItem("dbvoluntarios")) ?? [];
const setItensBD = (itens) => localStorage.setItem("dbvoluntarios", JSON.stringify(itens));

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = "";
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}