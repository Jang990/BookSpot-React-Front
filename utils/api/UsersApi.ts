import { getApiClient, Side } from "./common/Request";

export const deleteMe = async ({ side }: { side: Side }): Promise<void> => {
  const response = await getApiClient(side).delete<void>(
    `/api/v1/auth/users/me`
  );

  if (!response.ok) throw response.error;
};
