import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import { type InitOptions } from "payload/config";
import nodemailer from "nodemailer";

dotenv.config({
	path: path.resolve(__dirname, "./.env"),
});

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PW,
	},
});

let cached = (global as any).payload;

if (!cached) {
	cached = (global as any).payload = {
		client: null,
		promise: null,
	};
}

interface Args {
	initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
	initOptions,
}: Args = {}): Promise<Payload> => {
	if (!process.env.PAYLOAD_SECRET) {
		throw new Error("PAYLOAD_SECRET is not defined");
	}

	if (cached.client) {
		return cached.client;
	}

	if (!cached.promise) {
		cached.promise = payload.init({
			email: {
				transport: transporter,
				fromAddress: process.env.NODEMAILER_EMAIL!,
				fromName: "Vxrcel Digital Marketing",
			},
			secret: process.env.PAYLOAD_SECRET,
			local: initOptions?.express ? false : true,
			...(initOptions || {}),
		});
	}

	try {
		cached.client = await cached.promise;
	} catch (error: any) {
		cached.promise = null;
		console.error(error);
	}

	return cached.client;
};
