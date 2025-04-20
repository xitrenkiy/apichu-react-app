import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePikachuService from '../../service/PikachuService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './SinglePikachuPage.sass';

const SinglePikachuPage = () => {
	const { pokeId } = useParams();
	const { loading, error, getPikachu, clearError, getAbilities, getDescription } = usePikachuService();
	const [currentPokemon, setCurrentPokemon] = useState({});
	const [abilities, setAbilities] = useState({});
	const [description, setDescription] = useState({});

	useEffect(() => {
		clearError();
		updatePokemon(pokeId);
	}, [pokeId]);

	const updatePokemon = (id) => {
		getPikachu(id)
			.then(onPokemonLoad)
		getAbilities(id)
			.then(onAbilityLoad)
		getDescription(id)
			.then(onDescriptionLoad)
	}

	const onPokemonLoad = (pokemon) => {
		setCurrentPokemon(pokemon);
	}

	const onAbilityLoad = (pokemon) => {
		setAbilities(pokemon);
	}

	const onDescriptionLoad = (pokemon) => {
		setDescription(pokemon)
	}

	const load = loading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;
	const items = !loading && !error ? <View pokemon={currentPokemon} descr={description} abilities={abilities} /> : null

	return (
		<>
			<div className="pikachu__items">
				{load}
				{problem}
				{items}
			</div>
		</>
	)
}

const View = ({ pokemon, descr, abilities }) => {
	const { name, weight, height, photo, types, baseStats } = pokemon;
	const { description, captureRate, baseHappiness, color, shape, varieties } = descr;
	const { effectChanges, effectEntries, flavorTextEntries } = abilities;

	const colorName = captureRate === 'Legendary' ? '#d62828'
					: captureRate === 'Rare' ? '#4361ee'
					: captureRate === 'Uncommon' ? '#ffba08'
					: captureRate === 'Common' ? '#2a9d8f'
					: '#6c757d';

	const renderStats = (arr = []) => {
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
			<table className="pokemon__stats-table">
				<thead>
					<tr>{headers}</tr>
				</thead>
				<tbody>
					<tr>{values}</tr>
				</tbody>
			</table>
		)
	}

	const renderTypes = (types) => {
		return (
			<ul className="pokemon__single-type-list">
				{types.map((item, i) => (
					<li className={`pokemon__single-type-item type-${item.toLowerCase()}`} key={i}>{item}</li>
				))}
			</ul>
		);
	};
	
	const renderVarieties = (varieties) => {
		return (
			<ul className="pokemon__varieties">
				{varieties.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
		);
	};
	
	const stats = baseStats ? renderStats(baseStats) : null;
	const listTypes = types ? renderTypes(types) : null;
	const listVarieties = varieties ? renderVarieties(varieties) : null;

	return (
		<div className="pokemon__block">
			<div className="pokemon__header">
				<img src={photo} alt={name} className="pokemon__image" />
				<div>
					<h1 className="pokemon__name">{name}</h1>
					<p><strong>Height:</strong> {height / 10} m</p>
					<p><strong>Weight:</strong> {weight / 10} kg</p>
					<p style={{'color': `${colorName}`}}><strong>Rarity:</strong> {captureRate}</p>
					<p><strong>Happiness:</strong> {baseHappiness}</p>
					<p><strong>Color:</strong> {color}</p>
					<p><strong>Shape:</strong> {shape}</p>
				</div>
			</div>

			<p className="pokemon__description">{description}</p>

			{stats}
			
			<div className="pokemon__single-type-section">
				<h3 className='pokemon__single-type-title'>Types:</h3>
				{listTypes}
			</div>

			<div className="pokemon__varieties">
				<h3>Varieties:</h3>
				{listVarieties}
			</div>

			<div className="pokemon__abilities">
				<h2>Abilities</h2>

				{effectEntries && (
					<div className="pokemon__abilities-block">
						<h3>Effect Entries</h3>
						<p className="pokemon__ability-item">{effectEntries}</p>
					</div>
				)}

				{effectChanges && (
					<div className="pokemon__abilities-block">
						<h3>Effect Changes</h3>
						<p className="pokemon__ability-item">{effectChanges}</p>
					</div>
				)}

				{flavorTextEntries && (
					<div className="pokemon__abilities-block">
						<h3>Flavor Text</h3>
						<p className="pokemon__ability-item">{flavorTextEntries}</p>
					</div>
				)}
			</div>

			<Link to="/gallery" className="pokemon__back-link">← Back to Gallery</Link>
		</div>
	)
}

export default SinglePikachuPage;