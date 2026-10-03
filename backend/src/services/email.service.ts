import nodemailer from "nodemailer";

interface ContactEmail {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}: ContactEmail): Promise<void> => {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  const recipient =
    process.env.CONTACT_EMAIL?.trim() || "bibhav.bale@gmail.com";

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASS must be configured");
  }

  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  const result = await transporter.sendMail({
    from: { name: "Portfolio Contact Form", address: user },
    to: recipient,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  });

  console.info(
    `[Contact] Email accepted by SMTP. Message ID: ${result.messageId}`,
  );
};
