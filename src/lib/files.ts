export const appendFiles = (
  prevFiles: File[] | null,
  newFiles: File[]
): File[] => {
  return prevFiles ? mergeFileArrays(prevFiles, newFiles) : newFiles
}

export const mergeFileArrays = (array1: File[], array2: File[]): File[] => {
  const mergedArray = [...array1, ...array2]
  return Array.from(
    new Map(mergedArray.map((file) => [file.name, file])).values()
  )
}
