"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7ea56f4f4a5d64",
        pass: "95e3aa5f48265e"
    }
});
class NodemailerMailAdapter {
    async sendMail({ subject, body }) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'usermail@feedget.com',
            subject,
            html: body,
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
