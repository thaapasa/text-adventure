import { Game, Scene } from './Game';

const scenes: Scene[] = [
  { id: 'risteys', name: 'Tienristeys',
    text: 'Eräänä päivänä Fluttershy oli kävelyllä. Hän tuli risteykseen.',
    question: 'Minne Fluttershy meni?',
    choices: [
      { text: 'Vasemmalle', sceneId: 'niitty' },
      { text: 'Oikealle', sceneId: 'leikkipuisto' },
      { text: 'Suojatien yli', sceneId: 'toinen-risteys' },
    ] },
  { id: 'niitty', name: 'Kaunis niitty',
    text: 'Fluttershy päätyi kauniille niitylle jossa hän lepäili loppupäivän.' },
  { id: 'leikkipuisto', name: 'Leikkipuistossa',
    text: 'Fluttershy päätyi leikkipuistoon jossa vierähtikin koko loppupäivä.' },
  { id: 'toinen-risteys', name: 'Taas risteyksessä',
    text: 'Fluttershy käveli eteenpäin, kunnes poliisi pysäytti hänet. ' +
    'Sitten poliisi huomasi että Fluttershy ei ollutkaan roisto ja sanoi: ' +
    '"Anteeksi, luulin sinua roistoksi" ja väistyi tieltä. ' +
    'Fluttershy alkoi kaivaa kiikareita esiin ja lopulta hän löysi ne. ' +
    'Sitten hän alkoi kiikaroida mitä näkyisi edessä, mutta edessä oli niin paljon ' +
    'metsikköä, että hän ei nähnyt mitään muuta kuin puita, pensaita ja muita kasveja sotkuisina. ' +
    'Taas hän päätyi risteykseen.',
    question: 'Minne Fluttershy menee?',
    choices: [
      { text: 'Oikealle', sceneId: 'satumaa' },
      { text: 'Vasemmalle', sceneId: 'metsä' },
      { text: 'Suoraan eteen', sceneId: 'salakäytävä' },
    ] },
  { id: 'satumaa', name: 'Satumaa',
    text: 'Yht\'äkkiä Fluttershyn eteen ilmestyi ihana satumaa, jonne Fluttershy ' +
    'lähti leikkimään loppupäiväksi.'
  },
  { id: 'metsä', name: 'Metsä', text: 'Fluttershy meni metsään' },
  { id: 'salakäytävä', name: 'Salakäytävä',
    text: 'Sitten Fluttershy huomasi jossain kaukana luolan, missä oli pilkkopimeää. ' +
    'Fluttershy alkoi juosta eteenpäin pimeässä metsässä kunnes hän pääsi luolalle. ' +
    'Hän vähän kurkisti sinne uteliaasti. Hän näki pelkkiä hämähäkinseittejä ja muutaman ' +
    'tulikärpäsen. Vaikka häntä kiinnostikin se, hän meni hakemaan kaverinsa. Kun he ovat ' +
    'saapuneet paikalle, he menivät vähän lähemmäksi ja Fluttershy sanoi: ' +
    '"Mennään sisälle, alkaa jo sataakin." He kävelivät sisään jonkin matkaa, kunnes he ' +
    'päätyivät...',
    question: 'Minne Fluttershy ja kaverit päätyivät?',
    choices: [
      { text: 'Suolle', sceneId: 'suo' },
      { text: 'Joelle', sceneId: 'joki' },
      { text: 'Isolle kuopalle', sceneId: 'iso-kuoppa' },
    ] },
  { id: 'suo', name: 'Suo', 
    text: 'Ystävykset päätyivät suolle. Sitten he huomasivat, että suossa oli mättäitä ja silta.',
    question: 'Miten ystävykset etenivät?',
    choices: [
      { text: 'Kävelivät sillan yli', sceneId: 'suon-yli' },
      { text: 'Pomppivat mättäitä pitkin', sceneId: 'suon-yli' },
    ],
  },
  { id: 'suon-yli', name: 'Tunneli', 
    text: 'Suon jälkeen ystävykset kävelivät tunnelia pitkin kunnes he päätyivät portille, ' +
    'joka säteili valoa. He astelivat portin reunalle ja näkivät siellä ...',
    question: 'Mitä ystävykset näkivät portin reunalla?',
    choices: [
      { text: 'Keijumaan', sceneId: 'keijumaa' },
      { text: 'Prinsessamaan', sceneId: 'prinsessamaa' },
      { text: 'Merenneitomaan', sceneId: 'merenneitomaa' },
      { text: 'Satumaan', sceneId: 'satumaa' },
      { text: 'Pikkuoliomaan', sceneId: 'pikkuoliomaa' },
    ],
  },
  { id: 'joki', name: 'Joki', text: 'Ystävykset päätyivät joelle.' },
  { id: 'iso-kuoppa', name: 'Iso kuoppa', text: 'Ystävykset päätyivät isoon kuoppaan.' },    
  { id: 'keijumaa', name: 'Keijumaa', text: 'Keijumetsässä oli kivaa' },
  { id: 'prinsessamaa', name: 'Prinsessamaa', text: 'Prinsessamaassa oli hauskaa' },
  { id: 'merenneitomaa', name: 'Merenneitomaa', text: 'Merenneitomaassa oli märkää' },
  { id: 'pikkuoliomaa', name: 'Pikkuoliomaa', text: 'Pikkuoliomaassa oli pientä' },
];

const sceneMap: { [id: string]: Scene } = {};
scenes.forEach(s => sceneMap[s.id] = s);

class GameService {
  public async getGames(): Promise<Game[]> {
    return [{
      name: 'Sweetie Bell, Apple Bloom ja Fluttershy salakäytävässä',
      id: 'ab1',
    }];
  }

  public async getStart(game: Game): Promise<Scene> {
    return sceneMap.risteys;
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    return sceneMap[sceneId];
  }
}

export const gameService = new GameService();
