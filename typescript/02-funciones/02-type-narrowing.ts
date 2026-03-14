// ========================================
// TYPE NARROWING (Estrechamiento de tipos)
// ========================================

// Type Narrowing es la técnica de reducir un tipo más amplio
// a uno más especifíco mediante comprobaciones

function procesar(valor: number | string) {
    // <-- En este punto, el valor es "number | string"
    console.log(valor)

    if (typeof valor === 'number') {
        // <-- En este punto, el valor es "number"
        console.log('El valor es un numero:', valor.toFixed(2))
    } else {
        // <-- En este punto, el valor es "string"
        console.log('El valor es una cadena:', valor.toUpperCase())
    }
}

function imprimirMensaje(mensaje: string | null | undefined) {
    // <-- En este punto, el 'mensaje' es de tipo 'string | null | undefined'

    if (mensaje) {
        // <-- Al ser truthy, TypeScript sabe que no es null ni undefined
        console.log(mensaje.toUpperCase()) // Mensaje es un string
    }
}

// Operator Narrowing

type Pez = {
    nadar: () => void
    nombre: string
}

type Pajaro = {
    volar: () => void
    nombre: string
}

type Perro = {
    correr: () => void
    nombre: string
}

type Animal = Pez | Pajaro | Perro

function moverAnimal(animal: Animal) {
    if ('nadar' in animal) {
        console.log('El animal es un pez')
        animal.nadar()
    } else if ('volar' in animal){
        console.log('El animal es un pajaro')
        animal.volar()
    } else {
        console.log('El animal es un perro')
        animal.correr()
    }
}

// instanceof Narrowing

function formatDate (value: Date | string): string {
    if (value instanceof Date) {
        return value.toUTCString()
    }

    return new Date(value).toUTCString()
}