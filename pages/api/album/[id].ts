import { NextApiHandler } from "next";
import * as deezerApi from "deezer-api-ts";

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "GET") {
		const album = await deezerApi.getAlbum(116180752);
		res.status(200).json(album);
	} else {
		res.status(500).json({ message: "Invalid route" });
	}
};
export default handler;
