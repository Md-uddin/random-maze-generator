export type Cell = {
	top: boolean;
	right: boolean;
	bottom: boolean;
	left: boolean;
	visited: boolean;
};

export const generateMaze = (rows: number, cols: number): Cell[][] => {
	// Initialize maze with all walls up and unvisited
	const maze: Cell[][] = [];
	for (let i = 0; i < rows; i++) {
		maze.push([]);
		for (let j = 0; j < cols; j++) {
			maze[i][j] = {
				top: true,
				right: true,
				bottom: true,
				left: true,
				visited: false,
			};
		}
	}

	const directions: [number, number, keyof Cell, keyof Cell][] = [
		[0, 1, "right", "left"],
		[1, 0, "bottom", "top"],
		[0, -1, "left", "right"],
		[-1, 0, "top", "bottom"],
	];

	// keeping the coordinates in the range
	const isValid = (x: number, y: number): boolean =>
		x >= 0 && y >= 0 && x < rows && y < cols;

	// carve paths in the maze using randomized Prim's algorithm
	const carvePath = (x: number, y: number) => {
		maze[x][y].visited = true; // Mark the current cell as visited
		const shuffledDirections = directions.sort(() => 0.5 - Math.random()); // Shuffle directions array

		for (const [dx, dy, wall, oppositeWall] of shuffledDirections) {
			const nx = x + dx;
			const ny = y + dy;
			if (isValid(nx, ny) && !maze[nx][ny].visited) {
				maze[x][y][wall] = false;
				maze[nx][ny][oppositeWall] = false;
				carvePath(nx, ny);
			}
		}
	};

	// Start making path from the top-left corner
	carvePath(0, 0);

	// Ensure openings at the corners of the maze
	maze[0][0].left = false;
	maze[rows - 1][cols - 1].right = false;

	return maze;
};
