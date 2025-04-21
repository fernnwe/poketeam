function app() {
  return {
    types: {},
    pokemons: [],
    team: [],
    filterType: [],
    uniqueID: 0,
    async fetchData() {
      this.types = await fetch("/types.json").then((response) =>
        response.json()
      );
      this.pokemons = await fetch("/pokemon.json").then((response) =>
        response.json()
      );
    },
    addToTeam(pokemon) {
      if (this.team.length < 6) {
        pokemon = Object.assign({}, pokemon);
        pokemon.uniqueID = this.uniqueID;
        this.uniqueID++;
        this.team.push(pokemon);
      }
    },
    removeFromTeam(pokemon) {
      this.team = this.team.filter((p) => p.uniqueID != pokemon.uniqueID);
    },
  };
}
