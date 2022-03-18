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

interface IProps {
	album: SearchAlbumResponse;
}
const Card: FC<IProps> = ({ album }) => {
	return (
		<>
			<Box as='article' className={scss["card"]} margin='40px auto'>
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
					<Heading as='h4' size='lg'>
						<Link href={album.artist.link}>
							<a>{album.artist.name}</a>
						</Link>
					</Heading>
				</HStack>
				<Divider marginY={5} />
				<Heading as='h4' size='md' textAlign='center'>
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
					>
						Download 1000*1000
					</Button>
					<Button
						rightIcon={<IoMdDownload />}
						width={300}
						maxWidth='full'
						minWidth={200}
					>
						Download 500*500
					</Button>
					<Button
						rightIcon={<IoMdDownload />}
						width={300}
						maxWidth='full'
						minWidth={200}
					>
						Download 250*250
					</Button>
				</VStack>
			</Box>
		</>
	);
};

export default Card;
