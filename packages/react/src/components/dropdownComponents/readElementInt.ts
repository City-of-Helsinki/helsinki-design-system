export function readElementInt(root: ParentNode, id: string): number {
  const element = root.querySelector(`#${id}`) as HTMLElement;
  return Number.parseInt(element.innerHTML, 10);
}
