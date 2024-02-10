import { useRouter } from "next-nprogress-bar";
import { toast } from "sonner";

export const useAuth = () => {
	const router = useRouter();
	const signOut = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!res.ok) throw new Error("Failed to sign out");

			toast.success("Signed out successfully");

			router.push("/sign-in");
			router.refresh();
		} catch (err) {
			toast.error("Could not sign out");
		}
	};

	return {
		signOut,
	};
};
