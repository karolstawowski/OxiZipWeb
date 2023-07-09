import { FileOff } from '../icons/FileOff'
import { X } from '../icons/X'
import { byteFormatter } from '../lib/units'

type FilesListProps = {
  files: File[] | null
  handleFileRemoval: (fileName: string) => void
}

export const FilesList = ({ files, handleFileRemoval }: FilesListProps) => {
  return (
    <div className="w-full px-6 py-6 bg-slate-300 rounded-lg">
      <h2 className="font-medium text-lg">Files to compress</h2>
      <div className="h-[2px] w-8 bg-violet-500 mb-4 mt-1" />

      {files && files.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {files.map((file) => (
            <li>
              <div className="py-1 px-2 bg-violet-300 text-violet-900 border-violet-500 border text-sm flex justify-end items-center">
                <span className="mr-auto">{file.name}</span>
                <div className="flex gap-4 items-center">
                  <span>{byteFormatter.format(file.size)}</span>
                  <button
                    onClick={() => handleFileRemoval(file.name)}
                    className="flex items-center"
                  >
                    <span className="text-violet-900 font-bold hover:bg-violet-500 bg-violet-400 inline-block rounded-sm border border-violet-900">
                      <X size={20} />
                    </span>
                  </button>
                </div>
              </div>
              <div class="bg-gray-400 w-full h-[2px] relative overflow-hidden z-10">
                <div class="absolute w-full top-0 left-0 h-full bg-violet-600 animate-fill-to-right" />
              </div>
            </li>
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
