function hasCollided(
  rect1: { x: number; y: number; w: number; h: number },
  rect2: { x: number; y: number; w: number; h: number }
) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

export { hasCollided };
