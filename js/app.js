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



export { iniciarAplicacion };
