import type { NextApiRequest, NextApiResponse } from "next"
import parseToken from "parse-bearer-token"
import { decode } from "lib/jwt"
import { User } from "models/user"
import { authMiddleware } from "lib/middlewares"
import { getUserById } from "controllers/users"

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
    const user = getUserById(token.userId)
    res.send(user)
}

export default authMiddleware(handler)



// GET /me
// Devuelve info del user asociado a ese token

// PATCH /me
// Permite modificar algunos datos del usuario al que pertenezca el token.


// const handler = method({
//     get: xxxxxx,
//     patch: xxxxxx
// })

// export default authMiddleware(handler)