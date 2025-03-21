# Lightweight Blog Template
<center>
This documentation is made for Debian based systems, also it looks best on a wide screen
</center>



## Table of Contents

1. [Introduction](#introduction)
2. [Setup](#setup)
3. [Documentation](#documentation)
   1. [Structure](#structure)
   2. [Base Components](#base)	
   3. [UI/UX](#ui/ux)
   4. [Logic](#logic)
   5. [Posts](#posts)
4. [Customization](#customization)
5. [License](#license)


-----------------------------------------------------------------------------------------------

## Introduction:


<br>

***This Blog Template was developed based on my personal portfolio, with an emphasis on keeping it lightweight.
Many existing solutions are unnecessarily complex, offering more features than required for a simple blog setup.
This project focuses on the essentials. Additionally, a content management system is planned to be implemented in the future.***

<br>
<br>

-----------------------------------------------------------------------------------------------

## Setup:

-----------------------------------------------------------------------------------------------

## Documentation:

### Structure

<pre>
<code>

blog/
|- README.md
|- next.config.ts
|- postcss.config.mjs
|- .env.local
|- next-env.d.ts
|- package.json
|- package-lock.json
|- tsconfig.json
|- .next/
| |- (...)
|- node_modules/
| |- (...)
|- public/
| |- posts/
| | |\<id\>
| | |- card/ 
| | | |- card.md
| | | |- pic.jpeg
| | |- postPage
| | | |- postPage.md
| |- icon.png
| |- (...)
|- src/
| |- app/
| | |- api/
| | | |- contact/
| | | | |- route.ts
| | |- lib/ 
| | | |- encrypt 
| | | | |- encrypt.ts 
| | | |- sendmail 
| | | | |- sendmail.ts
| | |- content/
| | | |- blog/ 
| | | | |- post/ 
| | | | | |- page.tsx
| | | | |- components/
| | | | | |- banner.tsx
| | | | | |- cards.tsx
| | | |- contact/ 
| | | | |- page.tsx
| | | | |- components/
| | | | | |- contactform.tsx
| | | | | |- pgpkey.tsx
| | | |- homepage/  
| | | | |- page.tsx
| | | | |- components/
| | | | | |- homepage.tsx
| | | |- mailsent/   
| | | | |- page.tsx
| | | | |- components/
| | | | | |- mailsent.tsx
| | | |- footer/
| | | | |-footer.tsx
| | | | |- components/
| | | |- navbar/  
| | | | |- navbar.tsx 
| | | | |- components/
| | | | | |- logo.tsx
| | | | | |- title.tsx|
| | |- favicon.ico 
| | |- globals.css 
| | |- layout.tsx 
| | |- page.tsx 


</code>
</pre>

------------------------------------------------------------------------------------------------

### Base Components

#### /next.config.ts:
Next.js configuration file. Contains configurations for the Next.js application 

#### /postcss.config.mjs:
PostCSS configuration file. Contains configurations of CSS processing

#### /.env.local:
envoronment configuration file. Contains SMTP and PGP-Key.

**important note: PGP-Key must be stored in base54 encoded form!** 

#### /package.json:
Package descriptor file. Contains metadata, scripts and dependencies

#### /package-lock.json:
Contains the versions of dependencies installed in the node_modules. Necessary to create a consistent environment across isntallations

#### /next-env.d.ts:
Contains configuration for TypeScript compiler

#### node.modules/:
Contains all installed dependencies for the project, as specified in package.json 

#### .next/:
Build directory, if there are issues with the build, deleting this directory might help

------------------------------------------------------------------------------------------------

### UI/UX

The User Interface is fully contained in app/src/content/. Each page as well as the footer and the header have their own directory,
All pages, except the footer and the navbar use a page.tsx to display the components of the page as well provide any functionality
which cannot be implemented in client components.

The footer and the navbar use footer.tsx and navbar.tsx to display the components. This is because they are not pages, but are imported as elements,
which are included in all pages in the header and footer area.

the client components of the actual pages are stored in /\<page\>/components: 
<br>

#### src/app/content/blog/components/cards.tsx:

<pre>
<code>
	export default function Cards({
		  posts,
		}: {
		  posts: Array<{ name: string; content: string }>;
		})
</code>
</pre>
<br>
<br>

This builds the list, containing all cards of the blogposts. This component takes the list of cards which are to displayed as an array and iterates through
them, loading the content from /public/posts/\<id\>/card/.

There are two versions, one is displayed on smaller and the other is displayed on bigger screens to ensure mobile friendlyness. Tailwinds utility classes are
used for this.

Each card is a link element which builds an URL with the post id and passes this as a parameter when navigating to src/app/content/blog/posts/page.tsx,
where the content of the post with the corresponding id is loaded and presented.


#### src/app/content/blog/components/banner.tsx:

<pre>
<code>
	export default function banner({
		  posts,
		  sortedBy,
		}: {
		  posts: Array<{ name: string; content: string }>;
		  sortedBy: string;
		}) 
</code>
</pre>

<br>
<br>
this is the banner displayd on the blog page. It contains the Title, a subtitle, the search field and a sorting button. We also have two states
which we use in this ccomponent:
<br>
<br>


<pre>
<code>
	const [sort, setSort] = useState(sortedBy);
	const [search, setSearch] = useState('');
</code>
</pre>

<br><br>

The sortBy function is triggered on click of the sorting button. The parameter is set to ASCENDING if any other
parameter is passed than DESCENDING. Then a URL with the previous search and the current sort is created.
<br>
<br>
Please note that a ternary operator is used instead of an if/else. This is done because it provides a convenient way to toggle a value,
which can still be declared as a const. 
<br>
<br>


<pre>
<code>
	const sortBy = () => {
		const newSort = sortedBy === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
		setSort(newSort); 

		window.location.href = `/content/blog?search=${search}&sort=${newSort}`;
	};
</code>
</pre>

<br>
<br>

The handleSearch function works by routing to the blog page and transferring parameters through the URL, which are used to filter the post-card-list
on reload.The search parameter is set on change of the input value. The submission of this form triggers handleSearch(), which uses the value to
construct a new URL.
<br>
<br>

<pre>
<code>
	const handleSearch = async (event: any) => {
		event.preventDefault();
		window.location.href = `/content/blog?search=${search}&sort=${sort}`;
	};
</code>
</pre>

<br>
<br>

**Important note: if the clients want to sort and search, they need to sort first, then search the sorted results, as the sorting resets the search.**





#### src/app/content/contact/components/contactform.tsx:
contains the contactform.
<br>
<br>
we use three states here, which are all set on change of the corresponding form elements. 
<br>
<br>

<pre>
<code>
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
</code>
</pre>

<br>
<br>


The input form, as well as the text above it, are presented in two different versions. one version is displayed on bigger, the other version on smaller screens
This is achieved using tailwinds utility classes.

<br>
<br>

on submission of the form, handleSubmit gets executed, which makes a POST request, sending the name, email and the message of the user to the backend in json format, where it
gets encrypted and the mail gets send. If the response is positive, the user is redirected to /mailsent.
<br>
<br>


<pre>
<code>
	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const response = await fetch('/api/contact', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ name, email, message }),
		});

		if (response.ok) {
		  router.push('/content/mailsent');
		} else {
		  alert(response.status);
		}
	};
</code>
</pre>

<br>
<br>

**inportant note: if the response is not 200, the status of the response gets alerted. This is practical for troubleshooting the SMTP setup, but a proper error message
would look better for the client, in case of issues with sending the contact mail.**


<br>
<br>

#### src/app/content/contact/components/pgpkey.tsx:
component that contains the button, as well as the blog with the pgp key. The pgp key is stored in .env.local and should only be set there. Again we have a
mobile and a desktop version.

<br>
<br>
The PGP-Key needs to get trimmed, decoded, and is stripped of the begin and end block, this is for easier styling. 
<br>
<br>

<pre>
	<code>
	const base64PublicKey = process.env.NEXT_PUBLIC_PGP_KEY!;
	const cleanBase64PublicKey = base64PublicKey.trim();
	const publicKeyArmored = atob(String(cleanBase64PublicKey));

	const beginPgp = "-----BEGIN PGP PUBLIC KEY BLOCK-----";
	const endPgp = "-----END PGP PUBLIC KEY BLOCK-----";
	const finalPublicKeyArmored = publicKeyArmored.replace("-----BEGIN PGP PUBLIC KEY BLOCK-----", "").replace("-----END PGP PUBLIC KEY BLOCK-----", "").trim();
</code>
</pre>

<br>
<br>

The button triggers the respective function, either toggle_pgp_desktop() or toggle_pgp_mobileThe functions toggle the hidden attribute of the corresponding
element. Which reveals a block with a public pgp Key.
<br>
<br>

<pre>
<code>
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

</code>
</pre>

<br>
<br>

important note: the PGP Key is stripped off the BEGIN and END block. Instead these blocks are added manually, for more flexible styling

#### src/app/content/homepage/components/homepage.tsx:
this is the home page of the blog. Currently a button is displayed which links to the contact form and a little introduction.

#### src/app/content/mailsent/components/mailsent.tsx:
redirect page for successfully sent mails. The user is presented with a button which links to the home page.

#### src/app/content/navbar/components/logo.tsx:
This is the logo in the top left. The logo is sourced from /public/icon.png. This script should be used to style the logo.

#### src/app/content/navbar/components/title.tsx:
Contains the title.

#### src/app/content/navbar/components/navigation.tsx:
The navigation is managed here. There are two different versions contained, one is used for smaller displays and the other is used for larger displays.
This is done through tailwinds utility class 'md:'. The version which is displayed on the bigger screen places the navigation links in a row, while the
version which is displayed on smaller screens provides a simple button, which on click expands the navigation table containing the links.

<br>
<br>
Toggling the navigation list works as following:

<br>
<br>

<pre>
<code>
	const toggle_dropdown = () => {
		
		const list = document.getElementById('dropdown_list');

		if(list){
			list.classList.toggle('hidden');
		}else {
			console.error('Element with id "dropdown_list" not found.');
		}
	};
</code>
</pre>

<br>
<br>

**important note: the list of links is not dynamically generated. If another component is added, another element must be added, too.**




------------------------------------------------------------------------------------------------

### Logic


#### src/app/api:
This directory is used for all API routes. API routes should only be implemented within this directory.

#### src/app/api/contact/route.ts:
Contains the route used by the contact form

<br>
<br>

<pre>
<code>
	export async function POST(request: NextRequest) {
		const { name, email, message } = await request.json();

	/.../

	}
</code>
</pre>

<br>
<br>
takes a POST request which needs to contain following strings in json format:

1. name
2. email 
3. message

If any of these is missing, status 400 is returned. If all are present the strings get merged in json format, encrypted
and send per mail. If an error occurs, returns status 500. This is ensured through a try/catch block in combination with an if/else statement:
<br>
<br>

<pre>
<code>
	try{
		if (!name || !email || !message) {
			return new Response("Missing fields", { status: 400 });
		}  else {

		/.../

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
</code>
</pre>


<br>
<br>

if the name, email and message are properly passed and formated, the Logic makes sure its a JSON string, encrypts and sends the encrypted blob text
through mail:

<br>
<br>

<pre>
<code>
		const responseData = { name, email, message };
		const encryptedData = await Encrypt(JSON.stringify(responseData));
		await SendMail(encryptedData);
</code>
</pre>

<br>
<br>


**Important note: its necessary to perform the encryption as well as the email transfer asynchronous**



#### src/app/lib/:
Server side logic, which is not accessed directly by the UI, but rather is accessed through The API is stored here. Any additional
functionalities which fall in this category should also be stored here.

Then name convention is /lib/componentDir/componentScript.ts

#### src/app/lib/encrypt/encrypt.ts:
<br>
<br>

<pre>
<code>
export async function Encrypt(jsonData: string) {
	var encryptedString = ""
	try{
		/ ... /
	}catch (err) {
		console.log(err);
	}
	/ ... /
}
</code>
</pre>

<br>
<br>
This component takes a string as an argument, loads the pgp key, encrypts it using PGP and return the encrypted string. The public PGP-KEy
is read from .env.local file, decoded and read as a public pgp key. The jsonData is casted into a json String and encrypted using the previously
read PGP-Key. encryptedString is declared as an empty string, to ensure the function has a proper return, even if ehere is an error during encryption.
<br><br>
The key is loaded as a base64 string, which needs to get decoded, and read through openpgpjs as an armored key. Afterwards the passed jsonData is casted into a jsonString.
This is a failsafe, if a wrong datatype is passed.
<br>
<br>

<pre>
<code>
	const base64PublicKey = process.env.NEXT_PUBLIC_PGP_KEY;
	const publicKeyArmored = atob(String(base64PublicKey));
	const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
	const jsonString = JSON.stringify(jsonData);
	

</code>
</pre>

<br>
<br>
The encryption is done using openpgp.js, please note that this must happen asynchronous.
<br>
<br>


<pre>
<code>
	//encrypt data
	encryptedString = await openpgp.encrypt({
		message: await openpgp.createMessage({ text: jsonString }), 
		encryptionKeys: publicKey
	});
</code>
</pre>

<br>
<br>


#### src/app/lib/sendmail/sendmail.ts:
<br>
<br>

<pre>
<code>
	export async function SendMail(jsonData: string) {

		try {
		/ ... /
		  
		}catch (err) {
			console.log(err);
		}  
		return jsonData;

	}

</code>
</pre>


<br>
<br>


Exports SendMail(), returns jsonData and takes one argument: jsonData which needs to be a string. Nodemailer is used for using SMTP.
The SMTP configuration is read from .env.local.
<br>
<br>
The process of sending the mail contains three steps:
<br>
<br>
####1. creating a transporter:

The transporter is created using the SMTP host, port and the auth data. All of these should be stored in .env.local and are accessed through.
All values, except the port, need to be assigned using a non-null assertion operator. The port value should be casted into a Number.

If other values are needed, view the nodemailer documentation.

<br>
<br>

<pre>
<code>
	const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST!,
			port: Number(process.env.SMTP_PORT),
			auth: {
				user: process.env.SMTP_USER!,
				pass: process.env.SMTP_PASS!,
			}
		});
</code>
</pre>

<br>
<br>


####2. setting the content:
All variables, except the text, are taken from the environmental variables in .env.local. They should be assigned using a non-null assertion operator.
The text value is the jsonData variable passed. 

<br>
<br>

<pre>
<code>
	const content = {
			from: process.env.MAIL_FROM!,
			to: process.env.MAIL_TO!,
			subject: process.env.MAIL_SUBJECT!,
			text: jsonData,
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8',
			},
		};
</code>
</pre>

<br>
<br>
Please not that following headers should be set, to avoid errors when displaying the encrypted PGP string:
<br>
<br>

<pre>
<code>
headers: {
	'Content-Type': 'text/plain; charset=UTF-8',
},
</code>
</pre>

<br>
<br>

####3. Sending the Mail

<br>
<br>

<pre>
<code>
	transporter.sendMail(content, (error, info) => {
			if (error) {
				console.log('Error:', error);
			} else {
				console.log('Email sent:', info.response);
			}
		});
</code>
</pre>

<br>
<br>

The mail gets send, using the previously created transporter with the previously set content and the response gets logged to the console.
Please keep in mind that logging the response may be a security concern, since the information of the SMTP provider could be gathered.

It is very helpful to log the response during the development and configuration of the application, but it should be considered to remove this function
before deploying the application. 

------------------------------------------------------------------------------------------------

### Posts

#### public/:
Contains all publicly available resources like pictures and posts. No sensitive data should be stored here.

#### public/posts:
The posts are stored here as directories and **must be named numerical**. The name of the directoy serves as
the ID of the post. The posts contain:

#### public/posts/card:
Here are the cards stored, which are displayed on the Blogpage. The content of the card must be saved as **card.md**.
When sorting, they are sorted by their ID. When searching they are searched by the content of card.md. Markdown is rendered,
for further explanation of Markdown usage, please view the first blogpost within the template.

#### public/posts/postPage:
Here is the actual Post stored. The post content needs to be stored as **postPage.md**. The content of the page is not searched by the
search function. If pictures are added in the post, they can be also stored in /postPage. Markdown is rendered,
for further explanation of Markdown usage, please view the first blogpost within the template.



-----------------------------------------------------------------------------------------------

## Customization:

A lot of the colors as well as the texts used can be customized without changing the source code of the Blog, since they are loaded
from .env.local. The content  of the blog posts can also be altered without changing the source code, since it is dynamically loaded from
/public/posts/. 

### Overview .env.local:

Most of the texts on the blog pages can be set in the .env.local file as following:
<br>
<br>
<br>



#### Navbar
<br>NEXT_PUBLIC_NB_TITLE -> Title which is used in /content/navbar/title.tsx, displayed in the center of the topbar
<br>
<br>

#### Home page
<br>NEXT_PUBLIC_HP_TITLE -> Title, which is used in /content/homepage/components/homepage.tsx, first title on the main page
<br>NEXT_PUBLIC_HP_SUBTITLE -> Subtitle, which is used in /content/homepage/components/homepage.tsx, second title on the main page
<br>NEXT_PUBLIC_HP_BUTTON -> Button text which is used in /content/homepage/components/homepage.tsx, contact button
<br>
<br>
#### Blog page

<br>NEXT_PUBLIC_BLOG_TITLE -> Title used in /content/blog/components/banner.tsx, main title of the blog page
<br>NEXT_PUBLIC_BLOG_SUBTITLE -> Subtitle used in /content/blog/components/banner.tsx, subtitle of the blog page
<br>
<br>
#### Contact page

<br>NEXT_PUBLIC_CONTACT_TITLE -> Title used in /content/contact/components/contactform.tsx main title of the contact page
<br>NEXT_PUBLIC_CONTACT_TEXT -> Text used in /content/contact/components/contactform.tsx main title of the contact page
<br>
<br>
<br>NEXT_PUBLIC_PGP_KEY -> public pgp key, which is used in multiple components. This needs to be encoded in base64
<br>
<br>
<br>SMTP_HOST -> this is your SMTP server
<br>SMTP_PORT -> This is your SMTP port
<br>SMTP_USER -> SMTP username
<br>SMTP_PASS -> SMTP password
<br>
<br>
<br>MAIL_FROM -> the sender of the email from the contact form
<br>MAIL_TO -> the receiver of the contact mail
<br>MAIL_SUBJECT -> subject of the generated email



### Overview src/app/globals.css:

#### colors:

The general colors are set here. The top as well as the bottom bar are using the primary color, while the banners and the pgp block use the secondary color.
The linear gradient is displayed whenever no color is set. The foreground is ised as a main text color.
<br>
<br>

<pre>
<code>
:root {
  --background: linear-gradient( #bbbbbb, #808b96);

}


body {
 
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
 
}

.primary-color {
	background-color: #78866B;
}

.secondary-color {
	background-color: #9C9A6D;
}
</code>
</pre>

<br>
<br>

#### markdown:

The markdown rendering is generally done using markdown-to-jsx, but some elements are customized.
<br>
<br>
One important customization are the tables. They are differently rendered on small screens via a media query.
The decision how to render tables on smaller devices was not changed a couple times. Some other markdown-able blogs use
a scrollable element, but when creating this blog the decision was made to break with this pattern, because the usage suffers when a scrollable
element is introduced on the UI on a small screen.
<br>
Currently the table elements are stacked on smaller devices so
<br>
1 2 3
<br>
becomes
<br>
1

2

3
<br>
this is still not optimal, but at least ensures a smooth scrolling experience when moving across the blogpost.
<br><br>


<pre>
<code>
/*Markdown rendering*/

@media (max-width: 768px) {
  .markdown-content table,
  .markdown-content table th,
  .markdown-content table td {
    display: block;
    width: 100%;
    border: none;

    font-size: 12px;

  }
}

.markdown-content table {
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  border-collapse: collapse;
  font-size:12px;
  margin-bottom: 20;

}

.markdown-content table th,
.markdown-content table td {
  padding: 10px;
  border: 1px solid #000000;
  
}
</code>
</pre>


<br>

<br>

Similar customization is applied to the codeblocks, the following styling ensures line breaks instead of overlow.
This is also made to create a flawless scrolling experience. While this is not optimal, it provides a better feeling than
codeblocks which overflow and can be scrolled to the right.
<br>
<br>


<pre>
<code>
.markdown-content {
  word-wrap: break-word;
}

.markdown-content pre {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  white-space: pre-wrap;         
  word-wrap: break-word;   
}

.markdown-content code{
  background-color: #666666; 
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 30px;
  display:block; 		
  border-radius: 4px; 
  font-family: 'Courier New', Courier, monospace; 
  font-size: 0.9rem; 
}
</code>
</pre>

<br>
<br>

The rest of the markdown rendering is styled as follwoing:

<br>
<br>


<pre>
<code>
.markdown-content h1 {
  font-size: 50px;
  font-style: bold;
  text-align: center;
  padding-bottom: 50px;
  padding-top: 50px;
}

.markdown-content h2 {
  font-size: 35px;	
  font-style: bold;
  padding-bottom: 10px;
  padding-top: 35px;
  text-align:center;
  text-decoration: underline;
}

.markdown-content h3 {
  font-size: 30px;
  font-style: bold;
  padding-bottom: 10px;
  padding-top: 25px;
  text-align: center;

}

.markdown-content h4 {
  font-size: 25px;
  font-style: bold;
  padding-bottom: 10px;
  padding-top: 20px;
}

.markdown-content h5 {
  font-size: 20px;
  font-style: bold;
  padding-bottom: 10px;
  padding-top: 25px;
}



.markdown-content ol {
  list-style-type: decimal;
  padding-left: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: block
}

.markdown-content li {
  margin-bottom: 8px;
}

.markdown-content hr {
  
  margin-bottom: 50px;
  margin-top: 50px;

}
</code>
</pre>

<br>
<br>


### Further customization:

All further customization needs to be individually developed. Since it is kept fairly minimalistic, the codebase is rather small and can be overlooked
very well. There are still a few considerations to keep in mind when implementing new features.

#### UI/UX:

Since the pages are unique, all of them have their individual directory, containing a components/ directory, where the components are stored
in context of their usage. If new features are introduced, which will have similar functionality as the existing ones, it would be advised to
create a centralized directory for components which are used across multiple pages, for example searching or sorting.

This will ensure that the code stays maintanable and can easily be understood.

#### Server functionality:

api routes and the /lib/ directory are used to contain server side logic. It is advised to not mix them with the UI elements, to preserve readability
of the blog. Also api routes should be seperated from the files in /lib, since the api routes are primarily accessed through their respected directory
by NexJS per default.
<br>
<br>

####Feel free to contact me through the contact panel, if you need assistance, support or need custom features developed


-----------------------------------------------------------------------------------------------

## License:


This work is released under CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. You can freely use, modify, and distribute the work, even for commercial purposes, without asking for permission.









