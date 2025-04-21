import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/appHeader';
import DecorativeTabs from '../decorativeTabs/decorativeTabs';
import Spinner from '../spinner/spinner';
import { MainPage } from '../pages';

const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const Page404 = lazy(() => import('../pages/404'));
const SinglePikachuPage = lazy(() => import('../pages/SinglePikachuPage/SinglePikachuPage'));
const SingleAbilityPage = lazy(() => import('../pages/SingleAbilityPage/SingleAbilityPage'));
const SingleTypePage = lazy(() => import('../pages/SingleTypePage/SingleTypePage'));

import './App.sass';

function App() {
	return (
		<Router>
			<AppHeader />
			<DecorativeTabs />
			<main>
				<Suspense fallback={<Spinner />}>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/gallery' element={<GalleryPage />} />
						<Route path='/gallery/:pokeId' element={<SinglePikachuPage />} />
						<Route path='/ability/:abilityName' element={<SingleAbilityPage />} />
						<Route path='/types/:typeName' element={<SingleTypePage />} />
						<Route path='*' element={<Page404 />} />
					</Routes>
				</Suspense>
				
			</main>
		</Router>
	)
}

export default App
