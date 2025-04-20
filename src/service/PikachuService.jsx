import useHttp from "../hooks/http.hook";

const usePikachuService = () => {
	const _baseApi = 'https://pokeapi.co/api/v2/';
	const _baseOffset = 0;
	const fallbackUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

	const { loading, error, request, clearError } = useHttp();

	const findEn = (str) => {
		return str.find(entry => entry.language.name === 'en');
	}

	const getPikachu = async (id) => {
		const response = await request(`${_baseApi}pokemon/${id}`);
		return _transformPikachu(response);
	}

	const getDescription = async (id) => {
		const response = await request(`${_baseApi}pokemon-species/${id}`);
		return _transormSpecies(response);
	}

	const getAbilities = async (id) => {
		const response = await request(`${_baseApi}ability/${id}`);
		return _transformAbilities(response);
	}

	const _transformPikachu = (char) => {
		return {
			id: char.id,
			name: char.name.charAt(0).toUpperCase() + char.name.slice(1),
			height: char.height,
			weight: char.weight,
			photo: char.sprites.other.home.front_default ? char.sprites.other.home.front_default : fallbackUrl,
			types: char.types.map(item => item.type.name),
			baseStats: char.stats.map(stat => ({
				name: stat.stat.name,
				value: stat.base_stat
			}))
		}
	}

	const _transormSpecies = (char) => {
		const entry = findEn(char.flavor_text_entries);

		return {
			description: entry ? entry.flavor_text.replace(/\f/g, '').replace(/\n/g, '\n') : 'No description about this Pokemon...',
			captureRate: char.capture_rate >= 200 ? 'Common' 
						: char.capture_rate >= 100 && char.capture_rate <= 199 ? 'Uncommon'
						: char.capture_rate >= 50 && char.capture_rate <= 99 ? 'Rare'
						: char.capture_rate < 50 ? 'Legendary' : 'Priceless pokemon',
			baseHappiness: char.base_happiness,
			color: char.color.name.charAt(0).toUpperCase() + char.color.name.slice(1),
			shape: char.shape.name.charAt(0).toUpperCase() + char.shape.name.slice(1),
			varieties: char.varieties.map(item => item.pokemon.name.charAt(0).toUpperCase() + item.pokemon.name.slice(1))
		}
	}

	const _transformAbilities = (char) => {
		const effectChanges = char.effect_changes.length === 0 ? null : findEn(char.effect_changes[0].effect_entries);
		const effectEntries = findEn(char.effect_entries);
		const flavorTextEntries = findEn(char.flavor_text_entries)
		
		return {
			effectChanges: effectChanges ? effectChanges.effect : null,
			effectEntries: effectEntries.effect,
			flavorTextEntries: flavorTextEntries.flavor_text
		}
	}

	return { loading, error, clearError, getPikachu, getDescription, getAbilities };
}

export default usePikachuService;