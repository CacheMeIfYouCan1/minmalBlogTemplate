import Image from "next/image";

import fs from 'fs';
import path from 'path';

import Navbar from '../../content/navbar/navbar'
import Footer from '../../content/footer/footer'

import ContactForm from '../../content/contact/components/contactform'
import PgpKey from '../../content/contact/components/pgpkey'

import { notFound } from 'next/navigation';



export default async function Contact() {



    return (
      <div className="flex flex-col min-h-screen text-black font-[family-name:var(--font-geist-sans)]">
		<header className="w-full">
			<Navbar/>
		</header>
		<main className="w-full flex-grow gap-8 sm:items-start">
			<ContactForm />
			<PgpKey />
		</main>
		<footer className="mt-auto gap-6 w-full ">
			<Footer/>
		</footer>
		</div>
  );
}


