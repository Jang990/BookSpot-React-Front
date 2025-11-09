import { UserDetailResponseSpec } from "@/types/ApiSpec";
import { getApiClient, Side } from "./common/Request";

export const findMe = async ({
  side,
}: {
  side: Side;
}): Promise<UserDetailResponseSpec> => {
  const response = await getApiClient(side).get<void>(`/api/users/me`);

  if (!response.ok) throw response.error;
  if (!response.data) throw new Error("사용자 정보 없음");
  return response.data;
};

export const deleteMe = async ({ side }: { side: Side }): Promise<void> => {
  const response = await getApiClient(side).delete<void>(
    `/api/v1/auth/users/me`
  );

  if (!response.ok) throw response.error;
};
