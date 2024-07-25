import { User } from "models/user"
import { Auth } from "lib/auth"
import gen from "random-seed"
import addMinutes from "date-fns/addMinutes"
// import sgMail from "@sendgrid/mail"

var seed = 'kjfbskdjbfksdbfksdbf';
var random = gen.create(seed);

export async function findOrCreateAuth(email: string): Promise<Auth> {
    const cleanEmail = email.trim().toLowerCase()
    const auth = await Auth.findByEmail(cleanEmail)
    if (auth) {
        return auth
    } else {
        const newUser = await User.createNewUser({
            email: cleanEmail
        })
        const newAuth = await Auth.createNewAuth({
            email: cleanEmail,
            userId: newUser.id,
            code: "",
            expires: new Date()
        })
        return newAuth
    }
}

export async function sendCode(email: string) {
    const auth = await findOrCreateAuth(email)
    const code = Math.floor((Math.random() + 1) * 99999)
    const now = new Date()
    const twentyMinutesFromNow = addMinutes(now, 20)
    auth.data.code = code
    auth.data.expires = twentyMinutesFromNow
    await auth.push()

    // // enviar mail

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //     to: email,
    //     from: "daniela.akerman@outlook.com",
    //     subject: `Te enviamos tu codigo de acceso`,
    //     text: `Hola!`,
    //     html: `Tu código de acceso es ${code} y expira en 20 minutos!`,
    // };
    // sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log("email enviado a " + email + " con el dódigo " + code)
    //         return { message: "Reporte enviado" };
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         return { message: "Error" };
    //     });

    // // fin enviar mail

    return ({code})
}