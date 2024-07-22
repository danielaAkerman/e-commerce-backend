import type { NextApiRequest, NextApiResponse } from "next"
import { sendCode } from "controllers/auth"
import method from "micro-method-router"
import { authMiddleware } from "lib/middlewares"
import { createOrder } from "controllers/orders"
import { Order } from "models/order"
import * as yup from "yup"

// let querySchema = yup.object().shape({
//     productId: yup.string().required(),
// })

// let bodySchema = yup.object().shape({
//     color: yup.string(),
//     address: yup.string()
// })
// .noUnknown(true).strict()

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
    // crear la orden en la DB, porq esta orden va a tener un ID

    // try {
    //     await querySchema.validate(req.query)
    // } catch (e) {
    //     res.status(400).send({ field: "query", message: e })
    // }


    // try {
    //     await bodySchema.validate(req.body)
    // } catch (e) {
    //     res.status(400).send({ field: "body", message: e })
    // }

    const { productId } = req.query as any

    try {
        const newOrder = await createOrder(token.userId, productId, req.body)
        res.send(newOrder)
    } catch (e) {
        res.status(400).send({ message: e })
    }

}

const handler = method({
    post: postHandler
})

export default authMiddleware(handler)


// POST /order?productId={id}
// Genera una compra en nuestra base de datos 
// y además genera una orden de pago en MercadoPago. 
// Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId.