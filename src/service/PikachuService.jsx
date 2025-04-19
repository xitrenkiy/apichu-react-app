import useHttp from "../hooks/http.hook";

const usePikachuService = () => {
	const _baseApi = 'https://pokeapi.co/api/v2/';
	const _baseOffset = 0;

	const { loading, error, request, clearError } = useHttp();

	const getPikachu = async (id) => {
		const response = await request(`${_baseApi}pokemon/${id}`);
		return _transformPikachu(response);
	}

	const _transformPikachu = (char) => {
		return {
			id: char.id,
			name: char.name,
			height: char.height,
			weight: char.weight,
			photo: char.sprites.other.dream_world.front_default,
			types: char.types.map(item => item.type.name),
			baseStates: char.stats.map(stat => ({
				name: stat.stat.name,
				value: stat.base_stat
			}))
		}
	}

	return { loading, error, clearError, getPikachu };
}

export default usePikachuService;