import { useState } from 'preact/hooks'
import { FileUploader as FileUploadPlace } from 'react-drag-drop-files'
import { createZipArchive } from '../lib/compress'
import { FileUploadIcon } from '../icons/FileUploadIcon'

const fileTypes = ['JPG', 'PNG', 'GIF', 'TXT', 'CFG', 'MP4']

export const FileUploader = () => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [zipData, setZipData] = useState<Uint8Array | null>(null)
  const [isCompressing, setIsCompressing] = useState<boolean>(false)
  const handleChange = (files: File[]) => {
    console.log('inside files')
    setFiles((prevFiles) => (prevFiles ? [...prevFiles, ...files] : files))
  }
  console.log('FILES', files)
  console.log('Is compr', isCompressing)
  const downloadZipFile = async () => {
    if (files) {
      setIsCompressing(true)
      const archive = await createZipArchive(files, (zipData) => {
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

  return (
    <div className="flex justify-center items-center flex-col gap-2 w-screen min-h-screen">
      <FileUploadPlace
        handleChange={handleChange}
        name="file"
        hoverTitle="Drop here"
        types={fileTypes}
        multiple
        maxSize={10000000000}
        onSizeError={() => console.error('Wrong size')}
      >
        <FileUpload />
      </FileUploadPlace>
      <button
        onClick={downloadZipFile}
        disabled={!files}
        className="p-4 bg-slate-300 rounded-md disabled:cursor-not-allowed cursor-pointer"
      >
        {isCompressing ? 'COMPRESSING' : 'Download ZIP Archive'}
      </button>
    </div>
  )
}

const FileUpload = () => {
  return (
    <div className="bg-gray-200 border border-dashed h-72 w-56 text-center border-gray-700 flex justify-center items-center flex-col gap-2 hover:cursor-pointer">
      <span className="text-gray-600">
        <FileUploadIcon size={48} />
      </span>
      <p>Upload files</p>
      <p className="text-xs">Allowed: {fileTypes.join(', ')}</p>
    </div>
  )
}
