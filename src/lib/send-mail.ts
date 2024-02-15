import nodemailer from "nodemailer";

const email = process.env.NODEMAILER_EMAIL;
const password = process.env.NODEMAILER_PW;
const mailHost = "smpt.gmail.com";
const mailPort = 587;
const senderEmail = "Vxrcel Digital Marketing";

/**
 * Send mail
 * @param {string} to
 * @param {string} subject
 * @param {string[html]} htmlContent
 * @returns
 */
const sendMail = async ({
	to,
	subject,
	htmlContent,
}: {
	to: string;
	subject: string;
	htmlContent: string;
}) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",

		auth: {
			user: email,
			pass: password,
		},
	});
	let mailOptions = {
		from: senderEmail,
		to: to,
		subject: subject,
		html: htmlContent,
	};
	const data = await transporter.sendMail(mailOptions); // promise

	return data;
};

export default sendMail;
