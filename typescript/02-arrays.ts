// =============================
// ARRAYS EN TYPESCRIPT
// =============================

// Sintaxis 1
const numeros: number[] = [1, 2, 3, 4, 5]
numeros.push(8)

// Sintaxis 2
const numerosAlt: Array<number> = [1, 2, 3, 4, 5]
numerosAlt.push(8)

// Array de tipos mixtos

const mixArray: (string | number)[] = [1, 'dos', 3, 'cuatro', 5]
mixArray.push('seis')
mixArray.push(7)

const idsToFilter: (string | undefined)[] = ['uuid-1', undefined, 'uuid-2', undefined, 'uuid-3']

// Array de objetos

const personas: { nombre: string, edad: number }[] = [
    { nombre: 'Juan', edad: 30 },
    { nombre: 'Maria', edad: 25 }
]