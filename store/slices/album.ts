import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IState {
	search: string;
	album: any;
}
const init = (): IState => {
	return {
		search: "",
		album: {},
	};
};
const album = createSlice({
	name: "album",
	initialState: init(),
	reducers: {
		updateSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
});

export const { updateSearch } = album.actions;

export default album.reducer;
