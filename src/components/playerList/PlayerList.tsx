import React, { useEffect, useRef, useState } from "react";
import { IconButton, SelectPicker } from "rsuite";
import "./player-list.scss";
import { Color, Player } from "../../types";
import StarIcon from "@rsuite/icons/legacy/Star";
import CloseIcon from "@rsuite/icons/legacy/Close";

export interface PlayerListProps {
  players: Player[];
  mode: "search_results" | "favorites";
  onStarred?: (player: Player) => void;
  onUnstarred?: (player: Player) => void;
}

const colors: Color[] = [
  { label: "White", value: "white" },
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  mode,
  onStarred,
  onUnstarred,
}) => {
  const [color, setColor] = useState<Color>(colors[0]);

  const star = (player: Player) => {
    if (onStarred) onStarred(player);
  };

  const unstar = (player: Player) => {
    if (onUnstarred) onUnstarred(player);
  };

  const onColorChange = (value: string | null) => {
    if (value) {
      const color = colors.find((c) => c.value === value);
      if (color) setColor(color);
    }
  };

  return (
    <div style={ { backgroundColor: color?.value } }>
      <div><SelectPicker data={colors} placeholder="Color" onChange={(value) => onColorChange(value)} /></div>
      {players.length === 0 ? (
        <div>No Results</div>
      ) : (
        <div className="player-list">
          {players.map((player) => (
            <div className="player-row" key={player.id}>
              {player.first_name} {player.last_name}&nbsp;&nbsp;
              {mode === "favorites" ? (
                <IconButton
                  icon={<CloseIcon />}
                  appearance="primary"
                  color="blue"
                  circle
                  size="xs"
                  onClick={() => unstar(player)}
                />
              ) : (
                <IconButton
                  icon={<StarIcon />}
                  appearance="primary"
                  color="yellow"
                  circle
                  size="xs"
                  onClick={() => star(player)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerList;
