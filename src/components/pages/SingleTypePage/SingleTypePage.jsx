import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePikachuService from '../../../service/PikachuService';

import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../errorMessage/errorMessage';

import './SingleTypePage.sass';

const SingleTypePage = () => {
	const { typeName } = useParams();
	const [typeInfo, setTypeInfo] = useState({});
	const { loading, error, getTypes } = usePikachuService();

	useEffect(() => {
		getTypes(typeName)
			.then(onTypeLoaded)
	}, [typeName]);
	
	const onTypeLoaded = (type) => {
		setTypeInfo(type);
	}

	const spinner = loading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;
	const items = !loading && !error ? <View type={typeInfo} typeName={typeName} /> : null;

	return (
		<div className='type'>
			<div className="type__block">
				{spinner}
				{problem}
				{items}
			</div>
		</div>
	)
}

const View = ({ type, typeName }) => {
	const { noDamageTo = [], 
			halfDamageTo = [], 
			doubleDamageTo = [], 
			noDamageFrom = [], 
			halfDamageFrom = [], 
			doubleDamageFrom = [], 
			pokemonCount } = type;

	const renderDamageList = (title, list, modifier) => {
		if (!list || list.length === 0) return null;

		return (
			<div className={`type__section type__section--${modifier}`}>
				<h3>{title}</h3>
				<ul className="type__list">
					{list.map((item, i) => (
						<li key={i} className="type__item">
							<Link to={`/types/${item.name}`} className="type__link">
								{item.name.charAt(0).toUpperCase() + item.name.slice(1)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div className="type__content">
			<h2 className="type__title">Type Effectiveness to {typeName.toUpperCase()}</h2>
			<p className="type__count">Total Pokémon of this type: <strong>{pokemonCount}</strong></p>

			<div className="type__damage">
				{renderDamageList('No Damage To', noDamageTo, 'no-to')}
				{renderDamageList('Half Damage To', halfDamageTo, 'half-to')}
				{renderDamageList('Double Damage To', doubleDamageTo, 'double-to')}

				{renderDamageList('No Damage From', noDamageFrom, 'no-from')}
				{renderDamageList('Half Damage From', halfDamageFrom, 'half-from')}
				{renderDamageList('Double Damage From', doubleDamageFrom, 'double-from')}
			</div>
		</div>
	)
}

export default SingleTypePage;