// App.tsx
import React, { useState } from "react";
import { Cell, generateMaze } from "./maze/generate-maze";
import Maze from "./maze";
import "./App.css";

const App: React.FC = () => {
	const [maze, setMaze] = useState<Cell[][]>(generateMaze(25, 25));

	const regenerateMaze = () => {
		setMaze(generateMaze(25, 25));
	};

	return (
    <div className="App">
      
			<Maze maze={maze} />
			<button onClick={regenerateMaze}>Generate New Maze</button>
		</div>
	);
};

export default App;
