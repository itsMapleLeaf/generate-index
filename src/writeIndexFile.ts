import * as fsExtra from "fs-extra"
import { resolve } from "path"
import { generateIndexContent } from "./generateIndexContent"

export async function writeIndexFile(targetFolder: string, fs = fsExtra) {
  const files = await fs.readdir(targetFolder)

  const indexFilePath = resolve(targetFolder, "index.ts")
  const indexContent = generateIndexContent(files, [".test.", "__snapshots__"])

  await fs.writeFile(indexFilePath, indexContent)
}
