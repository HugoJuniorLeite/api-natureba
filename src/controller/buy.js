import db from '../config/database.js'
import dayjs from "dayjs"


export async function creatbuy(req, res) {

    const { name, price, products, username, street, number, district, city, state, zipcode, namecard, numbercard, validity, securitycode, day } = req.body
    const userSession = res.locals.session


    try {
        await db.collection("sale").insertOne({
            name:name, 
            price:price, 
            products:products,
            day: dayjs().format('DD/MM/YYYY'),
            username: username,
            street: street,
            number: number,
            district: district,
            city: city,
            state: state,
            zipcode: zipcode,
            namecard: namecard,
            numbercard: numbercard,
            validity: validity,
            securitycode: securitycode
        })

        res.status(201).send("create")


    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function listbuy(req, res) {

    const userSession = res.locals.session


    try {
        const sales = await db.collection("sale").find().sort({day: 1}).toArray()

        res.send(sales)


    } catch (err) {
        res.status(500).send(err.message)
    }

}


