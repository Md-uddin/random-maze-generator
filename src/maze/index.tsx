// Maze.tsx
import React from "react";
import { Cell } from "./generate-maze";

interface MazeProps {
	maze: Cell[][];
}

const Maze: React.FC<MazeProps> = ({ maze }) => {
	const cellSize = Math.round(500 / maze.length);
	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: `repeat(${maze.length}, ${cellSize}px)`,
				gridTemplateColumns: `repeat(${maze[0].length}, ${cellSize}px)`,
			}}>
      {maze.flatMap((row, i) =>
        // with visible and invisible borders building the walls of maze
				row.map((cell, j) => (
					<div
						key={`${i}-${j}`}
						style={{
							width: cellSize,
							height: cellSize,
							borderTop: cell.top ? "1px solid black" : "1px solid transparent",
							borderRight: cell.right
								? "1px solid black"
								: "1px solid transparent",
							borderBottom: cell.bottom
								? "1px solid black"
								: "1px solid transparent",
							borderLeft: cell.left
								? "1px solid black"
								: "1px solid transparent",
						}}
					/>
				))
			)}
		</div>
	);
};

export default Maze;
