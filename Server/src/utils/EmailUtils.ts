export class EmailUtils{
    static readonly EMAIL = process.env.EMAIL;
    static readonly PASSWORD = process.env.PASSWORD;
    static readonly nodemailer = require('nodemailer');

    static readonly TRANSPORTER = EmailUtils.nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
            user: EmailUtils.EMAIL,
            pass: EmailUtils.PASSWORD
        }
    });

}