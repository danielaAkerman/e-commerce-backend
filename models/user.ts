import { firestore } from "../lib/firestore";

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

    static async sendEmail(comprador){
        const user = await collection.doc(comprador).get()
        const userEmail= await user.data().email
        console.log("EL MAIL DEL COMPRADOR DESDE MODELS USERS ES ", userEmail)
    }
}