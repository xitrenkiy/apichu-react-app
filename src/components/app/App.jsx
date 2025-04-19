import { useState } from 'react';

import AppHeader from '../appHeader/appHeader';
import DecorativeTabs from '../decorativeTabs/decorativeTabs';
import RandomPikachu from '../randomPikachu/randomPikachu';

import './App.sass';

function App() {


	return (
	<>
		<AppHeader />
		<DecorativeTabs />
		<RandomPikachu />
	</>
	)
}

export default App
