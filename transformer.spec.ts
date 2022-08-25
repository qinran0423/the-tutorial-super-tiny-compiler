import { expect, test } from "vitest"
import { NodeType, RootNode } from "./ast"
import { transformer } from "./transformer"

test("transformer", () => {
  const originalAST: RootNode = {
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

  const transformedAST = {
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
  expect(transformer(originalAST)).toEqual(transformedAST)
})
