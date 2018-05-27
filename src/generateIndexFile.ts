import { resolve } from "path"
import { readdir, writeFile } from "./fsPromise"

export async function generateIndexFile(folderPath: string) {
  const files = await readdir(folderPath)

  const exportedFiles = files.filter((file) => {
    return file !== "index.ts" && !file.includes(".test.") && !file.includes("__snapshots__")
  })

  const exportLines = exportedFiles.map((file) => {
    const fileWithoutExtension = file.replace(/\.[^\.]+$/, "")
    return `export * from "./${fileWithoutExtension}"\n`
  })

  const indexFileContent = exportLines.join("")
  const indexFilePath = resolve(folderPath, "index.ts")

  await writeFile(indexFilePath, indexFileContent)

  return indexFilePath
}
