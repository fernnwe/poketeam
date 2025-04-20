const types = [
  {
    id: 1,
    name: "normal",
    double_damage_from: ["fighting"],
    half_damage_from: [],
    no_damage_from: ["ghost"],
    double_damage_to: [],
    half_damage_to: ["rock"],
    no_damage_to: ["ghost"],
  },
  {
    id: 10,
    name: "fire",
    double_damage_from: ["water", "ground", "rock"],
    half_damage_from: ["fire", "grass", "ice", "bug"],
    no_damage_from: [],
    double_damage_to: ["grass", "ice", "bug"],
    half_damage_to: ["fire", "water", "rock", "dragon"],
    no_damage_to: [],
  },
  {
    id: 11,
    name: "water",
    double_damage_from: ["electric", "grass"],
    half_damage_from: ["fire", "water", "ice"],
    no_damage_from: [],
    double_damage_to: ["fire", "ground", "rock"],
    half_damage_to: ["water", "grass", "dragon"],
    no_damage_to: [],
  },
  {
    id: 13,
    name: "electric",
    double_damage_from: ["ground"],
    half_damage_from: ["electric", "flying"],
    no_damage_from: [],
    double_damage_to: ["water", "flying"],
    half_damage_to: ["electric", "grass", "dragon"],
    no_damage_to: ["ground"],
  },
  {
    id: 12,
    name: "grass",
    double_damage_from: ["fire", "ice", "poison", "flying", "bug"],
    half_damage_from: ["water", "electric", "grass", "ground"],
    no_damage_from: [],
    double_damage_to: ["water", "ground", "rock"],
    half_damage_to: ["fire", "grass", "poison", "flying", "bug", "dragon"],
    no_damage_to: [],
  },
  {
    id: 15,
    name: "ice",
    double_damage_from: ["fire", "fighting", "rock"],
    half_damage_from: ["ice"],
    no_damage_from: [],
    double_damage_to: ["grass", "ground", "flying", "dragon"],
    half_damage_to: ["fire", "water", "ice"],
    no_damage_to: [],
  },
  {
    id: 2,
    name: "fighting",
    double_damage_from: ["flying", "psychic"],
    half_damage_from: ["bug", "rock"],
    no_damage_from: [],
    double_damage_to: ["normal", "ice", "rock"],
    half_damage_to: ["poison", "flying", "psychic", "bug"],
    no_damage_to: ["ghost"],
  },
  {
    id: 4,
    name: "poison",
    double_damage_from: ["ground", "psychic"],
    half_damage_from: ["grass", "fighting", "poison", "bug"],
    no_damage_from: [],
    double_damage_to: ["grass", "bug"],
    half_damage_to: ["poison", "ground", "rock", "ghost"],
    no_damage_to: [],
  },
  {
    id: 5,
    name: "ground",
    double_damage_from: ["water", "grass", "ice"],
    half_damage_from: ["poison", "rock"],
    no_damage_from: ["electric"],
    double_damage_to: ["fire", "electric", "poison", "rock"],
    half_damage_to: ["grass", "bug"],
    no_damage_to: ["flying"],
  },
  {
    id: 3,
    name: "flying",
    double_damage_from: ["electric", "ice", "rock"],
    half_damage_from: ["grass", "fighting", "bug"],
    no_damage_from: ["ground"],
    double_damage_to: ["grass", "fighting", "bug"],
    half_damage_to: ["electric", "rock"],
    no_damage_to: [],
  },
  {
    id: 14,
    name: "psychic",
    double_damage_from: ["bug"],
    half_damage_from: ["fighting", "psychic"],
    no_damage_from: [],
    double_damage_to: ["fighting", "poison"],
    half_damage_to: ["psychic"],
    no_damage_to: [],
  },
  {
    id: 7,
    name: "bug",
    double_damage_from: ["fire", "flying", "rock"],
    half_damage_from: ["grass", "fighting", "ground"],
    no_damage_from: [],
    double_damage_to: ["grass", "psychic"],
    half_damage_to: ["fire", "fighting", "flying", "ghost"],
    no_damage_to: [],
  },
  {
    id: 6,
    name: "rock",
    double_damage_from: ["water", "grass", "fighting", "ground"],
    half_damage_from: ["normal", "fire", "poison", "flying"],
    no_damage_from: [],
    double_damage_to: ["fire", "ice", "flying", "bug"],
    half_damage_to: ["fighting", "ground"],
    no_damage_to: [],
  },
  {
    id: 8,
    name: "ghost",
    double_damage_from: [],
    half_damage_from: [],
    no_damage_from: ["normal", "fighting"],
    double_damage_to: ["ghost"],
    half_damage_to: [],
    no_damage_to: ["normal", "psychic"],
  },
  {
    id: 16,
    name: "dragon",
    double_damage_from: [],
    half_damage_from: ["fire", "water", "electric", "grass"],
    no_damage_from: [],
    double_damage_to: ["dragon"],
    half_damage_to: [],
    no_damage_to: [],
  },
];

function getTypes() {
  return {
    sprites: {},
    async fetchTypes() {
      const api = "https://pokeapi.co/api/v2/generation/1/";
      const response = await fetch(api);
      const json = await response.json();
      const typeUrls = json.types.map((type) => type.url);
      const typesData = await Promise.all(
        typeUrls.map((url) => fetch(url).then((res) => res.json()))
      );
      console.log(json.pokemon_species);
      typesData.forEach((type) => {
        this.sprites[
          type.name
        ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/diamond-pearl/${type.id}.png`;
      });
    },
  };
}
