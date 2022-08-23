import { ChildNode, NodeType, RootNode } from "./ast"

interface VisitorOption {
  enter(node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined)
  exit(node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined)
}

export interface Visitor {
  Root?: VisitorOption
  CallExpression?: VisitorOption
  Number?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 1. 深度优先搜索

  function traverseArray(
    array: ChildNode[],
    parent: RootNode | ChildNode | undefined
  ) {
    array.forEach((node) => {
      traverseNode(node, parent)
    })
  }

  function traverseNode(
    node: ChildNode | RootNode,
    parent?: ChildNode | RootNode
  ) {
    const visitorObj = visitor[node.type]

    if (visitorObj) {
      visitorObj.enter(node, parent)
    }
    switch (node.type) {
      case NodeType.Number:
        // console.log("number", node)
        break
      case NodeType.CallExpression:
        traverseArray(node.params, node)
        break
      case NodeType.Root:
        traverseArray(node.body, node)
        break
    }

    if (visitorObj) {
      visitorObj.exit(node, parent)
    }
  }

  traverseNode(rootNode)
}
