import { test, expect } from "vitest"
import { NodeType } from "./ast"
import { codegen } from "./codegen"

test("codegen", () => {
  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.ExpressionStatement,
        expression: {
          type: NodeType.CallExpression,
          callee: {
            type: "Identifier",
            name: "add"
          },
          arguments: [
            {
              type: NodeType.NumberLiteral,
              value: "2"
            },
            {
              type: NodeType.CallExpression,
              callee: {
                type: "Identifier",
                name: "subtract"
              },
              arguments: [
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
      }
    ]
  }

  expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
})

test("codegen", () => {
  const ast = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.ExpressionStatement,
        expression: {
          type: NodeType.CallExpression,
          callee: {
            type: "Identifier",
            name: "add"
          },
          arguments: [
            {
              type: NodeType.NumberLiteral,
              value: "2"
            },
            {
              type: NodeType.CallExpression,
              callee: {
                type: "Identifier",
                name: "subtract"
              },
              arguments: [
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
      },
      {
        type: NodeType.ExpressionStatement,
        expression: {
          type: NodeType.CallExpression,
          callee: {
            type: "Identifier",
            name: "add"
          },
          arguments: [
            {
              type: NodeType.NumberLiteral,
              value: "2"
            },
            {
              type: NodeType.CallExpression,
              callee: {
                type: "Identifier",
                name: "subtract"
              },
              arguments: [
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
      }
    ]
  }

  expect(codegen(ast)).toMatchInlineSnapshot(
    '"add(2, subtract(4, 2));add(2, subtract(4, 2));"'
  )
})
