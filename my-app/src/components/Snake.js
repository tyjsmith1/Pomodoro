import React, { useState, useEffect } from "react";

const numRows = 10;
const numCols = 10;

const Snake = () => {
  const getRandomFoodPosition = () => {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    return { row, col };
  };

  const [snake, setSnake] = useState([{ row: 0, col: 0 }]);
  const [food, setFood] = useState(getRandomFoodPosition());
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = snake.map((segment) => ({ ...segment }));
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.row -= 1;
        break;
      case "DOWN":
        head.row += 1;
        break;
      case "LEFT":
        head.col -= 1;
        break;
      case "RIGHT":
        head.col += 1;
        break;
      default:
        break;
    }

    // Check for collision with walls
    if (
      head.row < 0 ||
      head.row >= numRows ||
      head.col < 0 ||
      head.col >= numCols
    ) {
      setGameOver(true);
      return;
    }

    // Check for collision with self
    if (
      newSnake.some(
        (segment) => segment.row === head.row && segment.col === head.col
      )
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check for collision with food
    if (head.row === food.row && head.col === food.col) {
      setFood(getRandomFoodPosition());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const intervalId = setInterval(moveSnake, 300);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div>
      <h1>{gameOver ? "Game Over" : "Snake Game"}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 30px)`,
        }}
      >
        {Array.from({ length: numRows * numCols }).map((_, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;

          const isSnakeSegment = snake.some(
            (segment) => segment.row === row && segment.col === col
          );
          const isFood = food.row === row && food.col === col;

          return (
            <div
              key={index}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: isSnakeSegment
                  ? "green"
                  : isFood
                    ? "red"
                    : "white",
                border: "1px solid black",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Snake;
