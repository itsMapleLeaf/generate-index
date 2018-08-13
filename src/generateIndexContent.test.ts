import { generateIndexContent } from "./generateIndexContent"

describe("generateIndexContent", () => {
  it("creates content for an index file", () => {
    const files = ["a.ts", "b.ts", "c.ts"]
    const content = generateIndexContent(files)

    expect(content).toBe(
      `export * from "./a"\nexport * from "./b"\nexport * from "./c"\n`,
    )
  })

  it("returns empty string if given no files", () => {
    const content = generateIndexContent([])

    expect(content).toBe("")
  })

  it("doesn't include non typescript files", () => {
    const files = ["a.ts", "b.tsx", "data.json", "c.js"]
    const content = generateIndexContent(files, [".test.", "__snapshots__"])

    expect(content).toBe(`export * from "./a"\nexport * from "./b"\n`,)
  })

  it("excludes files that match the given patterns", () => {
    const files = ["file.test.ts", "__snapshots__", "a.ts"]
    const content = generateIndexContent(files, [".test.", "__snapshots__"])

    expect(content).toBe(`export * from "./a"\n`)
  })
})
