import api from "@/shared/api";

function getDirectoryChildren({ query }: { query: { directoryId: number } }) {
  return api.get<{
    directories: { id: number; directoryName: string }[];
    files: {
      id: number;
      userId: number;
      key: string;
      lastModified: string;
      fileName: string;
      fileSize: number;
      fileType: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      thumbnailKey: string;
      width: number;
      height: number;
    }[];
  }>("directory", {
    params: query,
    paramsSerializer: { indexes: null },
  });
}

function getRootDirectory() {
  return api.get<{ id: number }>("directory/root", {});
}

function getDirectoryInfo({ query }: { query: { directoryId: number } }) {
  return api.get<{
    id: number;
    parentId: number;
    userId: number;
    directoryName: string;
    path: string;
  }>("directory/info", {
    params: query,
    paramsSerializer: { indexes: null },
  });
}

export const directoryApi = {
  getDirectoryChildren,
  getRootDirectory,
  getDirectoryInfo,
};
