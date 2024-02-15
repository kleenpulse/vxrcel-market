"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

const ImageSlider = ({ urls, linkId }: { urls: string[]; linkId?: string }) => {
	console.log(urls);
	const router = useRouter();
	const [swiper, setSwiper] = useState<null | SwiperType>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [slideConfig, setSlideConfig] = useState({
		isBeginning: true,
		isEnd: activeIndex === (urls.length ?? 0) - 1,
	});
	useEffect(() => {
		swiper?.on("slideChange", ({ activeIndex }) => {
			setActiveIndex(activeIndex);
			setSlideConfig({
				isBeginning: activeIndex === 0,
				isEnd: activeIndex === (urls.length ?? 0) - 1,
			});
		});
	}, [swiper, urls]);

	const activeStyles =
		"active:scale-[0.97] grid  hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white dark:bg-primary/30 border-zinc-300 dark:border-blue-600 backdrop-blur-xl";
	const inActiveStyles = "hidden text-gray-300 dark:text-gray-600";

	return (
		<div className="group relative bg-zinc-100 dark:bg-zinc-100/10 aspect-square overflow-hidden rounded-xl  ">
			<button
				onClick={(e) => {
					e.preventDefault();

					swiper?.slidePrev();
				}}
				className={cn(
					activeStyles,
					"left-3  absolute z-50 opacity-100 group-hover:opacity-100 transition ",
					slideConfig.isBeginning
						? inActiveStyles
						: "hover:bg-blue-300 text-blue-800 dark:text-cyan-400"
				)}
			>
				<ChevronLeft aria-label="previous image" className="h-4 w-4 " />
			</button>
			<button
				onClick={(e) => {
					e.preventDefault();

					swiper?.slideNext();
				}}
				className={cn(
					activeStyles,
					"right-3   absolute z-50 opacity-100 group-hover:opacity-100 transition",
					slideConfig.isEnd
						? inActiveStyles
						: "hover:bg-blue-300 text-blue-800 dark:text-cyan-400"
				)}
			>
				<ChevronRight aria-label="next image" className="h-4 w-4 " />
			</button>

			<div
				className="w-full h-full "
				onClick={linkId ? () => router.push(`/product/${linkId}`) : undefined}
			>
				<Swiper
					onSwiper={(swiper) => setSwiper(swiper)}
					spaceBetween={50}
					slidesPerView={1}
					modules={[Pagination]}
					className="h-full w-full"
					pagination={{
						renderBullet: (_, clasName) => {
							return `<span class='rounded-full transition ${clasName}'></span>`;
						},
					}}
				>
					{urls.map((url, i) => (
						<SwiperSlide
							key={`product-image-${url}-${i}`}
							className="-z-10 relative h-full w-full "
						>
							<Image
								fill
								loading="eager"
								src={url}
								alt="product image"
								className="h-full w-full object-cover object-center "
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default ImageSlider;
