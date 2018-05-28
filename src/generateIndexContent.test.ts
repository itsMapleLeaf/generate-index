import * as assert from "assert"
import { generateIndexContent } from "./generateIndexContent"

describe("generateIndexContent", () => {
  it("creates content for an index file", () => {
    const files = ["a.ts", "b.ts", "c.ts"]
    const content = generateIndexContent(files)

    assert.equal(
      content,
      `export * from "./a"\nexport * from "./b"\nexport * from "./c"\n`,
    )
  })

  it("returns empty string if given no files", () => {
    const content = generateIndexContent([])

    assert.equal(content, "")
  })

  it("excludes files that match the given patterns", () => {
    const files = ["file.test.ts", "__snapshots__", "a.ts"]
    const content = generateIndexContent(files, [".test.", "__snapshots__"])

    assert.equal(content, `export * from "./a"\n`)
  })
})
