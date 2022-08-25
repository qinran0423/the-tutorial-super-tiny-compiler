import { expect, test } from "vitest"
import { NodeType, TokenTypes } from "./ast"
import { parser } from "./parser"
test("tokenizer", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" }
  ]

  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.NumberLiteral,
            value: "2"
          },
          {
            type: NodeType.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeType.NumberLiteral,
                value: "4"
              },
              {
                type: NodeType.NumberLiteral,
                value: "2"
              }
            ]
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test("number", () => {
  const tokens = [
    {
      type: TokenTypes.Number,
      value: "2"
    }
  ]

  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.NumberLiteral,
        value: "2"
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test("name", () => {
  const tokens = [{ type: TokenTypes.String, value: "hello" }]

  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.StringLiteralNode,
        value: "hello"
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test("CallExpression", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" }
  ]

  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.NumberLiteral,
            value: "2"
          },
          {
            type: NodeType.NumberLiteral,
            value: "4"
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test("two CallExpression", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "3" },
    { type: TokenTypes.Number, value: "5" },
    { type: TokenTypes.Paren, value: ")" }
  ]

  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.NumberLiteral,
            value: "2"
          },
          {
            type: NodeType.NumberLiteral,
            value: "4"
          }
        ]
      },
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.NumberLiteral,
            value: "3"
          },
          {
            type: NodeType.NumberLiteral,
            value: "5"
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})
