import db from "../config/database.js"

export async function authValidation(req, res, next) {

  const { authorization } = req.headers

  const token = authorization?.replace("Bearer ", '')

  if (!token) return res.sendStatus(422)

  try {
    const checkSession = await db.collection("sessions").findOne({ token })

    if (!checkSession) return res.sendStatus(401)

    res.locals.session = checkSession

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}