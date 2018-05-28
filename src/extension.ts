import { readdir, writeFile } from "fs-extra"
import { dirname, resolve } from "path"
import * as vscode from "vscode"
import { generateIndexContent } from "./generateIndexContent"

async function writeIndexFile(fileName: string) {
  const targetFolder = dirname(fileName)

  const files = await readdir(targetFolder)

  const indexFilePath = resolve(targetFolder, "index.ts")
  const indexContent = generateIndexContent(files, [".test.", "__snapshots__"])

  await writeFile(indexFilePath, indexContent)
}

async function generateIndexCommand() {
  const { activeTextEditor } = vscode.window
  if (activeTextEditor) {
    try {
      const { fileName } = activeTextEditor.document

      await writeIndexFile(fileName)

      // FIXME: figure out how to do this properly
      // await vscode.workspace.openTextDocument(indexFilePath)
      // await vscode.window.showTextDocument(vscode.Uri.parse(indexFilePath))
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
