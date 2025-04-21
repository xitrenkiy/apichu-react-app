import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

	const handleClickBtn = useCallback((i) => {
		setCurrentPokemon(num => num + i);
	}, []);

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
	const items = !error && !loading ? <View pikachu={pokemon} /> : null;

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
	const { id, photo, name } = pikachu;

	return (
		<div className="gallery__view fade-in" key={id}>
			<h1 className="gallery__name">{name}</h1>
			<img src={photo} alt={name} className="gallery__image" />
			<Link className="gallery__learn-more" to={`/gallery/${id}`}>
				Learn more
			</Link>
		</div>
	)
}

export default Gallery;