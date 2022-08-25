import { CallExpressionNode, ChildNode, NodeType, RootNode } from "./ast"

type ParentNode = RootNode | CallExpressionNode | undefined
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void

interface VisitorOption {
  enter: MethodFn
  exit?: MethodFn
}

export interface Visitor {
  Program?: VisitorOption
  CallExpression?: VisitorOption
  NumberLiteral?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent)
    })
  }

  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
    const visitorObj = visitor[node.type]

    if (visitorObj) {
      visitorObj.enter(node, parent)
    }
    switch (node.type) {
      case NodeType.NumberLiteral:
        // console.log("number", node)
        break
      case NodeType.CallExpression:
        traverseArray(node.params, node)
        break
      case NodeType.Program:
        traverseArray(node.body, node)
        break
    }

    if (visitorObj && visitorObj.exit) {
      visitorObj.exit(node, parent)
    }
  }

  traverseNode(rootNode)
}
