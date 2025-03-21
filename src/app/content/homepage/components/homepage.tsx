"use client";

import Image from "next/image";
import Link from 'next/link';


export default function HomePage() {


	return (
		<div className="w-full flex flex-col items-center">
			<p className="max-w-156 pt-30 text-center font-bold text-4xl">
				{process.env.NEXT_PUBLIC_HP_TITLE}
			</p>
			<p className="max-w-156 pt-5 text-center font-bold text-xl">
				{process.env.NEXT_PUBLIC_HP_SUBTITLE}
			</p>

			
			<a
				href = "/content/contact"
				className=" mt-5 mt-5 w-52 h-auto border-2 rounded-lg border-black text-xl text-center font-bold  hover:bg-gray-400 "
			>
			{process.env.NEXT_PUBLIC_HP_BUTTON}
			</a>	 
		</div>
  );
}




