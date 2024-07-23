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
            // Busco en DB esta orden, y los datos del comprador, para enviarle un mail
            // Cambiar estado en la orden interna (esto ya esta pago)
            // sendEmail("Tu pago fue confirmado")
            // sendEmailInterno("Alguien compró algo")
        }
    }

    // CONVIENE HACER UN BACKUP DE LOS DATOS DE LA ORDEN DE MERCADO PAGO EN NUESTRA DB
    res.send("ok")
}




// Recibe la señal de MercadoPago para confirmar que el pago fué realizado con éxito. 
// Cambia el estado de la compra en nuestra base y le envía un email al usuario para avisarle que el pago se realizó correctamente. 
// También se debe generar algún aviso hacia quienes deban procesar esta compra. 
// Esto último es algo interno así que puede ser un email o un registro en Airtable.