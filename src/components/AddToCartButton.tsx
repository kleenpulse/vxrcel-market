"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
	const { addItem } = useCart();
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsSuccess(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [isSuccess]);

	return (
		<Button
			onClick={() => {
				addItem(product);
				setIsSuccess(true);
			}}
			size="lg"
			className="w-full"
		>
			{isSuccess ? "Added to cart!" : "Add to cart"}
		</Button>
	);
};

export default AddToCartButton;
