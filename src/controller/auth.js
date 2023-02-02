import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from "../config/database.js"



// users = db.collection("users")
// sessions = db.collection("sessions")



export async function signUp(req, res) {

    const { name, email, password } = req.body

    const passwordHashed = bcrypt.hashSync(password, 10)


    try {

        const isIncluded = await db.collection("users").findOne({ email })

        if (isIncluded) return res.status(409).send("Esse e-mail já está cadastrado.")

        await db.collection("users").insertOne({ name, email, password: passwordHashed })

        res.status(201).send("Usuário cadastrado com sucesso!")


    } catch (err) {
        res.status(500).send(err)

    }


}

export async function signIn(req, res) {

    const { email, password } = req.body

    try {

        const checkUser = await db.collection("users").findOne({ email })

        if (!checkUser) return res.status(400).send("Usuário ou senha incorretos")

        const isCorrectPassword = bcrypt.compareSync(password, checkUser.password)

        if (!isCorrectPassword) return res.status(400).send("Usuário ou senha incorretos")

        const token = uuidV4()

        await db.collection("sessions").insertOne({ idUser: checkUser._id, token })

        const apiForm = { token, name: checkUser.name }

        return res.status(200).send(apiForm)


    } catch (err) {

        res.status(500).send(err.message)

    }

}