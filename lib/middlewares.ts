import type { NextApiRequest, NextApiResponse } from "next"
import parseToken from "parse-bearer-token"
import { decode } from "lib/jwt"
import { User } from "models/user"


export function authMiddleware(callback) {

    return function (req: NextApiRequest, res: NextApiResponse) {
        const token = parseToken(req)
        if (!token) {
            res.status(401).send({ message: "No hay token" })
        }

        const decodedToken = decode(token)

        if (decodedToken) {
            callback(req, res, decodedToken)
        }
        else {
            res.status(401).send({ message: "Token incorrecto" })
        }

    }
}