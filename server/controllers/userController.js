import generateId from '../scripts/generateId.js'
import cript from '../scripts/encript.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'users.json')


async function signUp(req, res) {

    let users = []

    try {
        const { name, email, teamName, password } = req.body

        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, '[]')
        }

        if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf-8')
            users = data ? JSON.parse(data) : []
        }

        const userExist = users.some(user => user.name === name || user.email === email)

        if (userExist) {
            return res.status(409).json({ message: 'username or email alredy exist' })
        }

        let encriptedPassword = cript.encrypt(password)

        const id = generateId.generateExtenseId(users)
        const newUser = {
            id,
            name,
            email,
            password: encriptedPassword,
            team: {
                id: id,
                name: '',
                players: [],
                stage: [],
                picture: '',
            },
        }

        users.push(newUser)
        fs.writeFileSync(dbPath, JSON.stringify(users, null, 2))
        console.log(`user [${id}]${name} has been registered, team ${teamName}`)
        return res.status(201).json(newUser)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'internal server error' })
    }
}