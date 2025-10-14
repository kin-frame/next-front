export async function getFileMetaSize(file: File) {
  const fileType = file.type;
  const isImage = fileType.startsWith("image");
  const isVideo = fileType.startsWith("video");

  if (isImage) {
    return getImageSize(file);
  } else if (isVideo) {
    return getVideoSize(file);
  } else {
    return { width: 0, height: 0 };
  }
}

type FileMeta = { width: number; height: number };

function getImageSize(file: File) {
  return new Promise<FileMeta>((resolve, reject) => {
    const fileType = file.type;
    const isImage = fileType.startsWith("image");
    if (!isImage) {
      return reject({
        width: 0,
        height: 0,
      });
    }

    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () =>
      reject({
        width: 0,
        height: 0,
      });
    img.src = URL.createObjectURL(file);
  });
}

function getVideoSize(file: File) {
  return new Promise<FileMeta>((resolve, reject) => {
    const fileType = file.type;
    const isVideo = fileType.startsWith("video");
    if (!isVideo) {
      return reject({
        width: 0,
        height: 0,
      });
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.onerror = () =>
      reject({
        width: 0,
        height: 0,
      });
  });
}

const FILE_UNITS = ["B", "KB", "MB", "GB", "TB"];

export function formatFileSize(size: number, significantDigits = 3): string {
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < FILE_UNITS.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // 유효숫자 기준으로 반올림 (예: 1234 → 1.23e3)
  const formatted = Number(size.toPrecision(significantDigits));

  return `${formatted}${FILE_UNITS[unitIndex]}`;
}
