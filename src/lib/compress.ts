import { zipSync } from 'fflate'

export const createZipArchive = async (
  files: File[],
  callback: (result: Uint8Array | null) => void
): Promise<Uint8Array | null> => {
  try {
    const zipData: Record<string, Uint8Array> = {}
    console.log('start')
    for (const file of files) {
      const blob = new Blob([file])

      // Create an ArrayBuffer from the Blob
      const arrayBuffer = await blob.arrayBuffer()
      const fileData = new Uint8Array(arrayBuffer)

      // Add the file to the zipData object
      zipData[file.name] = fileData
    }
    console.log('before zipping')
    const zip = zipSync(zipData, { level: 6 })
    console.log('after zipping')
    callback(zip)
    return zip
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating ZIP archive:', error.message)
    } else {
      console.error('Error creating ZIP archive:', JSON.stringify(error))
    }
    return null
  }
}
