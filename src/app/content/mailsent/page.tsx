import Image from "next/image";


import Navbar from '../../content/navbar/navbar'
import Footer from '../../content/footer/footer'
import MailSent from '../../content/mailsent/components/mailsent'

import { notFound } from 'next/navigation';


export default async function Home() {
   
    return (
      <div className="flex flex-col min-h-screen text-black font-[family-name:var(--font-geist-sans)]">
		<header className="w-full">
			<Navbar/>
		</header>
		<main className="w-full flex-grow gap-8 sm:items-start background-img">
			<MailSent />
		</main>
		<footer className="mt-auto gap-6 w-full">
			<Footer/>
		</footer>
		</div>
  );
}


