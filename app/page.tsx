import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
	{
		name: "Instant Delivery",
		icon: ArrowDownToLine,
		description: "Get your assets instantly delivered to your email",
	},
	{
		name: "Guaranteed Quality",
		icon: CheckCircle,
		description:
			"Every asset on our platform is veriified by our team to ensure our highest quality standards",
	},
	{
		name: "For the Planet",
		icon: Leaf,
		description:
			"We've pledge to make our platform a better place for everyone",
	},
];

export default function Home() {
	return (
		<>
			<MaxWidthWrapper>
				<div
					data-auth
					className="flex py-20 mx-auto text-center flex-col items-center max-w-3xl lg:max-w-[800px] dark:bg-gradient-to-r from-transparent via-gray-950 to-transparent transition-colors duration-500"
				>
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
						Your Gateway to Top Quality Premium
						<span className="text-blue-600 dark:text-blue-500">
							{" "}
							Digital Excellence
						</span>
					</h1>

					<p className="mt-6 text-lg max-w-prose text-muted-foreground dark:text-gray-400">
						Welcome to DigitalHippo. Every asset on our platform is veriified by
						our team to ensure our highest quality standards
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mt-6">
						<Link href="/products" className={buttonVariants()}>
							Browse Trending
						</Link>
						<Button variant={"ghost"}>Our quality promise &rarr;</Button>
					</div>
				</div>

				{/* TODO: List products */}
			</MaxWidthWrapper>
			<section className="border-t border-gray-200 dark:border-blue-600 bg-gray-50 dark:bg-gray-950">
				<MaxWidthWrapper className="py-20">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
						{perks.map((perk) => (
							<div
								key={perk.name}
								className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
							>
								<div className="md:flex-shrink-0 flex justify-center">
									<div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-900 dark:text-blue-300">
										{<perk.icon className="w-1/3 h-1/3" />}
									</div>
								</div>
								<div className="flex flex-col mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
									<h3 className="text-base font-medium text-gray-900 dark:text-gray-200">
										{perk.name}
									</h3>
									<p className="mt-3 sm:mt-2 text-sm text-muted-foreground">
										{perk.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</MaxWidthWrapper>
			</section>
		</>
	);
}
