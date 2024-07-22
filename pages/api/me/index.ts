import type { NextApiRequest, NextApiResponse } from "next"
import { authMiddleware } from "lib/middlewares"
import { getUserById } from "controllers/users"
import method from "micro-method-router"

async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
    const user = await getUserById(token.userId)
    res.send(user.data)
}

async function patchHandler(req: NextApiRequest, res: NextApiResponse, token) {
    const user = await getUserById(token.userId)
    user.data = {...user.data, ...req.body}
    user.push()

    res.send(user.data)
}

const handler = method({
    get: getHandler,
    patch: patchHandler
})

export default authMiddleware(handler)

// GET /me
// Devuelve info del user asociado a ese token

// PATCH /me
// Permite modificar algunos datos del usuario al que pertenezca el token.



