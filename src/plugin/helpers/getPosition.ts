const getPosition = (node: Element, event: PointerEvent): { x: number; y: number } => {
  const { height, width, left, top } = node.getBoundingClientRect();
  const { clientX, clientY } = event;

  const x = (clientX - left) / width;
  const y = (clientY - top) / height;

  return { x, y };
};

export { getPosition };
