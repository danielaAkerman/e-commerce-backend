import type { NextApiRequest, NextApiResponse } from "next"
import { getMerchantOrder } from "lib/mercadopago"
import { Order } from "models/order"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query

    if (topic == "merchant_order") {
        const order = await getMerchantOrder(id)
        if (order.order_status == "paid") {
            const orderId = order.external_reference
            const myOrder = new Order(orderId)
            await myOrder.pull()

            myOrder.data.status = "closed"
            myOrder.data.externalOrder = order // BACK UP
            await myOrder.push()

            // const mailEnviadoComprador = await User.sendEmailComprador(myOrder.data.userId)
            res.send("Se actualizó la orden con éxito")
        }
    }
    res.send("ok")
}