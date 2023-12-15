import { filesize } from 'filesize'

interface PathParseResult {
  parent: string
  name: string
}

export class FileTreeNode {
  isFile = true
  name: string
  path: string

  protected _sizeBytes: number
  protected _downloadedBytes: number
  protected readonly _parent: DirTreeNode | null

  get size(): string {
    return filesize(this._sizeBytes)
  }

  get type() {
    return this.isFile ? 'File' : 'Dir'
  }

  get completed(): string {
    return `${((this._downloadedBytes / this._sizeBytes) * 100).toFixed(2)}%`
  }

  constructor(name: string, path: string, sizeBytes: number, downloadedBytes: number, parent: DirTreeNode | null) {
    this.name = name
    this.path = path
    this._sizeBytes = sizeBytes
    this._downloadedBytes = downloadedBytes
    this._parent = parent

    if (this._parent && this.isFile)
      this._parent.updateStats(this._sizeBytes, this._downloadedBytes)
  }
}

class DirTreeNode extends FileTreeNode {
  isFile = false
  children: FileTreeNode[]

  constructor(name: string, path: string, sizeBytes: number, downloadedBytes: number, parent: DirTreeNode | null) {
    super(name, path, sizeBytes, downloadedBytes, parent)
    this.children = []
  }

  updateStats(size: number, downloaded: number): void {
    this._sizeBytes += size
    this._downloadedBytes += downloaded

    if (this._parent)
      this._parent.updateStats(this._sizeBytes, this._downloadedBytes)
  }

  addSubdir(name: string, path: string) {
    const newDir = new DirTreeNode(name, path, 0, 0, this)

    this.children.push(newDir)

    return newDir
  }

  addFile(name: string, path: string, sizeBytes: number, downloadedBytes: number) {
    const newFile = new FileTreeNode(name, path, sizeBytes, downloadedBytes, this)

    this.children.push(newFile)

    return newFile
  }
}

export class FileTree {
  roots: FileTreeNode[]
  private _paths: Map<string, FileTreeNode | DirTreeNode>

  constructor() {
    this.roots = []
    this._paths = new Map<string, FileTreeNode>()
  }

  addDir(path: string): DirTreeNode {
    const { parent, name } = this._parseName(path)

    if (!parent) {
      const newRoot = new DirTreeNode(name, name, 0, 0, null)

      this.roots.push(newRoot)
      this._paths.set(path, newRoot)

      return newRoot
    }

    const parentDir = this._paths.get(parent)

    let newDir: DirTreeNode

    if (parentDir && 'addSubdir' in parentDir)
      newDir = parentDir.addSubdir(name, path)
    else
      newDir = this.addDir(parent).addSubdir(name, path)

    this._paths.set(path, newDir)

    return newDir
  }

  addFile(path: string, sizeBytes: number, downloadedBytes: number) {
    const { parent, name } = this._parseName(path)
    const parentDir = this._paths.get(parent)

    if (parentDir && 'addFile' in parentDir)
      this._paths.set(path, parentDir.addFile(name, path, sizeBytes, downloadedBytes))
    else
      this._paths.set(path, this.addDir(parent).addFile(name, path, sizeBytes, downloadedBytes))
  }

  private _parseName(path: string): PathParseResult {
    const match = path.match(/^((.*)\/)?(.*$)/)

    return {
      parent: match![2],
      name: match![3],
    }
  }
}
