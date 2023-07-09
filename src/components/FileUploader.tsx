/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'preact/hooks'
import { appendFiles, createArchiveName } from '../lib/files'
import { CompressionLevel, createZipArchive } from '../lib/zip'
import { ArchiveName } from './ArchiveName'
import { CompressButton } from './CompressButton'
import { CompressionLevelSelector } from './CompressionLevelSelector'
import { DragDropZone } from './DragDropZone'
import { FilesList } from './FilesList'

export const FileUploader = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [zipData, setZipData] = useState<Uint8Array | null>(null)
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(6)
  const [archiveName, setArchiveName] = useState<string>('archive.zip')
  const [isCompressing, setIsCompressing] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const downloadZipFile = async () => {
    setIsError(false)
    if (files) {
      setIsCompressing(true)
      const archive = await createZipArchive(
        files,
        compressionLevel,
        (zipData) => {
          if (zipData) {
            setIsCompressing(false)
          } else {
            setIsCompressing(false)
            setIsError(true)
          }
        }
      )
      if (!archive) return null
      setZipData(archive)
      const blob = new Blob([archive], { type: 'application/zip' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = createArchiveName(archiveName)
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
        <div className="w-full gap-2 flex flex-col">
          <ArchiveName
            archiveName={archiveName}
            setArchiveName={setArchiveName}
          />
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
          <CompressButton
            downloadZipFile={downloadZipFile}
            files={files}
            isCompressing={isCompressing}
            isError={isError}
          />
        </div>
      </div>
    </div>
  )
}
