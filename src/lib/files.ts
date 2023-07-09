export const appendFiles = (
  prevFiles: File[] | null,
  newFiles: File[]
): File[] => {
  return prevFiles
    ? mergeFileArrays(prevFiles, newFiles)
    : newFiles.filter((file) => file.name.indexOf('.') !== -1)
}

export const mergeFileArrays = (array1: File[], array2: File[]): File[] => {
  const mergedArray = [...array1, ...array2]
  return Array.from(
    new Map(
      mergedArray
        .filter((file) => file.name.indexOf('.') !== -1)
        .map((file) => [file.name, file])
    ).values()
  )
}
