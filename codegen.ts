import { NodeType } from "./ast"

export function codegen(node) {
  switch (node.type) {
    case NodeType.Program:
      return node.body.map(codegen).join("")
    case NodeType.ExpressionStatement:
      return codegen(node.expression) + ";"
    case NodeType.NumberLiteral:
      return node.value
    case NodeType.CallExpression:
      return (
        node.callee.name + "(" + node.arguments.map(codegen).join(", ") + ")"
      )
    default:
      break
  }
}
