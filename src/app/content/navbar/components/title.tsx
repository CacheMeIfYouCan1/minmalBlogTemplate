"use client"; 

import React from 'react';


const Title: React.FC = () => {

	
  return (
  <>
	<h1 className="hidden md:block text-4xl">{process.env.NEXT_PUBLIC_NB_TITLE}</h1>
	<h1 className="block md:hidden text-m">{process.env.NEXT_PUBLIC_NB_TITLE}</h1>


  </>
  );
};

export default Title;
