import type { User, UserEntity } from './00-types.ts'

const user: User = {
    name: 'brunin',
    age: 20,
    email: 'alvarezbruno17@gmail.com',
    role: 'programador'
}

const otroUser: User = {
    name: 'Carlos',
    age: 57,
    email: 'elcarlitoscarlitos@gmail.com',
    role: 'mecanico'
}

const otroUserMas: User = {
    name: 'Chacho',
    age: 52,
    company: {
        name: 'River Plate',
        address: 'Nuñez'
    },
    role: 'tecnico'
}

const entity: UserEntity = {
    id: 1234,
    name: 'brunin',
    age: 20,
    role: 'programador',
    birthdate: new Date('1999-01-01')
}



type Gato = {
    readonly name: string
    age: number
}

const primerGato: Gato = {
    name: 'Amoroso',
    age: 14
}
// Readonly nos sirve en tiempo de desarrollo
// primerGato.name = 'Chuchu'


// Object.freeze nos sirve en tiempo de ejecucion, pero no en tiempo de desarrollo
const segundoGato: Gato = Object.freeze({
    name: 'Rayo',
    age: 16
})

segundoGato.age = 17

type Translations = {
    [key: string]: string
}

const translations: Translations = {
    hello: 'hola',
    goodbye: 'adios',
    thanks: 'gracias'
}