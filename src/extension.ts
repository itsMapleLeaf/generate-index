"use strict"
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { dirname } from "path"
import * as vscode from "vscode"
import { generateIndexFile } from "./generateIndexFile"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "generate-ts-index" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("extension.generateIndex", () => {
    const { activeTextEditor } = vscode.window
    if (activeTextEditor) {
      try {
        const { fileName } = activeTextEditor.document
        const folderPath = dirname(fileName)
        generateIndexFile(folderPath)
      } catch (error) {
        vscode.window.showErrorMessage(`[Generate TS File] Something went wrong: ${error}`)
      }
    }
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
