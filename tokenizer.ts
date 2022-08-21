export enum TokenTypes {
  Paren,
  Name,
  Number
}

export interface Token {
  type: TokenTypes
  value: string
}

export function tokenizer(code: string) {
  const tokens: Token[] = []
  let current = 0

  while (current < code.length) {
    let char = code[current]

    const whitespace = /\s/
    if (whitespace.test(char)) {
      current++
      continue
    }

    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char
      })
      current++
      continue
    }

    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char
      })
      current++
      continue
    }

    const LETTRES = /[a-z]/i
    if (LETTRES.test(char)) {
      let value = ""
      while (LETTRES.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }

      tokens.push({
        type: TokenTypes.Name,
        value
      })
    }

    const NUMBER = /[0-9]/
    if (NUMBER.test(char)) {
      let value = ""
      while (NUMBER.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }

      tokens.push({
        type: TokenTypes.Number,
        value
      })
    }
  }

  return tokens
}
