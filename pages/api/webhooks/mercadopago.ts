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
            console.log({ orderId })
            // Busco en DB esta orden, y los datos del comprador, para enviarle un mail
            // Cambiar estado en la orden interna (esto ya esta pago)
            // sendEmail("Tu pago fue confirmado")
            // sendEmailInterno("Alguien compró algo")
        }
    }

    // CONVIENE HACER UN BACKUP DE LOS DATOS DE LA ORDEN DE MERCADO PAGO EN NUESTRA DB
    res.send("ok")
}
