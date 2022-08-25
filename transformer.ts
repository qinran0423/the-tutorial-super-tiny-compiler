import { NodeType, RootNode, ChildNode } from "./ast"
import { traverser } from "./traverser"

export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeType.Program,
    body: []
  }

  ast.context = newAst.body

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeType.CallExpression) {
          // TODO
          let expression: any = {
            type: NodeType.CallExpression,
            callee: {
              type: "Identifier",
              name: node.name
            },
            arguments: []
          }

          node.context = expression.arguments
          if (parent?.type !== NodeType.CallExpression) {
            expression = {
              type: NodeType.ExpressionStatement,
              expression
            }
          }

          parent?.context?.push(expression)
        }
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeType.NumberLiteral) {
          const NumberNode: any = {
            type: NodeType.NumberLiteral,
            value: node.value
          }

          parent?.context?.push(NumberNode)
        }
      }
    }
  })

  return newAst
}
