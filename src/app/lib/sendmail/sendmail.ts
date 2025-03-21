import nodemailer from 'nodemailer';

export async function SendMail(jsonData: string) {

	try {
		//create transporter
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST!,
			port: Number(process.env.SMTP_PORT),
			auth: {
				user: process.env.SMTP_USER!,
				pass: process.env.SMTP_PASS!,
			}
		});
		//set content
		const content = {
			from: process.env.MAIL_FROM!,
			to: process.env.MAIL_TO!,
			subject: process.env.MAIL_SUBJECT!,
			text: jsonData,
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8',
			},
		};
		//send mail
		transporter.sendMail(content, (error, info) => {
			if (error) {
				console.log('Error:', error);
			} else {
				console.log('Email sent:', info.response);
			}
		});

	  
	}catch (err) {
		console.log(err);
	}

		  
	return jsonData;

}

