import type { NextApiRequest, NextApiResponse } from "next"
import { Auth } from "lib/auth"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body

    const auth = await Auth.findByEmailAndCode(email, code)

    if (!auth) {
        res.status(401).send({ message: "Email or code incorrect" })
        return null
    }

    const expired = auth.isCodeExpired()
    if (expired) {
        res.status(401).send({ message: "Code expirado" })
        return null
    }

    const token = auth.generateToken()
    res.send({token})
}

// POST /auth/token
// Recibe un email y un código y valida que sean los correctos. En el caso de que sean correctos devuelve un token e invalida el código. 