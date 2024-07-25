import { firestore } from "../lib/firestore";
// import sgMail from "@sendgrid/mail"

const collection = firestore.collection("users")

export class User {
    ref: FirebaseFirestore.DocumentReference
    data: any
    id: string
    constructor(id) {
        this.id = id
        this.ref = collection.doc(id)
    }
    async pull() {
        const snap = await this.ref.get()
        this.data = snap.data()
    }
    async push() {
        this.ref.update(this.data)
    }
    static async createNewUser(data) {
        const newUserSnap = await collection.add(data)
        const newUser = new User(newUserSnap.id)
        newUser.data = data
        return newUser
    }

    // static async sendEmailComprador(id) {
    //     const user = await collection.doc(id).get()
    //     const userEmail = await user.data().email


    //     // enviar mail

    //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //     const msg = {
    //         to: userEmail,
    //         from: "daniela.akerman@outlook.com",
    //         subject: `Pago aprobado`,
    //         text: `Hola!`,
    //         html: `Se registró tu pago, gracias por tu compra!`,
    //     };
    //     sgMail
    //         .send(msg)
    //         .then(() => {
    //             console.log("email enviado a " + userEmail)
    //             return ({ message: "mail enviado al comprador", email: userEmail })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             return { message: "Error" };
    //         });

    //     // fin enviar mail        
    // }

    // static async sendEmailVendedor() {
    //     return true
    // }
}