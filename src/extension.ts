import { dirname, resolve } from "path"
import * as vscode from "vscode"
import { readdir, writeFile } from "./fsPromise"
import { generateIndexContent } from "./generateIndexContent"

async function generateIndexCommand() {
  const { activeTextEditor } = vscode.window
  if (activeTextEditor) {
    try {
      const targetFolder = dirname(activeTextEditor.document.fileName)

      const files = await readdir(targetFolder)

      const indexContent = generateIndexContent(files, [
        ".test.",
        "__snapshots__",
      ])

      const indexFilePath = resolve(targetFolder, "index.ts")

      await writeFile(indexFilePath, indexContent)

      vscode.workspace.openTextDocument(indexFilePath)
    } catch (error) {
      const errorMessage = `[Generate TS File] Something went wrong: ${error}`
      vscode.window.showErrorMessage(errorMessage)
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.generateIndex",
    generateIndexCommand,
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
