// ========================
// INTERFACES EN TYPESCRIPT
// ========================


// Las interfaces definen la 'forma' de un objeto
// Son contratos que especifican qué propiedades y métodos debe tener

interface Persona {
    readonly name: string
    readonly age: number
}

interface Identificable {
    id: `user-${number}`
}

interface User extends Persona, Identificable {
    email?: string
    role: 'admin' | 'user' | 'editor'
    saludar: () => string 
    login(): boolean   
}

interface Admin extends User {
    adminLevel: number
    accessAllAreas: boolean
    rootAdmin(): void
}

// Si declaramos la misma interfaz multiples veces en el mismo fichero
// TypeScript las fusiona automáticamente

interface Hero {
    nombre: string
}

interface Hero {
    poder: string
}


const hero: Hero = {
    nombre: 'Daredevil',
    poder: 'Super Sentidos'
}

const user: User = {
    id: 'user-12345',
    name: 'Brunin',
    age: 20,
    role: 'admin',
    saludar: () => 'hola',
    login() {
        return true
    }
}

interface Calculadora {
    (a: number, b: number): number
}

const calcular: Calculadora = (x, y) => x + y


// ======================
// INTERFACES PARA CLASES
// ======================

interface MediaPlayer {
    play(): void
    pause(): void
    stop(): void
}

interface AudioPlayer {
    volumen: number
}

class Reproductor implements MediaPlayer, AudioPlayer {
    volumen: number = 50

    play() : void {
        console.log('Reproduciendo...')
    }

    pause() : void {
        console.log('Pausando reproduccion...')
    }

    stop(): void {
        console.log('Deteniendo reproduccion...')
    }
}
