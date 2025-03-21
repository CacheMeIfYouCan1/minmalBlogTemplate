"use client";

import Image from "next/image";
import Link from 'next/link';


export default function MailSent() {

	return (
		<div className="w-full flex flex-col items-center">
			<p className="max-w-156 pt-30 text-center font-bold text-4xl">
				Thank you for reaching out
			</p>

			<a
				href = "/content/homepage"
				className=" mt-5 mt-5 w-52 h-auto border-2 rounded-lg border-black text-xl text-center font-bold  hover:bg-gray-400 "
			>
			GO BACK
			</a>	 
		</div>
  );
}




