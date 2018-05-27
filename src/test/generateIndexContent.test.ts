import * as assert from "assert"
import { generateIndexContent } from "../generateIndexContent"

suite("generateIndexContent", () => {
  test("creates content for an index file", () => {
    const files = ["a.ts", "b.ts", "c.ts"]
    const content = generateIndexContent(files)

    assert.equal(
      content,
      `export * from "./a"\nexport * from "./b"\nexport * from "./c"\n`,
    )
  })
})
