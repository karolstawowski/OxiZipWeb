import { Loader } from '../icons/Loader'
import { mergeClasses } from '../lib/twUtils'

export const CompressButton = ({
  downloadZipFile,
  files,
  isCompressing,
  isError,
}: {
  downloadZipFile: () => Promise<null | undefined>
  files: File[] | null
  isCompressing: boolean
  isError: boolean
}) => {
  return (
    <>
      <button
        onClick={downloadZipFile}
        disabled={!files}
        className={mergeClasses(
          'px-4 py-3 rounded-md cursor-pointer disabled:cursor-default font-medium',
          files && files.length > 0
            ? 'bg-violet-700 text-violet-100 hover:bg-violet-800 active:bg-violet-900'
            : 'bg-slate-300 text-slate-900 border-slate-900 border'
        )}
      >
        {isCompressing ? <Loader /> : 'Start creating ZIP archive'}
      </button>
      {isError ? (
        <p className="bg-red-300 text-red-800 px-3 py-2 rounded-t-lg font-semibold border-b-2 border-b-red-700 text-sm">
          Failed creating ZIP archive. Some files can not be compressed.
        </p>
      ) : null}
    </>
  )
}
