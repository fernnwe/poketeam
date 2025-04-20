function app() {
  return {
    types: {},
    pokemon: [],
    async fetchData() {
      this.types = await fetch("/types.json").then((response) =>
        response.json()
      );
      this.pokemon = await fetch("/pokemon.json").then((response) =>
        response.json()
      );
    },
  };
}
