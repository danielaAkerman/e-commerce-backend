import type { NextApiRequest, NextApiResponse } from "next"
import { sendCode } from "controllers/auth"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const result = await sendCode(req.body.email)
    res.send(result)
}



// POST /auth
// Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.