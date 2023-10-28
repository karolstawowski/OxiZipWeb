import { zipSync } from 'fflate'

export const createZipArchive = async (
  files: File[],
  compressionLevel: CompressionLevel,
  callback: (result: Uint8Array | null) => void
): Promise<Uint8Array | null> => {
  try {
    const zipData: Record<string, Uint8Array> = {}
    for (const file of files) {
      const blob = new Blob([file])

      const arrayBuffer = await blob.arrayBuffer()
      const fileData = new Uint8Array(arrayBuffer)

      zipData[file.name] = fileData
    }
    const zip = zipSync(zipData, { level: compressionLevel })
    callback(zip)
    return zip
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating ZIP archive:', error.message)
      callback(null)
      return null
    }
    console.error('Error creating ZIP archive:', JSON.stringify(error))
    callback(null)
    return null
  }
}

export type CompressionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined
