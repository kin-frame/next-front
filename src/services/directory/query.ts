import { directoryApi } from ".";

const query: TQueryMap<typeof directoryApi, "directory"> = {
  getDirectoryChildren: ({ query: { directoryId } }) => ({
    queryKey: ["directory", directoryId],
    queryFn: () =>
      directoryApi.getDirectoryChildren({ query: { directoryId } }),
  }),
  getRootDirectory: () => ({
    queryKey: ["directory", "root"],
    queryFn: () => directoryApi.getRootDirectory(),
  }),
  getDirectoryInfo: ({ query: { directoryId } }) => ({
    queryKey: ["directory", "info", directoryId],
    queryFn: () => directoryApi.getDirectoryInfo({ query: { directoryId } }),
  }),
};

const mutation: TMutationMap<typeof directoryApi> = {
  createDirectory: {
    mutationFn: directoryApi.createDirectory,
  },
};

export const directoryQuery = query;
export const directoryMutation = mutation;
