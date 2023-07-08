import { StateUpdater } from 'preact/hooks'
import { mergeClasses } from '../lib/twUtils'
import { CompressionLevel } from '../lib/zip'

const compressionLevels: Array<CompressionLevel> = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
]

export const CompressionLevelSelector = ({
  compressionLevel,
  setCompressionLevel,
}: {
  compressionLevel: CompressionLevel
  setCompressionLevel: StateUpdater<CompressionLevel>
}) => {
  return (
    <div className="flex gap-1 flex-col">
      <h2 className="font-medium">Compression level</h2>
      <ol className="flex gap-2">
        {compressionLevels.map((comLevel) => (
          <li>
            <button
              className={mergeClasses(
                compressionLevel === comLevel
                  ? 'bg-violet-900 hover:bg-violet-950'
                  : 'bg-violet-600 hover:bg-violet-700',
                'w-7 rounded-lg border-2 border-violet-400 text-violet-100 font-medium flex justify-center items-center active:border-violet-600'
              )}
              onClick={() => setCompressionLevel(comLevel)}
            >
              <span className="inline-block">{comLevel}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
