let flowers = [
    { name: "Rosas", stock: 120, price: 1.50 },
    { name: "Tulipanes", stock: 80, price: 2.00 },
    { name: "Orquídeas", stock: 45, price: 3.75 }
];

const tableBody = document.getElementById("table-body");
const form = document.getElementById("flower-form");
const editIndexInput = document.getElementById("editIndex");
const formTitle = document.getElementById("form-title");

function renderTable() {
    tableBody.innerHTML = "";
    flowers.forEach((flower, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${flower.name}</td>
                <td>${flower.stock}</td>
                <td>$${flower.price.toFixed(2)}</td>
                <td>
                    <button class="action-btn edit" onclick="editFlower(${index})">Editar</button>
                    <button class="action-btn delete" onclick="deleteFlower(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const stock = parseInt(document.getElementById("stock").value);
    const price = parseFloat(document.getElementById("price").value);
    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        flowers.push({ name, stock, price });
    } else {
        flowers[editIndex] = { name, stock, price };
    }

    resetForm();
    renderTable();
});

function editFlower(index) {
    const flower = flowers[index];
    document.getElementById("name").value = flower.name;
    document.getElementById("stock").value = flower.stock;
    document.getElementById("price").value = flower.price;
    editIndexInput.value = index;
    formTitle.textContent = "Editar flor";
}

function deleteFlower(index) {
    if (confirm("¿Eliminar esta flor del inventario?")) {
        flowers.splice(index, 1);
        renderTable();
    }
}

function resetForm() {
    form.reset();
    editIndexInput.value = "";
    formTitle.textContent = "Agregar flor";
}

renderTable();
