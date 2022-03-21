import {
	Avatar,
	Box,
	Button,
	Center,
	Container,
	Divider,
	Heading,
	HStack,
	StackDivider,
	VStack,
} from "@chakra-ui/react";
import { SearchAlbumResponse } from "deezer-api-ts/dist/responses/search-album.response";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IoMdDownload } from "react-icons/io";
import scss from "@scss/components/card.module.scss";

import slugify from "slugify";
interface IProps {
	album: SearchAlbumResponse;
}
const Card: FC<IProps> = ({ album }) => {
	const toDataURL = async (url: string): Promise<string> => {
		const data = await fetch(url)
			.then((response) => {
				return response.blob();
			})
			.then((blob) => {
				return URL.createObjectURL(blob);
			});
		return data;
	};
	const download = async (quality: number) => {
		const a = document.createElement("a");
		switch (quality) {
			case 1000:
				a.href = await toDataURL(album.cover_xl);
				break;
			case 500:
				a.href = await toDataURL(album.cover_big);
				break;
			case 250:
				a.href = await toDataURL(album.cover_medium);
			default:
				a.href = await toDataURL(album.cover_xl);
		}
		a.download =
			slugify(album.artist.name + " " + album.title).toLocaleLowerCase() +
			"-cover.jpeg";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	return (
		<Box as='article' className={scss["card"]} margin='0px auto'>
			<HStack
				justify='center'
				align='center'
				divider={<StackDivider />}
				spacing={10}
			>
				<Avatar
					name={album.artist.name}
					src={album.artist.picture_medium}
					size='xl'
				/>
				<Heading as='h4' size='lg' overflow='clip' color='white'>
					<Link href={album.artist.link}>
						<a target='_blank'>{album.artist.name}</a>
					</Link>
				</Heading>
			</HStack>
			<Divider marginY={5} />
			<Heading as='h4' size='md' textAlign='center' color='white'>
				{album.title} - {album.nb_tracks} tracks
			</Heading>
			<Center marginY={5}>
				<Link href={album.link}>
					<a target='_blank'>
						<Image
							src={album.cover_xl}
							alt={album.title}
							height={300}
							width={300}
						/>
					</a>
				</Link>
			</Center>
			<VStack>
				<Button
					rightIcon={<IoMdDownload />}
					width={300}
					maxWidth='full'
					minWidth={200}
					backgroundColor='whiteAlpha.200'
					color='white'
					onClick={() => download(1000)}
				>
					Download 1000*1000
				</Button>
				<Button
					rightIcon={<IoMdDownload />}
					width={300}
					maxWidth='full'
					minWidth={200}
					backgroundColor='whiteAlpha.200'
					color='white'
					onClick={() => download(500)}
				>
					Download 500*500
				</Button>
				<Button
					rightIcon={<IoMdDownload />}
					width={300}
					maxWidth='full'
					minWidth={200}
					backgroundColor='whiteAlpha.200'
					color='white'
					onClick={() => download(250)}
				>
					Download 250*250
				</Button>
			</VStack>
		</Box>
	);
};

export default Card;
