export function generateIndexContent(files: string[]) {
  const exportedFiles = files.filter((file) => {
    return (
      file !== "index.ts" &&
      !file.includes(".test.") &&
      !file.includes("__snapshots__")
    )
  })

  const exportLines = exportedFiles.map((file) => {
    const fileWithoutExtension = file.replace(/\.[^\.]+$/, "")
    return `export * from "./${fileWithoutExtension}"\n`
  })

  return exportLines.join("")
}
