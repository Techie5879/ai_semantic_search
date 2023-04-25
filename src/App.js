import React, { useState } from 'react';

import { Navbar } from './components/Navbar';
import { Paths } from './components/Paths';
import { Footer } from './components/Footer';


const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={darkTheme ? 'dark' : ''}>
        <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen'>
			<Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
			<Paths />
			<Footer />
        </div>
    </div>
  )
}

export default App