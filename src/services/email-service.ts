import nodemailer from 'nodemailer';

interface EmailOptions {
    recipients: string[];
    subject: string;
    text: string;
}

const createTransporter = async () => {
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    return transporter;
};

export const sendEmail = async (options: EmailOptions) => {
    const transporter = await createTransporter();
    const mailOptions = {
        from: '"Persike" <persike@gmail.com.br>',
        to: options.recipients.join(','),
        subject: options.subject,
        text: options.text
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        throw error;
    }
};
