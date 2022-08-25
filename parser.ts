import {
  createCallExpression,
  createNumberLiteralNodeNode,
  createRootNode,
  createStringNode,
  Token,
  TokenTypes
} from "./ast"

export function parser(tokens: Token[]) {
  let current = 0
  const rootNode = createRootNode()

  function walk() {
    let token = tokens[current]
    if (token.type === TokenTypes.Number) {
      current++
      return createNumberLiteralNodeNode(token.value)
    }

    if (token.type === TokenTypes.String) {
      current++
      return createStringNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++current]
      const node = createCallExpression(token.value)

      token = tokens[++current]

      while (!(token.type === TokenTypes.Paren && token.value === ")")) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    throw new Error(`不认识的 token : ${token}`)
  }

  while (current < tokens.length) {
    rootNode.body.push(walk())
  }
  return rootNode
}
