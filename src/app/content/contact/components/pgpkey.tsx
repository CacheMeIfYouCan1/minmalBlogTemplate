"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Markdown from 'markdown-to-jsx';


export default function PgpKey() {

	const router = useRouter();

	const base64PublicKey = process.env.NEXT_PUBLIC_PGP_KEY!;
	const cleanBase64PublicKey = base64PublicKey.trim();
	const publicKeyArmored = atob(String(cleanBase64PublicKey));

	const beginPgp = "-----BEGIN PGP PUBLIC KEY BLOCK-----";
	const endPgp = "-----END PGP PUBLIC KEY BLOCK-----";
	const finalPublicKeyArmored = publicKeyArmored.replace("-----BEGIN PGP PUBLIC KEY BLOCK-----", "").replace("-----END PGP PUBLIC KEY BLOCK-----", "").trim();

	const toggle_pgp_mobile = () => {
		const pgp_key = document.getElementById('pgp_key_mobile');
		if(pgp_key){
			pgp_key.classList.toggle('hidden');
		}else {
			console.error('Element not found.');
		}
	};

	const toggle_pgp_desktop = () => {
		const pgp_key = document.getElementById('pgp_key_desktop');
		if(pgp_key){
			pgp_key.classList.toggle('hidden');
		}else {
			console.error('Element not found.');
		}
	};


	return (
	<div>
	<div className="hidden md:grid grid-cols-5 ">
		<button
		className="mb-20 col-start-3 mt-5  h-10 border-2 rounded-lg border-color-white    hover:bg-gray-400 cursor-pointer"
		onClick={toggle_pgp_desktop}>
			TOGGLE PGP BLOCK
		</button>		
		<div id="pgp_key_desktop" className="background-img hidden col-start-2 col-span-3 w-full border-2 rounded-lg mb-5 secondary-color">
			<p className=" text-center text-xs mx-auto pt-5 pb-5  w-full    ">{beginPgp}</p>
			<p className=" text-center text-xs mx-auto pt-5 pb-5  w-full    ">{finalPublicKeyArmored}</p>
			<p className=" text-center text-xs  mx-auto pt-5 pb-5 w-full    ">{endPgp}</p>
		</div>
		
	</div>
	<br/>
	<br/>
	<div className="md:hidden z-20 relative">
		<button
		className="mb-20 block mx-auto  mt-5 w-64 h-10 border-2 rounded-lg border-black    hover:bg-gray-400 cursor-pointer"
		onClick={toggle_pgp_mobile}>
			TOGGLE PGP BLOCK
		</button>

		<div id="pgp_key_mobile" className="hidden background-img w-full border-t-2 border-b-2 mb-20 secondary-color">
			<p className=" text-center text-xs mx-auto pt-5 pb-5  w-full    ">{beginPgp}</p>
			<p className=" text-center text-xs mx-auto pt-5 pb-5 pr-5 pl-5 w-full    break-words">{finalPublicKeyArmored}</p>
			<p className=" text-center text-xs  mx-auto pt-5 pb-5 w-full   ">{endPgp}</p>
		</div>
	</div>
	</div>
  );
}




