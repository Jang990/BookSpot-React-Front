import { UserDetailResponseSpec } from "@/types/ApiSpec";
import { getApiClient, Side } from "./common/Request";

export const findMe = async ({
  side,
}: {
  side: Side;
}): Promise<UserDetailResponseSpec> => {
  const response = await getApiClient(side).get<void>(`/api/users/me`);

  if (!response.ok || !response.data)
    return {
      email: "로그아웃을 진행해주세요.",
      createdAt: new Date().toLocaleDateString(),
      provider: "로그아웃 필요",
    };
  return response.data;
};

export const deleteMe = async ({ side }: { side: Side }): Promise<void> => {
  const response = await getApiClient(side).delete<void>(
    `/api/v1/auth/users/me`
  );

  if (!response.ok) throw response.error;
};
