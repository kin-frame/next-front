import api from "@/shared/api";

function getDirectoryChildren({ query }: { query: { directoryId: number } }) {
  return api.get<
    null,
    {
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
    }
  >("directory", {
    params: query,
    paramsSerializer: { indexes: null },
  });
}

function getRootDirectory() {
  return api.get<null, { id: number }>("directory/root", {});
}

function getDirectoryInfo({ query }: { query: { directoryId: number } }) {
  return api.get<
    null,
    {
      id: number;
      parentId: number;
      userId: number;
      directoryName: string;
      path: string;
    }
  >("directory/info", {
    params: query,
    paramsSerializer: { indexes: null },
  });
}

function createDirectory(params: { a: number; b: string }) {
  return api.post("", params);
}

type DeleteDirectoryDto = {
  /** 삭제할 디렉토리 ID */
  id: number;
};

export const directoryApi = {
  getDirectoryChildren,
  getRootDirectory,
  getDirectoryInfo,
  createDirectory,
  deleteDirectory({ body }: { body: DeleteDirectoryDto }) {
    return api.post<null, { deletedCount: number }>("directory/delete", body);
  },
};
