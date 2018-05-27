import { dirname } from "path"
import * as vscode from "vscode"
import { generateIndexFile } from "./generateIndexFile"

async function generateIndexCommand() {
  const { activeTextEditor } = vscode.window
  if (activeTextEditor) {
    try {
      const { fileName } = activeTextEditor.document
      const indexFilePath = await generateIndexFile(dirname(fileName))
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
