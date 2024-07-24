import { Order } from "models/order"
import { createPreference } from "lib/mercadopago"
import { productsIndex } from "lib/algolia"

type CreateOrderRes = {
    url: string,
    orderId: string
}

// mock
// const products = {
//     1234: {
//         title: "Remera Nigeria",
//         price: 9999
//     }
// }
// 

export async function createOrder(
    userId: string,
    productId: string,
    aditionalInfo
): Promise<CreateOrderRes> {


    // const product = products[productId] // Es como si lo fuera a buscar a DB


    const results = await productsIndex.findObject(hit => hit.objectID == productId)
    const product = await results.object

    if (!product) {
        throw "El producto no existe"
    }

    const order = await Order.createNewOrder({
        aditionalInfo,
        productId,
        userId: userId,
        status: "pending",
        createdAt: new Date()
    })

    const pref = await createPreference({
        "external_reference": order.id,
        "notification_url": "https://e-commerce-backend-kohl.vercel.app/api/ipn/mercadopago",
        "back_urls": {
            "success": "https://www.google.com.ar"
        },

        "items": [
            {
                "title": product["Name"],
                "description": product["Description"],
                "picture_url": product["Images"][0]["url"],
                "category_id": product["Category"],
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": product["Unit cost"]
            }
        ],

    })

    order.data.url = pref.init_point
    order.push()

    return ({ url: pref.init_point, orderId: order.id })

}



