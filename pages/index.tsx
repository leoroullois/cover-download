import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Center, Divider, Heading, Stack, Wrap } from "@chakra-ui/react";
import scss from "@scss/pages/index.module.scss";
import cn from "classnames";

import SearchBar from "@components/SearchBar";
import { useSelector } from "react-redux";
import { selectDeezer } from "@store/selectors";
import Card from "@components/Card";

const Home: NextPage = () => {
	const { albums } = useSelector(selectDeezer);

	return (
		<>
			<Head>
				<title>
					Cover Downloader{" "}
					{albums.data[0]?.title && "- " + albums.data[0].title}
				</title>
				<meta
					name='description'
					content='Cover Downloader, download your favorites cover in high quality for free. Powered by the Deezer API.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={cn(scss["main"], scss["gradient-background"])}>
				<Wrap spacing='30px' className={scss["wrapper"]} justify='center'>
					<Stack width='full' as='header'>
						<Heading as='h1' size='2xl' color='white'>
							Cover Downloader
						</Heading>
						<Heading as='h2' size='lg' color='white'>
							Download your favorites cover in <span>high quality</span> for
							free
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
					</Stack>
					<Divider />
					<Wrap spacing='60px' justify='center' as='section' overflow='hidden'>
						{albums.total !== 0 ? (
							albums.data.map((album, i) => {
								return <Card album={album} key={i}  />;
							})
						) : (
							<Center color='white'>0 album found</Center>
						)}
					</Wrap>
				</Wrap>
			</main>
		</>
	);
};

export default Home;
