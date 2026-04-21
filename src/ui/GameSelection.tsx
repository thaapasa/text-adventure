import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import "./GameSelection.css";
import Page from "./Page";
import { Game } from "../data/Game";
import { gameService } from "../data/GameService";
import { ImageTile } from "./ImageTile";
import { NavigateFn } from "./GamePage";

const log = debug("game:selection");

function GameIcon({ game, navigate }: { game: Game; navigate: NavigateFn }) {
  const selectGame = () => {
    if (game.startSceneId) {
      navigate(gameService.getGameLink(game));
    }
  };
  return (
    <ImageTile className="Game" url={game.image} onClick={selectGame}>
      <h2 className="GameTitle">{game.name}</h2>
    </ImageTile>
  );
}

export default function GameSelection() {
  const [games, setGames] = useState<Game[]>([]);
  const rrNavigate = useNavigate();
  const navigate: NavigateFn = (path) => rrNavigate(path);

  useEffect(() => {
    let cancelled = false;
    gameService.getGames().then((loaded) => {
      if (!cancelled) {
        setGames(loaded);
        log("Game list", loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Page
      title="Pelit"
      className="GameSelection"
      navigate={navigate}
      allowScroll={true}
    >
      <div className="GameIconArea">
        {games.map((g) => (
          <GameIcon game={g} key={g.id} navigate={navigate} />
        ))}
      </div>
    </Page>
  );
}
