import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
	render,
} from "@react-email/components";

import * as React from "react";

interface Props {
	actionLabel: string;
	btnText: string;
	href: string;
}

const TokenEmail = ({ actionLabel, btnText, href }: Props) => {
	return (
		<Html>
			<Head />
			<Preview>The marketplace for premium digital goods.</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						src={`${process.env.NEXT_PUBLIC_SERVER_URL}/hippo-newsletter-sign-up.png`}
						width="150"
						height="150"
						alt="DigitalHippo"
						style={logo}
					/>
					<Text style={paragraph}>Hi there,</Text>
					<Text style={paragraph}>
						Welcome to Vxrcel Market, the marketplace for premium digital goods.
						Use the button below to {actionLabel}.
					</Text>
					<Section style={btnContainer}>
						<Button style={button} href={href}>
							{btnText}
						</Button>
					</Section>
					<Text style={paragraph}>
						Best,
						<br />
						The VxrcelMarket team
					</Text>
					<Hr style={hr} />
					<Text style={footer}>
						If you did not request this email, you can safely ignore it.
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

export const TokenEmailHtml = (props: Props) =>
	render(<TokenEmail {...props} />, { pretty: true });

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

const logo = {
	margin: "0 auto",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
};

const btnContainer = {
	textAlign: "center" as const,
};

const button = {
	padding: "12px 12px",
	backgroundColor: "#2563eb",
	borderRadius: "3px",
	color: "#fff",
	fontSize: "16px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
};

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};

const footer = {
	color: "#8898aa",
	fontSize: "12px",
};
