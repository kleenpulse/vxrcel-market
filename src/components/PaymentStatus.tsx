"use client";

import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next-nprogress-bar";
import React, { useEffect } from "react";

interface Props {
	orderEmail: string;
	orderId: string;
	isPaid: boolean;
}
const PaymentStatus = ({ orderEmail, orderId, isPaid }: Props) => {
	const router = useRouter();
	const { data } = trpc.payment.pollOrderStatus.useQuery(
		{ orderId },
		{
			enabled: isPaid === false,
			refetchInterval: (data) => (data?.isPaid ? false : 1000),
		}
	);

	useEffect(() => {
		if (data?.isPaid) router.refresh();
	}, [data?.isPaid, router]);

	return (
		<div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600 dark:text-gray-300">
			<div>
				<p className="font-medium text-gray-900 dark:text-gray-200">
					Shipping To
				</p>
				<p>{orderEmail}</p>
			</div>

			<div>
				<p className="font-medium text-gray-900 dark:text-gray-200">
					Order Status
				</p>
				<p>{isPaid ? "Payment successful" : "Pending payment"}</p>
			</div>
		</div>
	);
};

export default PaymentStatus;
