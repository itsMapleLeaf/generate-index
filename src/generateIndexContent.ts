export function generateIndexContent(
  files: string[],
  excludePatterns: string[] = [],
) {
  const exportedFiles = files.filter((file) => {
    return (
      file !== "index.ts" &&
      !excludePatterns.some((pattern) => file.includes(pattern))
    )
  })

  const exportLines = exportedFiles.map((file) => {
    const fileWithoutExtension = file.replace(/\.[^\.]+$/, "")
    return `export * from "./${fileWithoutExtension}"\n`
  })

  return exportLines.join("")
}
