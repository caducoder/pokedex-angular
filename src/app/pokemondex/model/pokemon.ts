export interface PokemonList { 
  count: number;
  next: string;
  previous?: null;
  results?: (Results)[] | null;
}
export interface Results { 
  name: string;
  url: string;
}
export interface Ability { 
  name: string;
  url: string;
}
export interface Abilities { 
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}
export interface BriefPokemon {
  name: string;
  order: string;
  types?: (Types)[] | null;
  color: string;
  front_default: string
}
export interface PokemonDetails extends Pokemon {
  weightInKg: string
  weightInLbs: string;
  joinedAbilities: string;
  heightInMeters: string;
  total?: number;
}
export interface Pokemon { 
  abilities: Abilities[];
  held_items?: any[] | null;
  id: number;
  is_default: boolean;
  moves?: (Moves)[] | null;
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats?: (Stats)[] | null;
  types?: (Types)[] | null;
  height: number;
  weight: number;
}
export interface Forms { 
  name: string;
  url: string;
}
export interface Move { 
  name: string;
  url: string;
}
export interface Moves { 
  move: Move;
  version_group_details?: VersionGroupDetails[] | null;
}
export interface VersionGroupDetails { 
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}
export interface MoveLearnMethod { 
  name: string;
  url: string;
}
export interface VersionGroup { 
  name: string;
  url: string;
}
export interface Species { 
  name: string;
  url: string;
}
export interface Sprites { 
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
  other: Other;
}
export interface DreamWorld { 
  front_default: string;
  front_female?: null;
}
export interface Other { 
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}
export interface Home { 
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface OfficialArtwork { 
  front_default: string;
  front_shiny: string;
}
export interface Stats { 
  base_stat: number;
  effort: number;
  stat: Stat;
}
export interface Stat { 
  name: string;
  url: string;
}
export interface Types { 
  slot: number;
  type: Type;
}
export interface Type { 
  name: string;
  url: string;
}
