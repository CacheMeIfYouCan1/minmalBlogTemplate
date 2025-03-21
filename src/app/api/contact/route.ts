import { NextRequest } from 'next/server';
import { Encrypt } from '../../lib/encrypt/encrypt'
import { SendMail } from '../../lib/sendmail/sendmail'

export async function POST(request: NextRequest) {
	const { name, email, message } = await request.json();

	try{
		//check if the request is complete
		if (!name || !email || !message) {
			return new Response("Missing fields", { status: 400 });
		}  else {

		// merge, encrypt, send
		const responseData = { name, email, message };
		const encryptedData = await Encrypt(JSON.stringify(responseData));
		await SendMail(encryptedData);

		return new Response(encryptedData, { 
			status: 200, 
			headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		return new Response('something went wrong!', { 
			status: 500, 
			headers: { 'Content-Type': 'application/json' }
			});
	}
	
}
