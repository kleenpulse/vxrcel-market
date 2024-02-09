import { PRODUCT_CATEGORIES } from "../../../components/config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
	slug: "products",
	admin: {
		useAsTitle: "name",
	},
	access: {
		// create: () => true,
		// read: () => true,
		// update: () => true,
		// delete: () => true,
	},
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
			hasMany: false,
			admin: {
				condition: () => false,
			},
		},
		{
			name: "name",
			type: "text",
			required: true,
			label: "Name",
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Product details",
		},
		{
			name: "price",
			type: "number",
			required: true,
			label: "Price in USD",
			min: 0,
			max: 1000,
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
				label,
				value,
			})),
			required: true,
		},
		// {
		// 	name: "product_files",
		// 	label: "Product file(s)",
		// 	type: "relationship",
		// 	required: true,
		// 	relationTo: "product_files",
		// 	hasMany: false,
		// },
		{
			name: "approvedForSale",
			label: "Products Status",
			type: "select",
			defaultValue: "pending",
			access: {
				create: ({ req }) => req.user.role === "admin",
				read: ({ req }) => req.user.role === "admin",
				update: ({ req }) => req.user.role === "admin",
			},
			options: [
				{
					label: "Pending verification",
					value: "pending",
				},
				{
					label: "Approved",
					value: "approved",
				},
				{
					label: "Denied",
					value: "denied",
				},
			],
		},
		{
			name: "priceId",
			access: {
				create: () => false,
				read: () => false,
				update: () => false,
			},
			type: "text",
			admin: {
				hidden: true,
			},
		},
		{
			name: "stripeId",
			access: {
				create: () => false,
				read: () => false,
				update: () => false,
			},
			type: "text",
			admin: {
				hidden: true,
			},
		},
		{
			name: "images",
			type: "array",
			label: "Product images",
			minRows: 1,
			maxRows: 4,
			required: true,
			labels: {
				singular: "Image",
				plural: "Images",
			},
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
	],
};
