import { dirname } from "path"
import * as vscode from "vscode"
import { writeIndexFile } from "./writeIndexFile"

async function generateIndexCommand() {
  const { activeTextEditor } = vscode.window
  if (!activeTextEditor) {
    vscode.window.showErrorMessage(
      "Please open a file before activating this command.",
    )
    return
  }

  const { fileName } = activeTextEditor.document
  if (!/\.tsx?$/.test(fileName)) {
    vscode.window.showErrorMessage(
      "Only TypeScript files are supported at the moment, sorry!",
    )
    return
  }

  try {
    await writeIndexFile(dirname(fileName))

    // FIXME: figure out how to do this properly
    // await vscode.workspace.openTextDocument(indexFilePath)
    // await vscode.window.showTextDocument(vscode.Uri.parse(indexFilePath))
  } catch (error) {
    const errorMessage = `[Generate TS File] Something went wrong: ${error}`
    vscode.window.showErrorMessage(errorMessage)
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
