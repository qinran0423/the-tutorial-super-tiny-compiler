import { test, expect } from "vitest"
import { NodeType } from "./ast"
import { traverser } from "./traverser"

test.skip("traverse", () => {
  const ast = {
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

  const options: any = {
    Root: {
      enter(node, parent) {
        callArr.push("root-enter")
      },
      exit(node, parent) {
        callArr.push("root-exit")
      }
    },
    CallExpression: {
      enter(node, parent) {
        callArr.push("callexpression-enter")
      },
      exit(node, parent) {
        callArr.push("callexpression-exit")
      }
    },
    Number: {
      enter(node, parent) {
        callArr.push("number-enter")
      },
      exit(node, parent) {
        callArr.push("number-exit")
      }
    }
  }

  traverser(ast, options)

  expect(callArr).toEqual([
    "root-enter",
    "callexpression-enter",
    "number-enter",
    "number-exit",
    "callexpression-enter",
    "number-enter",
    "number-exit",
    "number-enter",
    "number-exit",
    "callexpression-exit",
    "callexpression-exit",
    "root-exit"
  ])
})
