// =====================
// TUPLAS EN TYPESCRIPT
// =====================

const persona: [string, number] = ['brunin', 20]

const [personName, personAge] = persona

// 1. Coordenadas
type Coordenadas = [latitude: number, longitude: number]

const [lat, lon]: Coordenadas = [40.7128, -74.0060]

// 2. Colores RGB
type RGB = [number, number, number]

const rojo: RGB = [255, 0, 0]
const verde: RGB = [0, 255, 0]
const azul: RGB = [0, 0, 255]

// 3. Rango de valores
type Rango = [min: number, max: number]

const rangoEdad: Rango = [18, 65]

// 4. Tipo useState de React
type EstadoContador = [value: number, updateFunction: (nuevoValor: number) => void]

// 5. HTTP Status Codes
type HttpStatus = [number, string]

const [code, message]: HttpStatus = [200, 'OK']

// 6. Usuario (ID, Nombre, Activo)
type Usuario = [number, string, boolean]

const [id, userName, isActive]: Usuario = [1, 'brunin', true]

// 7. Registro de logs (Timestamp, Nivel, Mensaje)
type LogEntry = [Date, 'INFO' | 'WARN' | 'ERROR', string]

const log: LogEntry = [new Date(), 'INFO', 'Usuario logueado']

// 8. Par de clave-valor (como objetos pero con orden fijo)
type KeyValuePair = [string, any]

const settings: KeyValuePair[] = [
    ['theme', 'dark'],
    ['notifications', true],
    ['language', 'es']
]

// Tuplas con REST elements

type StringYMuchosNumeros = [string, ...number[]]

const [text, firstNumber, ...restOfNumbers]: StringYMuchosNumeros = ['numeros', 1, 2, 3, 4, 5]

type Config = readonly [server: string, port: number, useSSL: boolean]

const dbConfig: Config = ['localhost', 3000, true]

// dbConfig[0] = 'otro-server' // Error: no se puede modificar una tupla readonly