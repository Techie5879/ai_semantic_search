import React, {createContext, useContext, useState} from 'react';
import XMLParser from 'react-xml-parser';


const ResultContext = createContext();
const baseUrl = 'http://export.arxiv.org/api/query?id_list=';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

  
    const getResults = async (id) => {
        setIsLoading(true);
        console.log(`${baseUrl}${id}`)
        const response = await fetch(`${baseUrl}${id}`, {
            method: 'GET'
		}).then(response => response.text()).then(data => {
			var escapedData = data.replace(/%/g, '%25'); // replace % with %25
			var xml = new XMLParser().parseFromString(escapedData);
			return xml
		}).catch(err => console.log(err));
        const filteredArray = response['children'].filter(obj => obj.name === "entry" && obj.children !== undefined);
        const childrenArray = filteredArray.map(obj => obj.children);
        const allowedNames = ["id", "title", "summary"];
        const filteredArrays = childrenArray.map(childArray =>
            childArray.filter(obj => 
                allowedNames.includes(obj.name) ||
                obj.attributes.type === "application/pdf"

            )
        );

        const remappedArr = filteredArrays.map((arr) => {
            return arr.reduce((acc, obj) => {
              if (obj.name === 'link') {
                acc[obj.name] = obj.attributes.href;
              } else {
                acc[obj.name] = obj.value;
              }
              return acc;
            }, {});
          });

		const data = await remappedArr;
          

        console.log(data)
        setResults(data);

        setIsLoading(false);
    }
    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);
