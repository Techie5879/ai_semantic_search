import React, { useState} from 'react'
// import { useDebounce } from 'use-debounce'
import {useResultContext} from '../contexts/ResultContextProvider'

export const Search = () => {
	const [text, setText] = useState("");
	const { setSearchTerm, searchTerm, getResults } = useResultContext();
	// const [ debouncedValue ] = useDebounce(text, 800);
	
	// useEffect(() => {
	// 	if(debouncedValue) setSearchTerm(debouncedValue);
	// }, [debouncedValue])


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(text);
		const resp_data = fetch('/predictor', {
			method: "POST", 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(text)}).then((response) => {return response.json()}).then((data) => {return data});
			resp_data.then(function(result) {
				const values = Object.values(result);
				const concatenatedString = values.join(',');
				console.log(concatenatedString);
				getResults(`${concatenatedString}`)
		})
		setText("");
	}


	return (
		<div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
			<form onSubmit={handleSubmit}>
				<input 
					value={text}
					type="text"
					className='mb-10 sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
					placeholder='Search BrainQuery'
					onChange={(e) => setText(e.target.value)}
				/>
				<button className='ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Search</button>
				{/* <p>{text}</p> */}
			</form>
		</div>
	)
}
