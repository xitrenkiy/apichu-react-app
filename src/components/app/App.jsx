import { useState } from 'react';

import AppHeader from '../appHeader/appHeader';
import DecorativeTabs from '../decorativeTabs/decorativeTabs';
import RandomPikachu from '../randomPikachu/randomPikachu';
import Gallery from '../gallery/gallery';
import MainPage from '../pages/MainPage';

import './App.sass';

function App() {
	const [buttonClicked, setButtonClicked] = useState('gallery');

	const views = {
		random: <RandomPikachu />,
		gallery: <Gallery />
	}

	const handleButtonClick = (name) => {
		setButtonClicked(name)
	}

	return (
	<>
		<AppHeader />
		<DecorativeTabs onButtonClick={handleButtonClick}/>
		{views[buttonClicked]}
	</>
	)
}

export default App
