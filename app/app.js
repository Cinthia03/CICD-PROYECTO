let flowers = [
    { name: "Rosas", stock: 120, price: 1.50 },
    { name: "Tulipanes", stock: 80, price: 2.00 },
    { name: "Orquídeas", stock: 45, price: 3.75 }
];

let cart = [];

const tableBody = document.getElementById("table-body");
const form = document.getElementById("flower-form");
const editIndexInput = document.getElementById("editIndex");
const formTitle = document.getElementById("form-title");
const salesTable = document.getElementById("sales-table");
const searchInput = document.getElementById("search");
const qtyInput = document.getElementById("global-qty");

/* ================= INVENTARIO ================= */

function renderTable() {
    tableBody.innerHTML = "";
    flowers.forEach((flower, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${flower.name}</td>
                <td>${flower.stock}</td>
                <td>$${flower.price.toFixed(2)}</td>
                <td>
                    <button onclick="editFlower(${index})">Editar</button>
                    <button onclick="deleteFlower(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const name = nameInput.value;
    const stock = parseInt(stockInput.value);
    const price = parseFloat(priceInput.value);
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
    nameInput.value = flower.name;
    stockInput.value = flower.stock;
    priceInput.value = flower.price;
    editIndexInput.value = index;
    formTitle.textContent = "Editar flor";
}

function deleteFlower(index) {
    if (confirm("¿Eliminar esta flor?")) {
        flowers.splice(index, 1);
        renderTable();
    }
}

function resetForm() {
    form.reset();
    editIndexInput.value = "";
    formTitle.textContent = "Agregar flor";
}

/* ================= LOGIN / TABS ================= */

function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    const error = document.getElementById("login-error");

    if (user === "admin" && pass === "1234") {
        error.textContent = "";
        document.getElementById("login-container").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        error.textContent = "Usuario o contraseña incorrectos";
    }
}

function showTab(tab) {
    inventario.style.display = tab === "inventario" ? "block" : "none";
    ventas.style.display = tab === "ventas" ? "block" : "none";

    if (tab === "ventas") {
        renderSalesInventory(flowers);
        renderSalesTable();
    }
}

/* ================= VENTAS ================= */

function renderSalesInventory(list) {
    salesTable.innerHTML = "";

    list.forEach((flower, index) => {
        salesTable.innerHTML += `
            <tr>
                <td>${flower.name}</td>
                <td>$${flower.price.toFixed(2)}</td>
                <td>${flower.stock}</td>
                <td>
                    <button onclick="addToCart(${index})">Agregar</button>
                </td>
                <td>-</td>
            </tr>
        `;
    });
}

function addToCart(index) {
    const qty = parseInt(qtyInput.value);

    if (!qty || qty <= 0) {
        alert("Cantidad inválida");
        return;
    }

    if (flowers[index].stock < qty) {
        alert("Stock insuficiente");
        return;
    }

    flowers[index].stock -= qty;

    cart.push({
        index,
        name: flowers[index].name,
        price: flowers[index].price,
        qty,
        total: qty * flowers[index].price
    });

    renderTable();
    renderSalesTable();
}

function renderSalesTable() {
    salesTable.innerHTML = "";

    cart.forEach((item, i) => {
        salesTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.qty}</td>
                <td>
                    <button onclick="removeFromCart(${i})">❌</button>
                </td>
                <td>$${item.total.toFixed(2)}</td>
            </tr>
        `;
    });

    renderTotalGeneral();
}

function removeFromCart(i) {
    flowers[cart[i].index].stock += cart[i].qty;
    cart.splice(i, 1);
    renderTable();
    renderSalesTable();
}

function renderTotalGeneral() {
    const total = cart.reduce((sum, i) => sum + i.total, 0);
    document.getElementById("total-general").textContent = `$${total.toFixed(2)}`;
}

function filterFlowers() {
    const text = searchInput.value.toLowerCase();
    renderSalesInventory(flowers.filter(f => f.name.toLowerCase().includes(text)));
}

/* ================= GENERAR VENTA ================= */

function generateSale() {
    if (cart.length === 0) {
        alert("No hay productos en la venta");
        return;
    }

    let summary = "🧾 RESUMEN DE VENTA\n\n";

    cart.forEach(item => {
        summary += `${item.name} x${item.qty} = $${item.total.toFixed(2)}\n`;
    });

    summary += `\nTOTAL: ${document.getElementById("total-general").textContent}`;

    alert(summary);

    cart = [];
    renderSalesTable();
    renderTable();
}

renderTable();
