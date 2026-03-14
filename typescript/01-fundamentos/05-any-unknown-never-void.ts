// ==========================
// ANY, UNKNOWN, NEVER Y VOID
// ==========================


// ======================================
// ANY - El tipo que desactiva TypeScript
// ======================================

let cualquierCosa: any = 'Hola'
cualquierCosa = 23
cualquierCosa = true
cualquierCosa.funcionQueNoExiste()

const result = cualquierCosa + 8 // Any es contagioso (como tu ex) ahora result también es any

// ¿En qué casos tiene sentido?

// 1. en migraciones de JS a TS: Es mejor migrar a TS y tener un 85% de TS correcto y un 15%
//                               de Anys a no tener TS en absoluto solo por no escribir Anys

// 2. En librerías de terceros sin tipos


// =====================================
// UNKNOWN - La alternativa segura a any 
// =====================================

let valorDesconocido: unknown = 'hola'
valorDesconocido = 42
valorDesconocido = true
valorDesconocido = { nombre: 'test' }

// valorDesconocido.funcionQueNoExiste() <-- Esto da un error
// const suma = valorDesconocido + 10 <-- Esto da un error

// Para utilizar UNKNOWN debemos hacer type narrowing

if (typeof valorDesconocido === 'number') {
    const suma = valorDesconocido + 10 // En este caso, TypeScript nos indica que valorDesconocido
                                       // es un number
} else if (typeof valorDesconocido === 'string') {
    const mayusculas = valorDesconocido.toUpperCase()
}

function parseJSON(jsonString: string): unknown {
    return JSON.parse(jsonString)
}

const datos = parseJSON('{"nombre": "brunin", "edad": 20}')

// datos.nombre <-- Esto da un error

if (typeof datos === 'object' && datos !== null && 'nombre' in datos) {
    console.log((datos as { nombre: string }).nombre)
}


// =====================================
// VOID - Funciones que no retornan nada
// =====================================


function saludar(): void {
    console.log('Hola chiquitito!!!')
    // return 2 <-- Esto da error porque la función no debe retornar nada 
}

function logError(errorMessage: string): void {
    if (errorMessage.length === 0) {
        return // Esto devuelve undefined, no da error porque es como si devolviesemos un valor
               // que no es util, al fin y al cabo es un valor, pero void nos permite devolverlo 
    }

    console.log('Error: ', errorMessage)
}


// ================================
// NEVER - El tipo imposible
// ================================

function bucleInfinito(): never {
    while (true) {
        // ...
    }
}

function throwError(message: string): never {
    throw new Error(message)
}

function revisarValor(x: number | string) { 
    if (typeof x === 'number') {
        console.log('Es un número: ', x)
    } else if (typeof x === 'string') {
        console.log('Es un string: ', x)
    } else {
        // Aquí, x es de tipo 'never'
        throwError('Tipo no soportado')
    }
}

// ================================
// COMPARATIVA
// ================================

/*
┌──────────┬────────────────────────────────────────────────────────┐
│ Tipo     │ Descripción                                            │
├──────────┼────────────────────────────────────────────────────────┤
│ any      │ Acepta todo, permite todo. EVITAR.                     │
│ unknown  │ Acepta todo, pero requiere verificación. PREFERIBLE.   │
│ void     │ Para funciones que no retornan valor útil.             │
│ never    │ Para casos imposibles o funciones que no terminan.     │
└──────────┴────────────────────────────────────────────────────────┘
*/