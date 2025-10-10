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
