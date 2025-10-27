import { userApi } from ".";

const query: TQueryMap<typeof userApi, "user"> = {
  getCurrentUserInfo: (params) => ({
    queryKey: ["user", "me"],
    queryFn: () => userApi.getCurrentUserInfo(params),
  }),
};

const mutation: TMutationMap<typeof userApi> = {};

export const userQuery = query;
export const userMutation = mutation;
