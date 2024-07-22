import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"
import { productsIndex } from "lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { offset, limit } = getOffsetAndLimitFromReq(req)

    const results = await productsIndex.search(req.query.q as string, {
        hitsPerPage: limit,
        page: offset > 1 ? Math.floor(offset / limit) : 0
    })
    res.send({
        results: results.hits,
        pagination: {
            offset,
            limit,
            total: results.nbHits
        }
    })

}

// GET /search?q=query&offset=0&limit=10
// Buscar productos en nuestra base de datos. 
// Chequea stock y todo lo necesario. 
// Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.