// =======================
// FUNCIONES EN TYPESCRIPT
// =======================

// ==========================
// TIPAR PARÁMETROS Y RETORNO
// ==========================


function sumar(a: number, b: number): number { // Esto es overkill, siempre que 
    return a + b                               // TypeScript pueda inferir el tipo de retorno, 
}                                              // no es necesario


function sumar2(a: number, b: number) { // TypeScript sabe que el valor de retorno es un number
    return a + b   
}

const multiplicar = (a: number, b: number): number => {
    return a * b
}

const dividir = (a: number, b: number): number => a / b


// =====================
// PARÁMETROS OPCIONALES
// =====================

function saludar2(nombre: string, apellido?: string) { // Apellido puede ser string o undefined
    if (apellido) {
        return `Hola, ${nombre} ${apellido}`
    }

    return `Hola, ${nombre}`
}


// ======================
// PARÁMETROS POR DEFECTO
// ======================

// EL valor por defecto de rol en este caso es admin, por lo que no puede ser opcional
function crearUsuario(nombre: string, rol: string = 'admin'): { nombre: string; rol: string} {
    return {
        nombre,
        rol
    }
}

// ===============
// REST PARAMETERS
// ===============

// Al usar el Rest Parameter, TypeScript sabe que numeros es un array
function sumarNumeros(...numeros: number[]): number {
    return numeros.reduce((acumulador, numeroActual) => acumulador + numeroActual, 0) // Reduce suma todos los números del array
}

sumarNumeros(1, 2)
sumarNumeros(1, 2, 3, 4, 5)

// ================================
// TIPO DE FUNCIÓN (Function Types)
// ================================ 

type OperacionMatematica = (a: number, b: number) => number

const division : OperacionMatematica = (a, b) => a / b
const resta: OperacionMatematica = (a, b) => a - b


