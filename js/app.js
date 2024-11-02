import Ingreso from "./models/Ingreso.js";
import Egreso from "./models/Egreso.js";

const ingresos = [

    // Datos Iniciales
    new Ingreso("Salario", 25500),
    new Ingreso("Honorarios", 8950.60),
    new Ingreso("Renta de Casa", 2500),
    new Ingreso("Renta de Carro para Uber", 7000),
    new Ingreso("Intereses de Inversiones GBM+", 5897.76),
    new Ingreso("Sesiones Fotograficas", 3500)
];

const egresos = [

    // Datos Iniciales
    new Egreso("Megacable", 690),
    new Egreso("Hipoteca", 9500.78),
    new Egreso("Gasolina", 3780.97),
    new Egreso("Escuela", 2000),
    new Egreso("Recargas Celular", 400),
    new Egreso("Despensa", 3500),
    new Egreso("Gastos Hormigas", 2245.89),
];

const calcularTotal = (elementos) => elementos.reduce((total, elemento) => total + elemento.valor, 0);

// Funcion para dar Formato a la Moneda
const formatoMoneda = (valor) =>
    valor.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2
    });

const formatoPorcentaje = (valor) =>
    valor.toLocaleString("es-MX", {
        style: "percent",
        minimumFractionDigits: 2
    });

const actualizarCabecero = () => {
    const totalIngresos = calcularTotal(ingresos);
    const totalEgresos = calcularTotal(egresos);
    const presupuesto = totalIngresos - totalEgresos;
    const porcentajeEgreso = totalEgresos / totalIngresos || 0;
    const porcentajeIngreso = presupuesto / totalIngresos || 0;

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("porcentajeI").innerHTML = formatoPorcentaje(porcentajeIngreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos);
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos);
};

// Funcion para Renderizar elementos de HTML
const renderItems = (items, containerId, crearHTML) => {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(crearHTML).join("");
};

// Template String para Ingresos
const crearIngresoHTML = (ingreso) => `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn mdi--close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></button>
            </div>
        </div>
    </div>
`;

// Template String para Egresos
const crearEgresoHTML = (egreso) => `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn mdi--close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></button>
            </div>
        </div>
    </div>
`;

const cargarIngresos = () => renderItems(ingresos, "lista-ingresos", crearIngresoHTML);
const cargarEgresos = () => renderItems(egresos, "lista-egresos", crearEgresoHTML);

const eliminarItem = (items, id, renderFn) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        renderFn();
        actualizarCabecero();
    }
};

const eliminarIngreso = (id) => eliminarItem(ingresos, id, cargarIngresos);
const eliminarEgreso = (id) => eliminarItem(egresos, id, cargarEgresos);

const agregarDatoPresupuesto = () => {
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (descripcion && !isNaN(valor) && valor > 0) {
        const item = tipo === "Ingreso" ? new Ingreso(descripcion, valor) : new Egreso(descripcion, valor);
        (tipo === "Ingreso" ? ingresos : egresos).push(item);

        actualizarCabecero();
        tipo === "Ingreso" ? cargarIngresos() : cargarEgresos();

        document.getElementById("descripcion").value = "";
        document.getElementById("valor").value = "";
    }
};

window.eliminarIngreso = eliminarIngreso;
window.eliminarEgreso = eliminarEgreso;
window.agregarDatoPresupuesto = agregarDatoPresupuesto;

const iniciarAplicacion = () => {
    actualizarCabecero();
    cargarIngresos();
    cargarEgresos();
};

export { iniciarAplicacion };
