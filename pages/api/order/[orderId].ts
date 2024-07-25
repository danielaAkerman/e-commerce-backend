import type { NextApiRequest, NextApiResponse } from "next"
import { authMiddleware } from "lib/middlewares"
import { Order } from "models/order"
import method from "micro-method-router"


async function getOrderById (req: NextApiRequest, res: NextApiResponse) {
    const orderId = req.query.orderId as string
    const order = await Order.findOrder(orderId)
    res.send({ order })
}


const handler = method({
    get: getOrderById
})

export default authMiddleware(handler)



// GET /order/{orderId}
// Devuelve una orden con toda la data incluyendo el estado de la orden.