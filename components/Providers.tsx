"use client";

import React, { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { httpBatchLink } from "@trpc/client";

const Providers = ({ children }: PropsWithChildren) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
					fetch(url, options) {
						return fetch(url, { ...options, credentials: "include" });
					},
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ProgressBar
					height="4px"
					color="#0ff"
					options={{ showSpinner: false }}
					shallowRouting
				/>
				{children}
			</QueryClientProvider>
		</trpc.Provider>
	);
};

export default Providers;
