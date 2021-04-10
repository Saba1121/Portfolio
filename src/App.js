import { useEffect, useState } from 'react';
import './App.css';

import Projects from './pages2/projects/Projects'
import Header from './components/header/Header';

import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";


function App() {
	const location = useLocation();
	const [aboutPosition, setAboutPosition] = useState('100vw')
	const [contactPosition, setContactPosition] = useState('100vw')

	useEffect(() => {
		document.documentElement.style.setProperty('--bodyHeight', `${window.innerHeight}px`)
	}, [])

	return (
		<div className='App'>
			<Header 
				setAboutPosition={setAboutPosition} 
				setContactPosition={setContactPosition}
			/>

			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>

					<Route path='/'>
						<Projects 
							aboutPosition={aboutPosition} 
							setAboutPosition={setAboutPosition} 
							contactPosition={contactPosition}
							setContactPosition={setContactPosition}
						/>
					</Route>

				</Switch>
			</AnimatePresence>
		</div>
	)
}


export default App;
