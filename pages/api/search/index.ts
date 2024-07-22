// import type { NextApiRequest, NextApiResponse } from "next"
// import { sendCode } from "controllers/auth"

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//     const result = await sendCode(req.body.email)

//     res.send(result)
// }


// GET /search?q=query&offset=0&limit=10
// Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario. Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.