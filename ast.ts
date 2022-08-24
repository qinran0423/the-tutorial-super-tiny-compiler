export enum TokenTypes {
  Paren,
  Name,
  Number,
  String
}

export interface Token {
  type: TokenTypes
  value: string
}

export enum NodeType {
  Root = "Root",
  Number = "Number",
  CallExpression = "CallExpression",
  String = "String"
}

export interface Node {
  type: NodeType
}

export type ChildNode = NumberNode | CallExpressionNode | StringNode

export interface RootNode extends Node {
  body: ChildNode[]
  type: NodeType.Root
}

export interface NumberNode extends Node {
  value: string
  type: NodeType.Number
}

export interface StringNode extends Node {
  value: string
  type: NodeType.String
}

export interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
  type: NodeType.CallExpression
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

export function createStringNode(value: string): StringNode {
  return {
    type: NodeType.String,
    value
  }
}
