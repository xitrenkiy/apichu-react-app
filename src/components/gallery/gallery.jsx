import { useState, useEffect } from 'react';
import usePikachuService from '../../service/PikachuService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './gallery.sass';

const Gallery = () => {
	const [pokemon, setPokemon] = useState({});
	const [currentPokemon, setCurrentPokemon] = useState(1);
	const { loading, error, getPikachu, clearError } = usePikachuService();

	useEffect(() => {
		updatePokemon()
	}, [currentPokemon]);

	const handleClickBtn = (i) => {
		setCurrentPokemon(num => num + i)
	}

	const onPikachuLoad = (pokemon) => {
		setPokemon(pokemon);
	}

	const updatePokemon = () => {
		clearError();
		getPikachu(currentPokemon)
			.then(onPikachuLoad)
	}

	const spinner = loading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;
	const items = !error && !loading ? <View pikachu={pokemon}/> : null;

	return (
		<div className="gallery">
			<div className="block">
				{spinner}
				{problem}
				{items}
			</div>

			<button 
				onClick={() => handleClickBtn(-1)} 
				className="gallery__btn left"
				disabled={currentPokemon < 2}></button>

			<button 
				onClick={() => handleClickBtn(1)} 
				className="gallery__btn right"></button>
		</div>
	)
}

const View = ({ pikachu }) => {
	const { photo, name } = pikachu;

	return (
		<div className="gallery__view fade-in">
			<h1 className="gallery__name">{name}</h1>
			<img src={photo} alt={name} className="gallery__image" />
			<button className="gallery__learn-more">
				Learn more
			</button>
		</div>
	)
}

export default Gallery;