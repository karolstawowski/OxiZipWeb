import { ZipOptions, zipSync } from "fflate";

export const createZipArchive = async (
  file: File
): Promise<Uint8Array | null> => {
  try {
    // Create a buffer from the base64-encoded file content
    const buffer = await file.arrayBuffer();
    console.log("bf", buffer);
    // Compress the buffer using zipSync
    const zip = zipSync({ [file.name]: new Uint8Array(buffer) }, {
      gzip: false,
    } as ZipOptions);
    console.log(zip);
    return zip;
  } catch (error) {
    console.error("Error creating ZIP archive:", error);
    return null;
  }
};
