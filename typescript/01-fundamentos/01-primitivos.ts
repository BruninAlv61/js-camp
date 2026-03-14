// ==============================
// TIPOS PRIMITIVOS EN TYPESCRIPT
// ==============================

// 1. string
const nombre = 'brunin'
const saludo = `Hola, ${nombre}`
const vacio: string = ''

// 2. numeros
let color = 0x09f
let infinito = Infinity

// 3. booleanos 
let isActive: boolean = true
isActive = false

// 4. nulos e indefinidos
let nulo: null = null
let indefinido: undefined = undefined

let age: number | null = null
age = 30

const numeroGrande: bigint = 9007199254740991n
const id: symbol = Symbol('id')

// diferencia en la inferencia de datos para adivinar el tipo
// para let y const

const ciudad = 'Buenos Aires'

let pais = 'Argentina'