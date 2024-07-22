import type { NextApiRequest, NextApiResponse } from "next"
import parseToken from "parse-bearer-token"
import { decode } from "lib/jwt"
import { User } from "models/user"
import { authMiddleware } from "lib/middlewares"
import { getUserById } from "controllers/users"

// async function handler(req: NextApiRequest, res: NextApiResponse, token) {
//     const user = getUserById(token.userId)
//     res.send(user)
// }

// export default authMiddleware(handler)



// PATCH /me/address
// Permite modificar un dato puntual del usuario al que pertenezca el token usado en el request. En este caso el objeto que describe la dirección.