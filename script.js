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
filterInput.addEventListener("input", function() {
    const filterValue = this.value.toLowerCase().trim();

    const filteredItems = itens.filter(item => {
        return item.nome.toLowerCase().includes(filterValue);
    });

    tbody.innerHTML = "";

    filteredItems.forEach((item, index) => {
        insertItem(item, index);
        tbody.lastChild.classList.add("filtered-row");
    });
});

function openModal(edit = false, index = 0) {
    modal.classList.add("active");

    modal.onclick = (e) => {
        if (e.target.className.indexOf("modal-container") !== -1) {
            modal.classList.remove("active");
        }
    };

    if (edit) {
        sNome.value = itens[index].nome;
        sEmail.value = itens[index].email;
        sIdade.value = itens[index].idade;
        sAtividades.value = itens[index].atividades;
        id = index;
    } else {
        sNome.value = "";
        sEmail.value = "";
        sIdade.value = "";
        sAtividades.value = "";
        id = undefined;
    }
}
function editItem(index) {
    openModal(true, index);
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD(itens);
    loadItens();
}

btnSalvar.onclick = (e) => {
    if (sNome.value == "" || sEmail.value == "" || sIdade.value == "" || sAtividades.value == "") {
        return;
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value;
        itens[id].email = sEmail.value;
        itens[id].idade = sIdade.value;
        itens[id].atividades = sAtividades.value;
    } else {
        itens.push({
            nome: sNome.value,
            email: sEmail.value,
            idade: sIdade.value,
            atividades: sAtividades.value
        });
    }

    setItensBD(itens);
    modal.classList.remove("active");
    loadItens();
    id = undefined;
};

loadItens();