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

  test("returns empty string if given no files", () => {
    const content = generateIndexContent([])

    assert.equal(content, "")
  })

  test("excludes files that match the given patterns", () => {
    const files = ["file.test.ts", "__snapshots__", "a.ts"]
    const content = generateIndexContent(files, [".test.", "__snapshots__"])

    assert.equal(content, `export * from "./a"\n`)
  })
})
