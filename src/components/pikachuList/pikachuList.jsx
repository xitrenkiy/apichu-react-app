import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import usePikachuService from '../../service/PikachuService';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './pikachuList.sass';

const PikachuList = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [offset, setOffset] = useState(0);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [ended, setEnded] = useState(false);

	const { loading, error, getAllPokemon } = usePikachuService();

	useEffect(() => {
		onRequest(offset, true)
	}, []);
	
	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);

		getAllPokemon(offset)
			.then(onPokemonListLoad);
	}

	const onPokemonListLoad = (newItemList) => {
		const ended = newItemList < 12 ? true : false;

		setPokemonList([...pokemonList, ...newItemList]);
		setOffset(offset => offset + 12);
		setNewItemLoading(false);
		setEnded(ended);
	}

	const handleLoadButtonClick = (offset) => {
		onRequest(offset);
	}

	const renderList = (arr) => {
		const item = arr.map(item => {
			const { id, name, photo, types } = item;

			return (
				<Link to={`/gallery/${id}`} className="pokemon-list__grid-item" key={id}>
					{name}
					<img src={photo} alt={name} />
					<ul className='pokemon-list__types'>
					<div className="name">Types:</div>
						{types.map((item, i) => {
							return (
								<li key={i}>{item}</li>
							)
						})}
					</ul>
				</Link>
			)
		});

		return (
			<div className="pokemon-list__grid">
				{item}
			</div>
		)
	}

	const items = renderList(pokemonList);

	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;

	return (
		<>
			{spinner}
			{problem}
			{items}
			<button 
				onClick={() => handleLoadButtonClick(offset)}
				disabled={newItemLoading}
				style={{'display': ended ? 'none' : 'block'}}
				className='pokemon-list__grid-btn'
			>Load more</button>
		</>
	)
}


export default PikachuList;