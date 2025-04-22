function app() {
  return {
    types: {},
    pokemons: [],
    team: [],
    filterType: [],
    defenseScore: {},
    attackScore: {},
    totalDefenseScore: 0,
    totalAttackScore: 0,
    uniqueID: 0,
    calculateDefense(attackType, pokemonTypes) {
      let multiplier = 1;
      pokemonTypes.forEach((type) => {
        const typeData = this.types[type];
        if (typeData.double_damage_from.includes(attackType)) multiplier *= 2;
        if (typeData.half_damage_from.includes(attackType)) multiplier *= 0.5;
        if (typeData.no_damage_from.includes(attackType)) multiplier *= 0;
      });
      return (multiplier - 1) * -1;
    },
    calculateAttack(defendingType, pokemonTypes) {
      let totalEffectiveness = 0;

      pokemonTypes.forEach((attackingType) => {
        const defendingData = this.types[defendingType];
        if (!defendingData) return;

        if (defendingData.double_damage_from.includes(attackingType)) {
          totalEffectiveness += 1;
        } else if (defendingData.half_damage_from.includes(attackingType)) {
          totalEffectiveness -= 0.5;
        } else if (defendingData.no_damage_from.includes(attackingType)) {
          totalEffectiveness -= 1.5;
        }
      });

      return totalEffectiveness / pokemonTypes.length;
    },
    recalculateTotals() {
      this.totalDefenseScore = 0;
      for (const type in this.defenseScore) {
        this.totalDefenseScore += this.defenseScore[type];
      }
      this.totalAttackScore = 0;
      for (const type in this.attackScore) {
        this.totalAttackScore += this.attackScore[type];
      }
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
        for (const type in this.types) {
          let effectiveness = this.calculateDefense(type, pokemon.types);
          this.defenseScore[type] += effectiveness;
          effectiveness = this.calculateAttack(type, pokemon.types);
          this.attackScore[type] += effectiveness;
        }
        this.recalculateTotals();
      }
    },
    removeFromTeam(pokemon) {
      for (const type in this.types) {
        let effectiveness = this.calculateDefense(type, pokemon.types);
        this.defenseScore[type] -= effectiveness;
        effectiveness = this.calculateAttack(type, pokemon.types);
        this.attackScore[type] -= effectiveness;
      }
      this.team = this.team.filter((p) => p.uniqueID != pokemon.uniqueID);
      this.recalculateTotals();
    },
  };
}
