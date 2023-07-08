import { FileOff } from '../icons/FileOff'

type FilesListProps = {
  files: File[] | null
}

export const FilesList = ({ files }: FilesListProps) => {
  console.log(files)
  return (
    <div className="w-full px-6 py-6 bg-slate-300 rounded-lg">
      <h2 className="font-medium text-lg">Files to compress</h2>
      <div className="h-[2px] w-8 bg-violet-500 mb-4 mt-1" />
      {files ? (
        <ul className="divide-y">
          {files.map((file) => (
            <li>{file.name}</li>
          ))}
        </ul>
      ) : (
        <div className="text-center flex items-center flex-col gap-3">
          <span className="text-slate-600">
            <FileOff size={40} />
          </span>
          <div>
            <p className="text-slate-900 font-medium">No files selected</p>
            <p className="text-slate-700 text-sm">Drop files above</p>
          </div>
        </div>
      )}
    </div>
  )
}
