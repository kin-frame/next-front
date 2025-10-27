import { adminApi } from ".";

const query: TQueryMap<typeof adminApi, "admin"> = {
  getAdminUserList: ({ query }) => ({
    queryKey: ["admin", "user", query],
    queryFn: () => adminApi.getAdminUserList({ query }),
  }),
};

const mutation: TMutationMap<typeof adminApi> = {};

export const adminQuery = query;
export const adminMutation = mutation;
