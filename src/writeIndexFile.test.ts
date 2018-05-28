import * as fsExtra from "fs-extra"
import { resolve } from "path"
import { writeIndexFile } from "./writeIndexFile"

it("writes an index file to the correct path with the correct content", async () => {
  let pathWritten
  let contentWritten

  const fsMock = {
    ...fsExtra,
    async readdir(folder: string | Buffer) {
      return ["a.ts", "b.ts"]
    },
    async writeFile(path: string | number | Buffer, content: string | Buffer) {
      pathWritten = path
      contentWritten = content
    },
  }

  await writeIndexFile("testfolder", fsMock)

  expect(pathWritten).toBe(resolve("testfolder/index.ts"))
  expect(contentWritten).toBe(`export * from "./a"\nexport * from "./b"\n`)
})
