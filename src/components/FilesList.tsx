import { FileOff } from '../icons/FileOff'

type FilesListProps = {
  files: File[] | null
}

export const FilesList = ({ files }: FilesListProps) => {
  return (
    <div className="w-full px-6 py-6 bg-slate-300 rounded-lg">
      <h2 className="font-medium text-lg">Files to compress</h2>
      <div className="h-[2px] w-8 bg-violet-500 mb-4 mt-1" />

      {files ? (
        <ul className="flex flex-col gap-1">
          {files.map((file) => (
            <div>
              <li className="py-1 px-2 bg-violet-300 text-violet-900 border-violet-500 border text-sm ">
                {file.name}
              </li>
              <div class="bg-gray-400 w-full h-[2px] relative overflow-hidden z-10">
                <div class="absolute w-full top-0 left-0 h-full bg-violet-600 animate-fill-to-right"></div>
              </div>
              {/* <div className="bg-violet-600 h-[2px] w-full" /> */}
            </div>
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
