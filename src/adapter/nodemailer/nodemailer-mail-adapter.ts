import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7ea56f4f4a5d64",
    pass: "95e3aa5f48265e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: process.env.TO_EMAIL,
      subject,
      html: body,
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }
}