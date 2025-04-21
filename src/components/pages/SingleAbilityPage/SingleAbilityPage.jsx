import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePikachuService from '../../../service/PikachuService';

import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../errorMessage/errorMessage';

import './SingleAbilityPage.sass';

const SingleAbilityPage = () => {
	const { abilityName } = useParams();
	const navigate = useNavigate();
	const [ability, setAbility] = useState({});
	const { loading, error, getAbilities, clearError } = usePikachuService();

	useEffect(() => {
		updateAbility(abilityName)
	}, []);

	const onAbilityLoaded = (abilities) => {
		setAbility(abilities);
	}

	const updateAbility = (name) => {
		getAbilities(name)
			.then(onAbilityLoaded)
	}

	const spinner = loading ? <Spinner /> : null;
	const problem = error ? <ErrorMessage /> : null;
	const items = !loading && !error ? <View ability={ability} abilityName={abilityName} navigate={navigate} /> : null;

	return (
		<div className="abilitiy__block">
			{spinner}
			{problem}
			{items}
		</div>
	)
}

const View = ({ ability, abilityName, navigate }) => {
	const { effectChanges, effectEntries, flavorTextEntries, generation, isMainSeries, pokemonCount } = ability;
	const clazz = isMainSeries ? 'main' : 'no-main';

	return (
		<div className='ability'>
			<h1 className='ability__header'>{abilityName}</h1>
			<div className="ability__effect-block">
				<div className="ability__effect-changes">
					{effectChanges ? effectChanges : 'No effect changes..'}
				</div>
				<div className="ability__effect-entries">
					{effectEntries ? effectEntries : 'No effect changes..'}
				</div>
				<div className="ability__flavor-text">
					{flavorTextEntries}
				</div>
				<div className="ability__generation">
					First shown in generation: {generation}
				</div>
				<div className={`ability__main-series ${clazz}`}>
					Was it shown in the original: {isMainSeries ? 'Yes' : 'No'}
				</div>
				<div className="ability__pokemon-counter">
					{pokemonCount} Pokemon have this ability.
				</div>
				<button className="ability__go-back" onClick={() => navigate(-1)}>Go back</button>
			</div>
		</div>
	)
}

export default SingleAbilityPage;