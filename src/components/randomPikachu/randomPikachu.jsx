import { useState, useEffect } from 'react';
import usePikachuService from '../../service/PikachuService';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomPikachu.sass';
import './pokemonInfo.sass'

const RandomPikachu = () => {
	const [pokemon, setPokemon]= useState({});
	const [description, setDescription] = useState('');

	const { loading, error, clearError, getPikachu, getDescription } = usePikachuService();

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

	const onDescriptionLoad = (descr) => {
		setDescription(descr);
	}

	const updatePokemon = () => {
		clearError();
		const id = Math.floor(Math.random() * (1020 - 1) + 1);

		getPikachu(id)
			.then(onPokemonLoad)
		getDescription(id)
			.then(onDescriptionLoad)
	}

	const load = loading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;
	const items = !loading && !error ? <View pokemon={pokemon} descr={description} onClickButton={updatePokemon} /> : null;

	return (
		<>
			{load}
			{problem}
			{items}
		</>
	)
}

const View = ({ pokemon, descr, onClickButton }) => {
	const { id, name, weight, height, photo, types, baseStats } = pokemon;
	const { description, captureRate } = descr;

	const renderStats = (arr) => {
		const headers = arr.map((item, i) => {
			return (
				<th key={i}>{item.name}</th>
			)
		});

		const values = arr.map((item, i) => {
			return (
				<td key={i}>{item.value}</td>
			)
		})

		return (
			<>
				<thead>
					<tr>
						{headers}
					</tr>
				</thead>
				<tbody>
					<tr>
						{values}
					</tr>
				</tbody>
			</>

		)
	}

	const renderTypes = (arr) => {
		const types = arr.map((item, i) => {
			return (
				<li key={i}>{item}</li>
			)
		});

		return (
			<ul className='pokemon__types'>
				{types}
			</ul>
		)
	}

	const items = baseStats ? renderStats(baseStats) : null;
	const typeList = types ? renderTypes(types) : null;

	return (
		<>
			<div className='pokemon__info'>
				<img 
					src={photo} 
					alt={name} 
					/>
				<div className="pokemon__data">
					<h1>{name}</h1>

					<div className="pokemon__rarity">
						<p><strong>Rarity:</strong> {captureRate}</p>
					</div>
		
					<p className="pokemon__description" style={{ whiteSpace: 'pre-line' }}>{description}</p>
		
					<div className="pokemon__physical">
						<p><strong>Height:</strong> {height / 10} m</p>
						<p><strong>Weight:</strong> {weight / 10} kg</p>
					</div>
		
					<table>
						{items}
					</table>
		
					<div className="pokemon__types-wrapper">
						<h3>Types:</h3>
						{typeList}
					</div>
				</div>
			</div>
			<button className="pokemon__again" onClick={onClickButton}>
				Throw Pokéball!
			</button>
		</>

	)
}

export default RandomPikachu;