import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlbumResponse } from "deezer-api-ts/dist/responses/album.response";
import { SearchAlbumResponse } from "deezer-api-ts/dist/responses/search-album.response";
interface IState {
	search: string;
	albums: Response<SearchAlbumResponse>;
}
interface ResponseError {
	type: string;
	message: string;
}

interface Response<T> {
	data: T[];
	total: number;
	prev?: string;
	next?: string;
	error?: ResponseError;
}
const init = (): IState => {
	return {
		search: "",
		albums: {
			data: [],
			total: 0,
		},
	};
};

export const searchAlbum = createAsyncThunk<
	Response<SearchAlbumResponse>,
	string
>("deezer/search", async (album: string) => {
	const data: Response<SearchAlbumResponse> = await fetch(
		"/api/search/" + album
	).then((res) => res.json());
	return data;
});

const deezer = createSlice({
	name: "deezer",
	initialState: init(),
	reducers: {
		updateSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchAlbum.pending, (state) => {
			console.log("Search pending...");
		});
		builder.addCase(
			searchAlbum.fulfilled,
			(state, action: PayloadAction<Response<SearchAlbumResponse>>) => {
				state.albums = action.payload;
				state.albums.data = state.albums.data.filter(
					(album) => album.record_type === "album"
				);
			}
		);
		builder.addCase(searchAlbum.rejected, () => {
			console.log("Can't perform search.");
		});
	},
});

export const { updateSearch } = deezer.actions;

export default deezer.reducer;
