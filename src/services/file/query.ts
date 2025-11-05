import { fileApi } from ".";

const query: TQueryMap<typeof fileApi, "file"> = {
  getFileInfo: ({ path }) => ({
    queryKey: ["file", "info", path.id],
    queryFn: () => fileApi.getFileInfo({ path }),
  }),
  getPresignedUrl: ({ query }) => ({
    queryKey: ["file", "presinged-url", query],
    queryFn: () => fileApi.getPresignedUrl({ query }),
  }),
};

const mutation: TMutationMap<typeof fileApi> = {};

export const fileQuery = query;
export const fileMutation = mutation;
