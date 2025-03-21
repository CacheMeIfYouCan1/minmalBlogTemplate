import Image from "next/image";

import fs from 'fs';
import path from 'path';

import Navbar from '../../content/navbar/navbar'
import Footer from '../../content/footer/footer'
import Banner from '../../content//blog/components/banner'
import Cards from '../../content//blog/components/cards'

import { notFound } from 'next/navigation';


export default async function Blog(props: { searchParams: Promise<{ search?: string, sort?: string}> }  ) {
    const searchParams = await props.searchParams;
	let searchQuery: string = searchParams?.search || "";
	let sortQuery: string = searchParams?.sort || "";

    const postsDirectory = path.join(process.cwd(), 'public', 'posts');
    const postDirs = fs.readdirSync(postsDirectory);

    const postsRaw = postDirs.map((post) => {
		const cardFilePath = path.join(postsDirectory, post, 'card', 'card.md');
		const fileContent = fs.readFileSync(cardFilePath, 'utf-8');

		return {
			  name: post,
			  content: fileContent,

			};
	});

	let posts = [];
	
	if (searchQuery) {
		posts = postsRaw.filter(post => post.content.includes(searchQuery));
		if (sortQuery !== "ASCENDING") {
		posts.reverse();
		
		}
		
	}	else {
		posts = postsRaw;
		if (sortQuery !== "ASCENDING") {
		posts.reverse();
		}
	}

    return (
      <div className="flex flex-col min-h-screen text-black font-[family-name:var(--font-geist-sans)]">
		<header className="w-full">
			<Navbar/>
		</header>
		<main className="w-full flex-grow gap-8 sm:items-start">

			<Banner posts={posts} sortedBy={sortQuery}/>
			<Cards posts={posts} />
		</main>
		<footer className="gap-6 w-full">
			<Footer/> 
		</footer>
	</div>
  );
}


