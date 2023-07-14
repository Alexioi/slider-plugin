const getPosition = (node: Element, event: PointerEvent, isVertical: boolean): number => {
  const { height, width, left, top } = node.getBoundingClientRect();
  const { clientX, clientY } = event;

  if (isVertical) {
    return (clientY - top) / height;
  }

  return (clientX - left) / width;
};

export { getPosition };
