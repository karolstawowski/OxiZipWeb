import { StateUpdater } from 'preact/hooks'

type ArchiveNameProps = {
  archiveName: string
  setArchiveName: StateUpdater<string>
}

export const ArchiveName = ({
  archiveName,
  setArchiveName,
}: ArchiveNameProps) => {
  return (
    <div className="flex flex-col bg-slate-300 rounded-lg px-6 py-4">
      <label htmlFor="archiveName" className="font-medium text-lg">
        Archive name
      </label>
      <div className="h-[2px] w-8 bg-violet-500 mb-4 mt-1" />
      <input
        name="archiveName"
        placeholder={archiveName}
        onChange={(e) => setArchiveName(e.currentTarget.value)}
        className="bg-violet-100 px-2 py-1 focus:outline-violet-700 text-violet-900 font-medium"
      />
    </div>
  )
}
