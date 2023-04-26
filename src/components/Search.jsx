import React, {useEffect, useState} from 'react'
import { useDebounce } from 'use-debounce'
import {useResultContext} from '../contexts/ResultContextProvider'

export const Search = () => {
	const [text, setText] = useState("");
	const { setSearchTerm } = useResultContext();
	const [ debouncedValue ] = useDebounce(text, 800);
	console.log(text)
	useEffect(() => {
		if(debouncedValue) setSearchTerm(debouncedValue);
	}, [debouncedValue])
	return (
		<div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
			<input 
				value={text}
				type="text"
				className='mb-10 sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
				placeholder='Search BrainQuery'
				onChange={(e) => setText(e.target.value)}
			/>
		
		</div>
	)
}
