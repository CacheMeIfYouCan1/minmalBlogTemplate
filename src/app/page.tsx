import Image from "next/image";

import Navbar from './content/navbar/navbar'
import HomePage from './content/homepage/page'
import Footer from './content/footer/footer'



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">

		<main className="w-full flex-grow gap-8 sm:items-start">
			<HomePage/>
		</main>

	</div>
  );
}
