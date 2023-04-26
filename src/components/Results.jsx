import React, { useEffect } from 'react';
// import {useLocation} from 'react-router-dom'
// import ReactPlayer from 'react-'
import {Loading} from './Loading'
import {useResultContext} from '../contexts/ResultContextProvider'

export const Results = () => {
  const {results, isLoading, getResults, searchTerm} = useResultContext();
  

  useEffect(() => {
	if (searchTerm) {
		getResults(`${searchTerm}`)
		
	}
  }, [searchTerm])
  

  if (isLoading || !results) return <Loading />
  else return (
	
    <div className='flex flex-wrap justify-between gap-6 sm:px-56 '>
    
		{results?.map(({id, title, link, summary}, index) => (
			<div key={index} className='md:w-2/5 w-full'>
				
				<a href={id} target="_blank" rel="noreferrer">
					<p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
						{title}
					</p>
					<p className='text-sm font-bold'>
						{id.length > 30 ? id.substring(0, 30) : id}
					</p>
				</a>
				<p className='text-sm'>
					{summary.length > 300 ? `${summary.substring(0, 300)}...` : summary}
				</p>
				<a href={link} target='_blank' rel='noreferrer'>
					<p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>[PDF]</p>
				</a>

			</div>
		))}
		
    </div>
  )
}
