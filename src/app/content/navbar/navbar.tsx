"use client"; 

import React from 'react';
import Title from '../../content/navbar/components/title';
import Logo from '../../content/navbar/components/logo';
import Navigation from '../../content/navbar/components/navigation';



const Navbar: React.FC = () => {
	
	
  return (
  <>	
	<div className="fixed z-25 primary-color grid grid-cols-3 w-full h-16 shadow-2xl border-b-2 border-gray-500">
		<div className="h-full pt-1 pl-2 w-12 col-start-1 col-span-1 flex items-center justify-center">
			<Logo/>
		</div>
		<div className="col-start-2 col-span-1 flex items-center justify-center">

			<Title/>
		</div>
		<div>
			<Navigation/>
		</div>
	</div>	
  </>
  );
};

export default Navbar;
