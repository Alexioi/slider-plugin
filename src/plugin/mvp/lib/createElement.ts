function createElement($node: JQuery, tag: string, className: string): JQuery {
  const element = `<${tag} class="${className}"></${tag}>`;

  $node.append(element);

  return $node.find(`.${className}`).last();
}

export default createElement;
