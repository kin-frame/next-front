import { adminApi } from ".";

const query: TQueryMap<typeof adminApi, "admin"> = {
  getAdminUserList: ({ query }) => ({
    queryKey: ["admin", "user", query],
    queryFn: () => adminApi.getAdminUserList({ query }),
  }),
  getAdminUserInfo: ({ path }) => ({
    queryKey: ["admin", "user", path.id, "info"],
    queryFn: () => adminApi.getAdminUserInfo({ path }),
  }),
};

const mutation: TMutationMap<typeof adminApi> = {
  updateUserFileLimit: {
    mutationFn: adminApi.updateUserFileLimit,
  },
};

export const adminQuery = query;
export const adminMutation = mutation;
