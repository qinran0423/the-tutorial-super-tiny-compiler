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
  Program = "Program",
  ExpressionStatement = "ExpressionStatement",
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression",
  StringLiteralNode = "StringLiteralNode"
}

export interface Node {
  type: NodeType
}

export type ChildNode = NumberLiteralNode | CallExpressionNode | StringNode

export interface RootNode extends Node {
  body: ChildNode[]
  type: NodeType.Program
  context?: ChildNode[]
}

export interface NumberLiteralNode extends Node {
  value: string
  type: NodeType.NumberLiteral
}

export interface StringNode extends Node {
  value: string
  type: NodeType.StringLiteralNode
}

export interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
  type: NodeType.CallExpression
  context?: CallExpressionAst[]
}

interface Callee {
  type: string
  name: string
}

export interface CallExpressionAst extends Node {
  callee: Callee
  argument: []
}

export function createRootNode(): RootNode {
  return {
    type: NodeType.Program,
    body: []
  }
}

export function createNumberLiteralNodeNode(value: string): NumberLiteralNode {
  return {
    type: NodeType.NumberLiteral,
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
    type: NodeType.StringLiteralNode,
    value
  }
}
