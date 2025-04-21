import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePikachuService from '../../service/PikachuService';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomPikachu.sass';
import './pokemonInfo.sass';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

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

	const labels = baseStats ? baseStats.map(item => item.name.charAt(0).toUpperCase() + item.name.slice(1)) : null;
	const stats = baseStats ? baseStats.map(item => item.value) : null;

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Pokemon Stats'
			}
		}
	}

	const data = {
		labels,
		datasets: [
			{
				label: 'Stat',
				data: stats,
				backgroundColor: 'rgba(255, 99, 132, 0.5)'
			}
		]
	};

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

	const typeList = types ? renderTypes(types) : null;

	return (
		<>
			<button className="pokemon__again" onClick={onClickButton}>
				Throw Pokéball!
			</button>
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

					<div className="pokemon__stats-wrapper">
						<Bar options={options} data={data} />
					</div>
		
					<div className="pokemon__types-wrapper">
						<h3>Types:</h3>
						{typeList}
					</div>
				</div>
				<Link to={`/gallery/${id}`} className='pokemon__learn-more'>Lear more</Link>
			</div>
		</>

	)
}

export default RandomPikachu;