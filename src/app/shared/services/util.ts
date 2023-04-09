import { Pokemon } from '../models/pokemon.model';
import { POKEDEX } from '../pokedata/pokedex';

export function pokemonsFilter(f: any) {
  const filterName = (p: Pokemon) => {
    return (
      typeof f.name == 'undefined' ||
      f.name == '' ||
      p.name.toLowerCase().includes(f.name.toLowerCase()) ||
      ('0' + pad('' + p.pokedex_number)).includes(f.name)
    );
  };

  const filterType = (p: Pokemon) => {
    const type1 = (p?.type_1 || 'not_Set').toLowerCase();
    const type2 = (p?.type_2 || 'not_Set').toLowerCase();

    return (
      typeof f.types == 'undefined' ||
      f.types.length == 0 ||
      f.types.includes(type1) ||
      f.types.includes(type2)
    );
  };

  const filterGeneration = (p: Pokemon) => {
    return (
      typeof f.generations == 'undefined' ||
      f.generations.length == 0 ||
      f.generations.includes('' + p.generation)
    );
  };

  const filterFn = (p: Pokemon) =>
    filterName(p) && filterType(p) && filterGeneration(p);

  return POKEDEX.filter(filterFn);
}

function pad(num: string, size: number = 3) {
  while (num.length < size) num = '0' + num;
  return num;
}
