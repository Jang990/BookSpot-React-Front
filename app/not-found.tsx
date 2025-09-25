import { Error404Page } from "@/components/molecules/Error404Page";

export default async function PageNotFound() {
  return <Error404Page messages={["페이지를 찾을 수 없어요."]} />;
}
