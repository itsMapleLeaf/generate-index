import * as fsExtra from "fs-extra"
import { resolve } from "path"
import { writeIndexFile } from "./writeIndexFile"

it("writes an index file to the correct path with the correct content", async () => {
  const fsMock = {
    ...fsExtra,
    async readdir(folder: string | Buffer) {
      return ["a.ts", "b.ts"]
    },
    writeFile: jest.fn(),
  }

  await writeIndexFile("testfolder", fsMock)

  expect(fsMock.writeFile).toHaveBeenCalledWith(
    resolve("testfolder/index.ts"),
    `export * from "./a"\nexport * from "./b"\n`,
  )
})
