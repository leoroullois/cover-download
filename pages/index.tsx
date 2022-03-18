import {
	Divider,
	Heading,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import scss from "@scss/pages/index.module.scss";
import { IoMdSearch } from "react-icons/io";
import cn from "classnames";
import SearchBar from "@components/SearchBar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
	const [album, setAlbum] = useState("");

	useEffect(() => {
		const options = {
			method: "GET",
			headers: { "content-type": "application/json" },
			// body: '{"name":"leo","email":"roullois.leo@gmail.com","password1":"00000000","password2":"00000000"}',
		};

		fetch("https://api.deezer.com/album/302127", options)
			.then((response) => response.json())
			.then((data) => {
				setAlbum(JSON.stringify(data));
				console.log(data);
			})
			.catch((err) => console.error(err));
	});
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={cn(scss["main"], scss["gradient-background"])}>
				<div className={scss["wrapper"]}>
					<Heading as='h1' size='2xl'>
						Cover Downloader
					</Heading>
					<Heading as='h2' size='lg'>
						Download your favorites cover in <span>high quality</span> for free
					</Heading>
					<Heading as='h3' size='md'>
						Powered by the{" "}
						<Link href='https://www.deezer.com/'>
							<a target='blank' className={scss["gradient-link"]}>
								Deezer
							</a>
						</Link>{" "}
						API.
					</Heading>
					<SearchBar />
					<article className={scss["card"]}>
						<Heading as='h4' size='sm'>
							Lorem ipsum dolor
						</Heading>
						<Divider marginY={5} />
						<Text>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
							praesentium ipsum nulla eveniet, corporis facilis nesciunt?
							Ducimus illum totam ratione dignissimos natus aliquid delectus
							recusandae quos, aut omnis eos animi!
						</Text>
						<Text>{album}</Text>
					</article>
				</div>
			</main>
		</>
	);
};

export default Home;
