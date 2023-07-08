/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'preact/hooks'
import { FileUploader as FileUploadPlace } from 'react-drag-drop-files'
import { createZipArchive } from '../lib/compress'
import { mergeClasses } from '../lib/twUtils'
import { FileUpload } from './FileUpload'
import { FilesList } from './FilesList'
import { ChangeEvent } from 'preact/compat'
import { FileUploadIcon } from '../icons/FileUploadIcon'

const fileTypes = ['JPG', 'PNG', 'GIF', 'TXT', 'CFG', 'MP4']

export const FileUploader = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [zipData, setZipData] = useState<Uint8Array | null>(null)
  const [isCompressing, setIsCompressing] = useState<boolean>(false)

  const downloadZipFile = async () => {
    if (files) {
      setIsCompressing(true)
      const archive = await createZipArchive(files, (zipData) => {
        console.log('callback start')
        if (zipData) {
          setIsCompressing(false)
        } else {
          setIsCompressing(false)
          console.error('Failed work')
        }
      })
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
      <FileUploadPlace
        handleChange={handleFilesAppend}
        name="file"
        hoverTitle="Drop here"
        types={fileTypes}
        multiple
        maxSize={1000000000000}
        onSizeError={() => console.error('Wrong size')}
      >
        <FileUpload fileTypes={fileTypes} />
      </FileUploadPlace>
      <div className="flex justify-between w-full gap-6">
        <FilesList files={files} />
        <div>
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
            {isCompressing ? 'COMPRESSING' : 'Start creating ZIP archive'}
          </button>
        </div>
      </div>
      <DragDropFile handleFiles={handleFilesAppend} />
    </div>
  )
}

function DragDropFile({
  handleFiles,
}: {
  handleFiles: (files: File[]) => void
}) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = function (e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = function (e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      console.log('DR', e.dataTransfer.files)
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = function (e: ChangeEvent) {
    e.preventDefault()
    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files[0]
    ) {
      console.log('CH', e.target.files)
      handleFiles(Array.from(e.target.files))
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onDragEnter={handleDrag}
      onClick={onButtonClick}
      className="active:border-solid border-2 w-96 sm:w-[540px] md:w-[720px] lg:w-[860px] xl:w-[940px] 2xl:w-[1140px] hover:bg-violet-100 bg-violet-200 border-dashed h-72 text-center border-violet-600 rounded-lg text-violet-900"
    >
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        class="hidden"
      />
      <label
        htmlFor="input-file-upload"
        className={mergeClasses(
          dragActive ? 'bg-violet-50' : '',
          'w-full h-full flex justify-center items-center flex-col gap-2 hover:cursor-pointer'
        )}
      >
        <span className="text-violet-950">
          <FileUploadIcon size={48} />
        </span>
        <button className="text-xl font-medium">Drop files here</button>
        <p className="text-xs">Allowed file types: {fileTypes.join(', ')}</p>
      </label>
      {dragActive && (
        <div
          className="absolute w-full h-full inset-0"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </div>
  )
}

const appendFiles = (prevFiles: File[] | null, newFiles: File[]): File[] => {
  return prevFiles ? mergeFileArrays(prevFiles, newFiles) : newFiles
}

function mergeFileArrays(array1: File[], array2: File[]): File[] {
  const mergedArray = [...array1, ...array2]
  return Array.from(
    new Map(mergedArray.map((file) => [file.name, file])).values()
  )
}
