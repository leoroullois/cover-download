import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { searchAlbum, updateSearch } from "@store/slices/deezer";
import {
	ChangeEventHandler,
	KeyboardEventHandler,
	MouseEventHandler,
	useState,
} from "react";
import { IoMdBackspace, IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearch(e.target.value);
	};
	const handleDelete = () => setSearch("");
	const handleEnter: KeyboardEventHandler = (e) => {
		if (e.code === "Enter") {
			console.log("dispatch(album) ");
			dispatch(updateSearch(search));
			dispatch(searchAlbum(search));
		}
	};
	return (
		<InputGroup>
			<Input
				value={search}
				onChange={handleChange}
				onKeyDown={handleEnter}
				placeholder='Search for an album'
			/>
			<InputRightElement>
				{search ? <IoMdBackspace onClick={handleDelete} /> : <IoMdSearch />}
			</InputRightElement>
		</InputGroup>
	);
};

export default SearchBar;
