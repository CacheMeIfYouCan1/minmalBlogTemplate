import Image from "next/image";

import fs from 'fs';
import path from 'path';

import Navbar from '../../../content/navbar/navbar'
import Footer from '../../../content/footer/footer'

import Markdown from 'markdown-to-jsx';


import { notFound } from 'next/navigation';




export default async function Post(props: { searchParams: Promise<{ id?: string }> }) {
    const searchParams = await props.searchParams;

    const idQuery: string = await searchParams?.id || "";

    const postsDirectory = path.join(process.cwd(), 'public', 'posts');
    const postDirs = fs.readdirSync(postsDirectory);

	const pageFilePath = path.join(postsDirectory, idQuery, 'postPage', 'postPage.md');
	const fileContent = fs.readFileSync(pageFilePath, 'utf-8');

	

	console.log(fileContent);
    return (
      <div className="flex flex-col min-h-screen text-black font-[family-name:var(--font-geist-sans)]">
		<header className="w-full">
			<Navbar/>
		</header>
		<main className="max-w flex-grow gap-8 sm:items-start">
			<div className="hidden md:grid grid-cols-5 pb-100">
				<div className="markdown-content col-start-2 col-span-3">
					<Markdown>{fileContent}</Markdown>
				</div>		
			</div>
			
			<div className="md:hidden p-2 pb-50">
				<div className="markdown-content">
					<Markdown>{fileContent}</Markdown>
				</div>		
			</div>
			
		{/*
			<div className="hidden md:grid grid-cols-5 ">
				<div className="col-start-2 mt-5 mb-5 col-span-3 bg-purple-100 h-auto" dangerouslySetInnerHTML={{ __html: fileContent}}/>

			</div>
			
			<div className="md:hidden ">
				<div className="m-5 bg-purple-100 h-auto" dangerouslySetInnerHTML={{ __html: fileContent}}/>
			</div>
		*/}
		</main>
		<footer className="mt-auto gap-6 w-full">
			<Footer/>
		</footer>
		</div>
  );
}


