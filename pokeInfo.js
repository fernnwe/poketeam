function app() {
  return {
    types: {},
    pokemons: [],
    async fetchData() {
      this.types = await fetch("/types.json").then((response) =>
        response.json()
      );
      this.pokemons = await fetch("/pokemon.json").then((response) =>
        response.json()
      );
    },
  };
}
