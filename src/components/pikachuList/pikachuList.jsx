import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import usePikachuService from '../../service/PikachuService';

import './pikachuList.sass';

const PikachuList = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [offset, setOffset] = useState(0);
	const [newItemLoading, setNewItemLoading] = useState(false);

	const { getAllPokemon } = usePikachuService();

	useEffect(() => {
		getAllPokemon(offset)
			.then(onPokemonListLoad);
	}, []);

	const onPokemonListLoad = (char) => {
		setPokemonList(char)
	}

	return (
		<View char={pokemonList}/>
	)
}

const View = ({ char }) => {
	
	const renderList = (arr) => {
		const item = arr.map(item => {
			const { id, name, photo, types } = item;

			return (
				<Link to={`/gallery/${id}`} className="pokemon-list__grid-item" key={id}>
					{name}
					<img src={photo} alt={name} />
					<ul className='pokemon-list__types'>
					Types:
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

	const items = renderList(char);

	return (
		<>
			{items}
		</>
		
	)

}

export default PikachuList;