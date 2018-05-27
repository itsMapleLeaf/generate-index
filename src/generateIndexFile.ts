import { readdirSync, statSync, writeFileSync } from "fs"
import { resolve } from "path"

export function generateIndexFile(folderPath: string) {
  const files = readdirSync(folderPath)

  const exportedFiles = files.filter((file) => {
    const stats = statSync(resolve(folderPath, file))
    return (
      stats.isFile() &&
      file !== "index.ts" &&
      !file.includes(".test.") &&
      !file.includes("__snapshots__")
    )
  })

  const exportLines = exportedFiles.map((file) => {
    const fileWithoutExtension = file.replace(/\.[^\.]+$/, "")
    return `export * from "./${fileWithoutExtension}"\n`
  })

  const indexFileContent = exportLines.join("")
  const indexFilePath = resolve(folderPath, "index.ts")

  writeFileSync(indexFilePath, indexFileContent)
}
