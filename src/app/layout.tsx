import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ThemeProvider from "@/context/ThemeCtx";
import SkeletonNavbar from "@/components/skeleton/SkeletonNavbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<body
				className={cn(
					"relative h-full font-sans antialiased transition-colors duration-500 bg-white dark:bg-gray-950",
					inter.className
				)}
			>
				<Suspense fallback={<LoadingSpinner />}>
					<main className="relative flex flex-col min-h-screen">
						<Providers>
							<ThemeProvider>
								<Suspense fallback={<SkeletonNavbar />}>
									<Navbar />
								</Suspense>

								<div className="flex-grow flex-1">{children}</div>
								<Footer />
							</ThemeProvider>
						</Providers>
					</main>
				</Suspense>

				<Toaster position="top-center" richColors closeButton />
			</body>
		</html>
	);
}
