export type Company = {
    name: string
    address: string
    phone?: string
}

type UserId = {
    readonly id: string | number
}

type UserWithBirthdate = {
    birthdate: Date
}


export type User = {
    readonly name: string
    age: number
    email?: string
    company?: Company
    role: 'programador' | 'mecanico' | 'tecnico'
}

// Intersection types
export type UserEntity = User & UserId & UserWithBirthdate


// Union types
type Level = 1 | 2 | 3 | 4 | 5
type Direction = 'up' | 'down' | 'left' | 'right'

