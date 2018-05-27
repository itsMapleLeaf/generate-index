import * as fs from "fs"
import promisify from "util.promisify"

export const readdir = promisify(fs.readdir)
export const stat = promisify(fs.stat)
export const writeFile = promisify(fs.writeFile)
