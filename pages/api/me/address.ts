import type { NextApiRequest, NextApiResponse } from "next"
import { authMiddleware } from "lib/middlewares"
import { getUserById } from "controllers/users"
import method from "micro-method-router"

async function patchMeAddress(req: NextApiRequest, res: NextApiResponse, token) {
    const user = await getUserById(token.userId)
    const newAddress = req.body.address
    user.data = { ...user.data, address: newAddress }
    user.push()

    res.send(user.data)
}

const handler = method({
    patch: patchMeAddress
})

export default authMiddleware(handler)


// PATCH /me/address
// Permite modificar un dato puntual del usuario al que pertenezca el token usado en el request. En este caso el objeto que describe la dirección.