import { dirname } from "path"
import * as vscode from "vscode"
import { writeIndexFile } from "./writeIndexFile"

async function generateIndexCommand() {
  const { activeTextEditor } = vscode.window
  if (activeTextEditor) {
    try {
      const { fileName } = activeTextEditor.document

      await writeIndexFile(dirname(fileName))

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
