import * as openpgp from 'openpgp';

export async function Encrypt(jsonData: string) {
	var encryptedString = ""
	try{
		//load Key
		const base64PublicKey = process.env.NEXT_PUBLIC_PGP_KEY;
		const publicKeyArmored = atob(String(base64PublicKey));
		const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
		const jsonString = JSON.stringify(jsonData);
		
		//encrypt data
		encryptedString = await openpgp.encrypt({
			message: await openpgp.createMessage({ text: jsonString }), 
			encryptionKeys: publicKey
		});
		
		
		
	}catch (err) {
		console.log(err);
	}
	
	return encryptedString;

}
