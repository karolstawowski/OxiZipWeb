/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'preact/hooks'
import { CompressionLevel, createZipArchive } from '../lib/zip'
import { appendFiles } from '../lib/files'
import { mergeClasses } from '../lib/twUtils'
import { DragDropZone } from './DragDropZone'
import { FilesList } from './FilesList'
import { CompressionLevelSelector } from './CompressionLevelSelector'
import { Loader } from '../icons/Loader'

export const FileUploader = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [zipData, setZipData] = useState<Uint8Array | null>(null)
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(6)
  const [isCompressing, setIsCompressing] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  console.log(files)
  const downloadZipFile = async () => {
    setIsError(false)
    if (files) {
      setIsCompressing(true)
      const archive = await createZipArchive(
        files,
        compressionLevel,
        (zipData) => {
          console.log('callback start')
          if (zipData) {
            setIsCompressing(false)
          } else {
            setIsCompressing(false)
            setIsError(true)
            console.error('Failed work')
          }
        }
      )
      if (!archive) return null
      setZipData(archive)
      const blob = new Blob([archive], { type: 'application/zip' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'archive.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    }
  }

  const handleFilesAppend = (additionalFiles: File[]) => {
    setFiles((prevFiles) => appendFiles(prevFiles, additionalFiles))
  }

  return (
    <div className="flex flex-col items-center py-4 gap-6 w-96 sm:w-[540px] md:w-[720px] lg:w-[860px] xl:w-[940px] 2xl:w-[1140px]">
      <DragDropZone handleFiles={handleFilesAppend} />
      <div className="flex justify-between w-full gap-6 flex-col md:flex-row">
        <div className="w-full">
          <FilesList
            files={files}
            handleFileRemoval={(fileName) =>
              setFiles((files) =>
                files ? files.filter((file) => file.name !== fileName) : null
              )
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <CompressionLevelSelector
            compressionLevel={compressionLevel}
            setCompressionLevel={setCompressionLevel}
          />
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
        </div>
      </div>
    </div>
  )
}
