/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChangeEvent } from 'preact/compat'
import { useRef, useState } from 'preact/hooks'
import { FileUploadIcon } from '../icons/FileUploadIcon'
import { mergeClasses } from '../lib/twUtils'

export const DragDropZone = ({
  handleFiles,
}: {
  handleFiles: (files: File[]) => void
}) => {
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
        <p className="text-xs">Allowed file types: all</p>
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
