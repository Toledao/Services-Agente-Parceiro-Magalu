import { IEmailProvider, IMessage } from "../IEmailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailTrapProvider implements IEmailProvider{

    private transporter: Mail;

    constructor(
        
    ){
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9d9d4b08fca4e0",
              pass: "afc8cab133bb61",
            }
        });
    }
    
    async sendEmail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.to.name,
                address: message.to.email
            },
            subject: message.subject,
            html: message.body
        })
    }

}