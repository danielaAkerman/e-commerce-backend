import { Order } from "models/order"
import { createPreference } from "lib/mercadopago"

type CreateOrderRes = {
    url: string
}

// mock
const products = {
    1234: {
        title: "Remera Nigeria",
        price: 9999
    }
}
// 

export async function createOrder(
    userId: string,
    productId: string,
    aditionalInfo
): Promise<CreateOrderRes> {


    const product = products[productId] // Es como si lo fuera a buscar a DB

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

    // res.send(order.data)

    const pref = await createPreference({
        "external_reference": order.id,
        "notification_url": "https://payments-vert-iota.vercel.app/api/webhooks/mercadopago",
        "back_urls": {
            "success": "https://www.google.com.ar"
        },

        "items": [
            {
                "title": product.title,
                "description": "Dummy description",
                "picture_url": "http://www.myapp.com/myimage.jpg",
                "category_id": "car_electronics",
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": product.price
            }
        ],

    })

    return ({ url: pref.init_point })
    
}





