// mazeGenerator.ts
export type Cell = {
	top: boolean;
	right: boolean;
	bottom: boolean;
	left: boolean;
	visited: boolean;
};

export const generateMaze = (rows: number, cols: number): Cell[][] => {
	const maze: Cell[][] = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => ({
			top: true,
			right: true,
			bottom: true,
			left: true,
			visited: false,
		}))
	);

	const directions: [number, number, keyof Cell, keyof Cell][] = [
		[0, 1, "right", "left"], // right
		[1, 0, "bottom", "top"], // down
		[0, -1, "left", "right"], // left
		[-1, 0, "top", "bottom"], // up
	];

	const isValid = (x: number, y: number): boolean =>
		x >= 0 && y >= 0 && x < rows && y < cols;

	const carvePath = (x: number, y: number) => {
		maze[x][y].visited = true;
		const shuffledDirections = directions.sort(() => 0.5 - Math.random());

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

	carvePath(0, 0);

	// Ensure openings at the corners
	maze[0][0].left = false; // Start point opening
	maze[rows - 1][cols - 1].right = false; // End point opening

	return maze;
};
