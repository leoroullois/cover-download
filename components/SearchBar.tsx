import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import {
	ChangeEventHandler,
	KeyboardEventHandler,
	MouseEventHandler,
	useState,
} from "react";
import { IoMdBackspace, IoMdSearch } from "react-icons/io";

const SearchBar = () => {
	const [album, setAlbum] = useState("");
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setAlbum(e.target.value);
	};
	const handleDelete = () => setAlbum("");
	const handleEnter: KeyboardEventHandler = (e) => {
		e.preventDefault();
		if(e.code === "Enter") {
			console.log("first")
		}
	};
	return (
		<InputGroup>
			<Input
				value={album}
				onChange={handleChange}
				onKeyDown={handleEnter}
				placeholder='Search for an album'
			/>
			<InputRightElement>
				{album ? <IoMdBackspace onClick={handleDelete} /> : <IoMdSearch />}
			</InputRightElement>
		</InputGroup>
	);
};

export default SearchBar;
