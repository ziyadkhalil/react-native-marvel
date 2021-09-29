type AppStackParams = {
  Home: undefined;
  Search: undefined;
  Character: {character: Character};
  Image: {uri: stirng; id: number};
};

type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: Image;
  comics: List;
  series: List;
  stories: List;
  events: List;
};

type Image = {path: string; extension: string};

type Summary = {name: string};

type List = {items: Summary[]};

type Thumbnail = {thumbnail: Image};
type Resource = Summary & Partial<Thumbnail & {id: number; title: string}>;
