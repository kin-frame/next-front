import api from "@/shared/api";

export const fileApi = {
  getFileInfo({ path }: { path: { id: number } }) {
    return api.get<null, { fileType: string; width: number; height: number }>(
      `/file/${path.id}`,
      {}
    );
  },
  getPresignedUrl({ query }: { query: { fileId: number } }) {
    return api.get<null, { url: string }>("/file/presigned-url", {
      params: query,
      paramsSerializer: { indexes: null },
    });
  },
};
