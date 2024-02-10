"use client";

import { useThemeContext } from "@/context/ThemeCtx";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";

const ThemeButtons = () => {
	const { theme, setTheme } = useThemeContext();
	return (
		<div className="flex items-center border border-gray-300 dark:border-blue-600 p-[2px] rounded-full w-[115px] justify-center">
			<button
				type="button"
				className={cn(
					"w-[33px] h-[33px] p-2 flex items-center justify-center",
					theme === "light" && "bg-black/10  rounded-full "
				)}
				onClick={() => setTheme("light")}
			>
				<Sun className="text-header dark:text-gray-300" />
			</button>

			<button
				type="button"
				className={cn(
					"w-[33px] h-[33px]  p-2 flex items-center justify-center",
					theme === "dark" &&
						"bg-black/10 dark:text-[#40c6ff]   rounded-full dark:bg-blue-600/50"
				)}
				onClick={() => setTheme("dark")}
			>
				<Moon className="text-header " />
			</button>
			<button
				type="button"
				className={cn(
					"w-[33px] h-[33px] p-2 flex items-center justify-center",
					theme === "system" &&
						"bg-black/10 dark:text-[#40c6ff] rounded-full dark:bg-blue-600/40"
				)}
				onClick={() => setTheme("system")}
			>
				<Monitor className="text-header " />
			</button>
		</div>
	);
};

export default ThemeButtons;
