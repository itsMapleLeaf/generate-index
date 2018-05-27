import { dirname } from "path"
import * as vscode from "vscode"
import { generateIndexFile } from "./generateIndexFile"

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.generateIndex", async () => {
    const { activeTextEditor } = vscode.window
    if (activeTextEditor) {
      try {
        const { fileName } = activeTextEditor.document
        const indexFilePath = await generateIndexFile(dirname(fileName))
        vscode.workspace.openTextDocument(indexFilePath)
      } catch (error) {
        vscode.window.showErrorMessage(`[Generate TS File] Something went wrong: ${error}`)
      }
    }
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {}
