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
function insertItem(item, index) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.idade}</td>
        <td>${item.atividades}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class="fas fa-edit"></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class="fas fa-trash"></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}