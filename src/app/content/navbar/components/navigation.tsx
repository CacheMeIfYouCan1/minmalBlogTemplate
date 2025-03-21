"use client"; 

import React from 'react';
import Link from 'next/link'

const Navigation: React.FC = () => {

	const toggle_dropdown = () => {
		
		const list = document.getElementById('dropdown_list');

		if(list){
			list.classList.toggle('hidden');
		}else {
			console.error('Element with id "dropdown_list" not found.');
		}
	};



	
  return (
  <div className="">
		{/* Desktop */}
		<nav className="hidden md:grid col-start-3 col-span-2 place-content-end justify-content-end h-16 w-full">
		
		 {/* Navigation */}
		  <ul className= "flex flex-row-reverse ">
			<li className="p-3 " ><Link className="hover:text-gray-400" href="/content/contact" >CONTACT</Link></li>
			<li className="p-3 " ><Link className="hover:text-gray-400" href="/content/blog?search=&sort=ASCENDING" >BLOG</Link></li>
			<li className="p-3 " ><Link className="hover:text-gray-400" href="/" >HOME</Link></li>

		  </ul>
		</nav>
		
		{/* Mobile */}

			<div  className="flex flex-row-reverse space-x-reverse pb-3 pr-3 col-span-1 col-start-3" >
				<button
					className="mt-4 md:hidden items-center justify-center w-8 h-6"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
					onClick={toggle_dropdown}
				>
					<div className="grid grid-rows-3 gap-1 w-full h-full" >
						<div className="row-span-1 row-start-1 bg-gray-300 h-full w-full" ></div>
						<div className="row-span-1 row-start-2 bg-gray-300 h-full w-full" ></div>
						<div className="row-span-1 row-start-3 bg-gray-300 h-full w-full" ></div>
					</div>							
				</button>
			</div>
			{/* Navigation */}
			<nav className="fixed md:hidden left-0 w-full">		
				<ul className= "z-25 fixed hidden grid grid-rows-3 border-2 border-gray-500 w-full" id="dropdown_list">
					<li className="row-span-1 row-start-1 flex items-center border-gray-500 border-b-2 justify-center primary-color h-16 w-full" >
						<Link className="w-full h-full flex items-center justify-center  hover:text-gray-400" href="/" onClick={toggle_dropdown} >HOME</Link>
					</li>
					<li className="row-span-1 row-start-2 flex items-center border-gray-500 border-b-2 justify-center primary-color h-16 w-full" >
						<Link className="w-full h-full flex items-center justify-center hover:text-gray-400" href="/content/blog?search=&sort=ASCENDING" onClick={toggle_dropdown} >BLOG</Link>
					</li>
					<li className="row-span-1 row-start-3 flex items-center border-gray-500 border-b-2 justify-center primary-color h-16 w-full" >
						<Link className="w-full h-full flex items-center justify-center hover:text-gray-400" href="/content/contact" onClick={toggle_dropdown} >CONTACT</Link>
					</li>
				</ul>
			</nav>
  </div>
  );
};

export default Navigation;
