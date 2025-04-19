import { useState, useEffect } from 'react';
import usePikachuService from '../../service/PikachuService';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomPikachu.sass';

const RandomPikachu = () => {
	const [pokemon, setPokemon]= useState({});

	const { loading, error, clearError, getPikachu } = usePikachuService();

	useEffect(() => {
		updatePokemon();
		const timerId = setInterval(updatePokemon, 60000);

		return () => {
			clearInterval(timerId);
		}
	}, []);

	const onPokemonLoad = (pokemon) => {
		setPokemon(pokemon)
	}

	const updatePokemon = () => {
		clearError();
		const id = Math.floor(Math.random() * (1380 - 1) + 1);

		getPikachu(id)
			.then(onPokemonLoad);
	}

	const load = loading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;
	const items = !loading && !error ? <View name='Penis'/> : null;
}

const View = (props) => {
	const { id, name, weight, height, photo, types, baseStates } = props.pokemon;

	return (
		<h1>{props.name}</h1>
	)
}

export default RandomPikachu;