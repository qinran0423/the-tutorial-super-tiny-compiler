import { test, expect } from "vitest"
import { NodeType, RootNode } from "./ast"
import { traverser, Visitor } from "./traverser"

test("traverse", () => {
  const ast: RootNode = {
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

  const callArr: any = []

  const visitor: Visitor = {
    Program: {
      enter(node, parent) {
        callArr.push(["root-enter", node.type, ""])
      },
      exit(node, parent) {
        callArr.push(["root-exit", node.type, ""])
      }
    },
    CallExpression: {
      enter(node, parent) {
        callArr.push(["callexpression-enter", node.type, parent!.type])
      },
      exit(node, parent) {
        callArr.push(["callexpression-exit", node.type, parent!.type])
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        callArr.push(["number-enter", node.type, parent!.type])
      },
      exit(node, parent) {
        callArr.push(["number-exit", node.type, parent!.type])
      }
    }
  }

  traverser(ast, visitor)

  expect(callArr).toEqual([
    ["root-enter", NodeType.Program, ""],
    ["callexpression-enter", NodeType.CallExpression, NodeType.Program],
    ["number-enter", NodeType.NumberLiteral, NodeType.CallExpression],
    ["number-exit", NodeType.NumberLiteral, NodeType.CallExpression],
    ["callexpression-enter", NodeType.CallExpression, NodeType.CallExpression],
    ["number-enter", NodeType.NumberLiteral, NodeType.CallExpression],
    ["number-exit", NodeType.NumberLiteral, NodeType.CallExpression],
    ["number-enter", NodeType.NumberLiteral, NodeType.CallExpression],
    ["number-exit", NodeType.NumberLiteral, NodeType.CallExpression],
    ["callexpression-exit", NodeType.CallExpression, NodeType.CallExpression],
    ["callexpression-exit", NodeType.CallExpression, NodeType.Program],
    ["root-exit", NodeType.Program, ""]
  ])
})
