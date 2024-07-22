import type { NextApiRequest, NextApiResponse } from "next"
import { authMiddleware } from "lib/middlewares"
import { getUserById } from "controllers/users"
import method from "micro-method-router"
import { Order } from "models/order"

async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
    const orders = await Order.getMyOrders(token.userId)
    res.send(orders)
}



const handler = method({
    get: getHandler,
})

export default authMiddleware(handler)

// GET /me/orders
// Devuelve todas mis ordenes con sus status.