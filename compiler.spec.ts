import { expect, test } from "vitest"
import { compiler } from "./compiler"

test("compiler", () => {
  const code = "(add 2 (substract 4 2))"

  expect(compiler(code)).toBe("add(2, substract(4, 2));")
})
