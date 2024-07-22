import type { NextApiRequest, NextApiResponse } from "next"
import { getOffsetAndLimitFromReq } from "lib/requests"
import { Order } from "models/order"


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const orderId = req.query.orderId as string
    const order = await Order.findOrder(orderId)
    res.send({ order })
}






// GET /order/{orderId}
// Devuelve una orden con toda la data incluyendo el estado de la orden.