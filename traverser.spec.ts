import { test, expect } from "vitest"
import { NodeType, RootNode } from "./ast"
import { traverser, Visitor } from "./traverser"

test("traverse", () => {
  const ast: RootNode = {
    type: NodeType.Root,
    body: [
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.Number,
            value: "2"
          },
          {
            type: NodeType.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeType.Number,
                value: "4"
              },
              {
                type: NodeType.Number,
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
    Root: {
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
    Number: {
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
    ["root-enter", NodeType.Root, ""],
    ["callexpression-enter", NodeType.CallExpression, NodeType.Root],
    ["number-enter", NodeType.Number, NodeType.CallExpression],
    ["number-exit", NodeType.Number, NodeType.CallExpression],
    ["callexpression-enter", NodeType.CallExpression, NodeType.CallExpression],
    ["number-enter", NodeType.Number, NodeType.CallExpression],
    ["number-exit", NodeType.Number, NodeType.CallExpression],
    ["number-enter", NodeType.Number, NodeType.CallExpression],
    ["number-exit", NodeType.Number, NodeType.CallExpression],
    ["callexpression-exit", NodeType.CallExpression, NodeType.CallExpression],
    ["callexpression-exit", NodeType.CallExpression, NodeType.Root],
    ["root-exit", NodeType.Root, ""]
  ])
})
