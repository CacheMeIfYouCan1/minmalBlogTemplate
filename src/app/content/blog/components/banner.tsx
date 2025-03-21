"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Markdown from 'markdown-to-jsx';

export default function banner({
				  posts,
				  sortedBy,
				}: {
				  posts: Array<{ name: string; content: string }>;
				  sortedBy: string;
				}) {
	const [sort, setSort] = useState(sortedBy);
	const [search, setSearch] = useState('');

	const sortBy = () => {
		const newSort = sortedBy === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
		setSort(newSort); 

		window.location.href = `/content/blog?search=${search}&sort=${newSort}`;
	};
	const handleSearch = async (event: any) => {
		event.preventDefault();
		window.location.href = `/content/blog?search=${search}&sort=${sort}`;
	};

	return (
	<div className=" w-full  flex flex-col items-center secondary-color border-b-2 border-gray-500 h-128  background-img pt-10 pb-10">
		<p className="max-w-156 pt-10 text-center italic font-bold text-4xl text-white">
			{process.env.NEXT_PUBLIC_BLOG_TITLE}
		</p>
		<p className="pt-10 pb-5 italic font-light text-gray-600 text-xl" >
			{process.env.NEXT_PUBLIC_BLOG_SUBTITLE}
		</p>
		<form className="flex flex-col items-center" onSubmit={handleSearch}>
			<input 
				className="max-w-128 z-20 relative px-4 py-2 mt-4 border-2 border-gray-300 rounded-lg text-white"
				type="text" 
				name="search" 
				placeholder="Search content..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type = "submit"
				className="z-20 relative mt-5 w-32 h-10 border-2 rounded-lg border-color-white text-white hover:bg-gray-400 cursor-pointer" 
			>
			SEARCH
			</button>
		</form>

						
		<button
			onClick={sortBy}
			className="z-20 relative mt-5 w-64 h-10 border-2 rounded-lg border-color-white text-white hover:bg-gray-400 cursor-pointer" 
		>
		SORT BY: {sort}
		</button>
	</div>
  );
}




