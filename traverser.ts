import { ChildNode, NodeType, RootNode } from "./ast"

export function traverser(rootNode: RootNode, visitor) {
  // 1. 深度优先搜索

  function traverseArray(array: ChildNode[]) {
    array.forEach((node) => {
      traverseNode(node)
    })
  }

  function traverseNode(node: ChildNode | RootNode) {
    switch (node.type) {
      case NodeType.Number:
        console.log("number", node)
        break
      case NodeType.CallExpression:
        traverseArray(node.params)
        break
      case NodeType.Root:
        traverseArray(node.body)
        break
    }
  }

  traverseNode(rootNode)
}
