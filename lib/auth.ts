import { firestore } from "./firestore";
import isAfter from "date-fns/isAfter"
import { generate } from "lib/jwt"

const collection = firestore.collection("auth")

export class Auth {
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

    isCodeExpired() {
        const now = new Date()
        const expires = this.data.expires.toDate()
        return isAfter(now, expires)
    }

    generateToken() {
        const token = generate({ userId: this.data.userId })
        this.data.code = ""
        this.push()
        return token
    }

    static async findByEmail(email: string) {
        const cleanEmail = Auth.cleanEmail(email)
        const results = await collection.where("email", "==", cleanEmail).get()
        if (results.docs.length) {
            const first = results.docs[0]
            const newAuth = new Auth(first.id)
            newAuth.data = first.data()
            return newAuth
        } else { return null }
    }

    static async createNewAuth(data) {
        const newUserSnap = await collection.add(data)
        const newUser = new Auth(newUserSnap.id)
        newUser.data = data
        return newUser
    }

    static cleanEmail(email: string) {
        return email.trim().toLowerCase()
    }

    static async findByEmailAndCode(email: string, code: number) {
        const cleanEmail = Auth.cleanEmail(email)
        const result = await collection.where('email', '==', cleanEmail).where("code", "==", code).get()
        if (result.empty) {
            console.error("email y code no coinciden")
            return null
        } else {
            const doc = result.docs[0]
            const auth = new Auth(doc.id)
            auth.data = doc.data()
            return auth
        }

    }
}

// push