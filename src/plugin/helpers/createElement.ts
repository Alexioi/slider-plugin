const createElement = (className: string): HTMLDivElement => {
  const node = document.createElement('div');
  node.classList.add(className);
  return node;
};

export { createElement };
