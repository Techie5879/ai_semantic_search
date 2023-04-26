import React, {createContext, useContext, useState} from 'React';

const ResultContext = createContext();
const baseUrl = 'http://export.arxiv.org/api/query?id_list=';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // maybe pass id here
    const getResults = async () => {
        setIsLoading(true);
        
        const response = await fetch(`${baseUrl}`, {
            method: 'GET'
        });

        const data = await response.json();

        setResults(data);
        // delete this later
        console.log(results);

        setIsLoading(false);
    }
    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);
