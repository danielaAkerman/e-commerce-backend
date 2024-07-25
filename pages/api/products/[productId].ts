import type { NextApiRequest, NextApiResponse } from "next"
import { productsIndex } from "lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const productId = req.query.productId as string

    const results = await productsIndex.findObject(hit => hit.objectID == productId)
    const product = await results.object
    res.send({ product })
}


// GET /products/{id}
// Obtiene toda data de un producto.