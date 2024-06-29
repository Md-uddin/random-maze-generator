// mazeGenerator.ts
export type Cell = {
	top: boolean;
	right: boolean;
	bottom: boolean;
	left: boolean;
	visited: boolean;
};

export const generateMaze = (rows: number, cols: number): Cell[][] => {
	const maze: Cell[][] = [];

	// Initialize maze with all walls up and unvisited
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
		[0, 1, "right", "left"], // right
		[1, 0, "bottom", "top"], // down
		[0, -1, "left", "right"], // left
		[-1, 0, "top", "bottom"], // up
	];

	// Function to check if coordinates are within maze boundaries
	const isValid = (x: number, y: number): boolean =>
		x >= 0 && y >= 0 && x < rows && y < cols;

	// Recursive function to carve paths in the maze, ensuring connectivity
	const carvePath = (x: number, y: number) => {
		maze[x][y].visited = true; // Mark the current cell as visited
		const shuffledDirections = directions.sort(() => 0.5 - Math.random()); // Shuffle directions array

		for (const [dx, dy, wall, oppositeWall] of shuffledDirections) {
			const nx = x + dx; // Calculate new x coordinate
			const ny = y + dy; // Calculate new y coordinate
			if (isValid(nx, ny) && !maze[nx][ny].visited) {
				// Remove the wall between current cell and next cell
				maze[x][y][wall] = false;
				maze[nx][ny][oppositeWall] = false;
				carvePath(nx, ny); // Recursively call carvePath for the next cell
			}
		}
	};

	// Start carving paths from the top-left corner of the maze
	carvePath(0, 0);

	// Ensure openings at the corners of the maze
	maze[0][0].left = false; // Remove left wall of the starting point (top-left corner)
	maze[rows - 1][cols - 1].right = false; // Remove right wall of the ending point (bottom-right corner)

	// Connectivity check (Breadth-First Search)
	const bfs = (startX: number, startY: number): boolean => {
		const queue: [number, number][] = [[startX, startY]];
		const visited: boolean[][] = Array.from({ length: rows }, () =>
			Array(cols).fill(false)
		);
		visited[startX][startY] = true;

		while (queue.length > 0) {
			const [x, y] = queue.shift()!;
			if (x === rows - 1 && y === cols - 1) return true; // Found path to the end

			for (const [dx, dy, wall] of directions) {
				const nx = x + dx;
				const ny = y + dy;
				if (isValid(nx, ny) && !visited[nx][ny] && !maze[x][y][wall]) {
					visited[nx][ny] = true;
					queue.push([nx, ny]);
				}
			}
		}
		return false; // No path found to the end
	};

	// Ensure maze is solvable
	if (!bfs(0, 0)) {
		// If start to end path not found, regenerate maze
		return generateMaze(rows, cols);
	}

	return maze; // Return the generated maze
};
