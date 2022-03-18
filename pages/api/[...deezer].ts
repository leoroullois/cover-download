import { NextApiHandler } from "next";
import * as deezerApi from "deezer-api-ts";

const handler: NextApiHandler = async (req, res) => {
	const params = req.query.deezer;
	if (req.method === "GET") {
		if (params.length == 2) {
			if (params[0] === "search") {
				const album = params[1] as string;
				const albums = await deezerApi.searchAlbums({
					album,
				});
				res.status(200).json(albums);
			} else if (params[0] === "album") {
				const id: number = Number(params[1]) ?? 116180752;
				const album = await deezerApi.getAlbum(id);
				res.status(200).json(album);
			} else {
				res.status(500).json({ message: "Invalid search." });
			}
		} else {
			res.status(500).json({ message: "URL not valid" });
		}
	} else {
		res.status(500).json({ message: "Route not valid" });
	}
};
export default handler;
