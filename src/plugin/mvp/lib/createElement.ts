function createElement($node: JQuery, tag: string, ...classNames: string[]): JQuery {
  const element = `<${tag} class="${classNames.join(' ')}"></${tag}>`;

  $node.append(element);

  return $node.find(`.${classNames.join('.')}`);
}

export default createElement;
