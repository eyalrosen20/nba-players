import React, { useState, useEffect } from "react";
import "./App.scss";
import { Player } from "../../types";
import { fetchPlayers } from "../../services/nbaApiService";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import PlayerList from "../playerList/PlayerList";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Player[]>();
  const [favorites, setFavorites] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const search = async () => {
    setSearchResults(undefined);
    const fetchedPlayers = await fetchPlayers(searchTerm);
    setSearchResults(fetchedPlayers);
  };

  useEffect(() => {
    //start by performing an empty search
    search();
  }, []);

  const onStarred = (player: Player) => {
    if (searchResults) {
      const newSearchResults = searchResults.filter((p) => p !== player);
      setSearchResults(newSearchResults);

      const newFavorites = favorites.concat(player);
      setFavorites(newFavorites);

      console.log(
        `added ${player.first_name} ${player.last_name} to favorites`,
        {
          player,
        }
      );
    }
  };

  const onUnstarred = (player: Player) => {
    if (searchResults) {
      const newFavorites = favorites.filter((p) => p !== player);
      setFavorites(newFavorites);

      console.log(
        `removed ${player.first_name} ${player.last_name} from favorites`,
        { player }
      );
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      search();
    }
  };

  return (
    <div id="wrapper">
      <InputGroup size="lg" inside>
        <Input placeholder="Search..." onChange={(value) => setSearchTerm(value)} onKeyDown={handleSearchKeyDown} />
        <InputGroup.Button onClick={search}>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>

      <div id="lists-container">
        <div className="player-list-container">
          <h2>Players</h2>
          {searchResults ? (
            <PlayerList
              players={searchResults}
              mode="search_results"
              onStarred={onStarred}
            />
          ) : (
            <div id="loading">Loading...</div>
          )}
        </div>
        <div className="player-list-container">
          <h2>Favorites</h2>
          <PlayerList
            players={favorites}
            mode="favorites"
            onUnstarred={onUnstarred}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
