function app() {
  return {
    types: {},
    pokemons: [],
    team: [],
    filterType: [],
    defenseScore: {},
    attackScore: {},
    uniqueID: 0,
    calculateEffectiveness(pokemonTypes) {
      let multiplier = 1;
      pokemonTypes.forEach((type) => {
        const typeData = this.types[type];
        if (typeData.double_damage_from.forEach(attackType)) multiplier *= 2;
        if (typeData.half_damage_from.includes(attackType)) multiplier *= 0.5;
        if (typeData.no_damage_from.includes(attackType)) multiplier *= 0;
      });
      return multiplier;
    },
    async fetchData() {
      this.types = await fetch("/types.json").then((response) =>
        response.json()
      );
      this.pokemons = await fetch("/pokemon.json").then((response) =>
        response.json()
      );
      for (const type in this.types) {
        this.defenseScore[type] = 0;
        this.attackScore[type] = 0;
      }
      console.log(this.types);
      console.log(this.pokemons);
      console.log(this.defenseScore);
    },
    addToTeam(pokemon) {
      if (this.team.length < 6) {
        pokemon = Object.assign({}, pokemon);
        pokemon.uniqueID = this.uniqueID;
        this.uniqueID++;
        this.team.push(pokemon);
      }
      pokemon.types.forEach((type) => {
        this.types[type].double_damage_from.forEach((damage) => {
          this.defenseScore[damage]--;
        });
        this.types[type].half_damage_from.forEach((damage) => {
          this.defenseScore[damage] += 0.5;
        });
        this.types[type].no_damage_from.forEach((damage) => {
          this.defenseScore[damage] += 1.5;
        });
        this.types[type].double_damage_to.forEach((damage) => {
          this.attackScore[damage]++;
        });
        this.types[type].half_damage_to.forEach((damage) => {
          this.attackScore[damage] -= 0.5;
        });
        this.types[type].no_damage_to.forEach((damage) => {
          this.attackScore[damage] -= 1.5;
        });
      });
    },
    removeFromTeam(pokemon) {
      pokemon.types.forEach((type) => {
        this.types[type].double_damage_from.forEach((damage) => {
          this.defenseScore[damage]++;
        });
        this.types[type].half_damage_from.forEach((damage) => {
          this.defenseScore[damage] -= 0.5;
        });
        this.types[type].no_damage_from.forEach((damage) => {
          this.defenseScore[damage] -= 1.5;
        });
        this.types[type].double_damage_to.forEach((damage) => {
          this.attackScore[damage]--;
        });
        this.types[type].half_damage_to.forEach((damage) => {
          this.attackScore[damage] += 0.5;
        });
        this.types[type].no_damage_to.forEach((damage) => {
          this.attackScore[damage] += 1.5;
        });
      });
      this.team = this.team.filter((p) => p.uniqueID != pokemon.uniqueID);
    },
  };
}
