import { FileUploadIcon } from '../icons/FileUploadIcon'

export const FileUpload = ({ fileTypes }: { fileTypes: Array<string> }) => {
  return (
    <div className="active:border-solid border-2 w-96 sm:w-[540px] md:w-[720px] lg:w-[860px] xl:w-[940px] 2xl:w-[1140px] hover:bg-violet-100 bg-violet-200 border-dashed h-72 text-center border-violet-600 flex justify-center items-center flex-col gap-2 hover:cursor-pointer rounded-lg text-violet-900">
      <span className="text-violet-950">
        <FileUploadIcon size={48} />
      </span>
      <p className="text-xl font-medium">Drop files here</p>
      <p className="text-xs">Allowed file types: {fileTypes.join(', ')}</p>
    </div>
  )
}
