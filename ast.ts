export enum TokenTypes {
  Paren,
  Name,
  Number
}

export interface Token {
  type: TokenTypes
  value: string
}

export enum NodeType {
  Root,
  Number,
  CallExpression
}

export interface Node {
  type: NodeType
}

export type ChildNode = NumberNode | CallExpressionNode

export interface RootNode extends Node {
  body: ChildNode[]
}

export interface NumberNode extends Node {
  value: string
}

export interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
}

export function createRootNode(): RootNode {
  return {
    type: NodeType.Root,
    body: []
  }
}

export function createNumberNode(value: string): NumberNode {
  return {
    type: NodeType.Number,
    value
  }
}

export function createCallExpression(name: string): CallExpressionNode {
  return {
    type: NodeType.CallExpression,
    name,
    params: []
  }
}
