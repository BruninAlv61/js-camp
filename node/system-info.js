import os from 'node:os'
import ms from 'ms'

console.log('Tipo de SO: ', os.type())
console.log('Plataforma: ', os.platform())
console.log('Arquitectura: ', os.arch())
console.log('Memoria total: ', os.totalmem())
console.log('Memoria libre: ', os.freemem())
console.log('Directorio home del usuario: ', os.homedir())
console.log('Interfaces de red: ', os.networkInterfaces())
console.log('Tiempo de actividad del sistema: ', ms(os.uptime() * 1000, { long: true }))

console.log('------------------------------------------')
console.log('CPUs: ', os.cpus())
console.log('------------------------------------------')

// Información adicional

console.log('Número de núcleos de CPU: ', os.cpus().length)
console.log('Hostname del sistema', os.hostname())
console.log('Version del SO: ', os.release())
console.log('Directorio temporal: ', os.tmpdir())