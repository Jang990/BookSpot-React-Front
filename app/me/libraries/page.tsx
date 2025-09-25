import { HomePrimaryButton } from "@/components/atoms/button/HomePrimaryButton";
import { ErrorImage } from "@/components/atoms/ErrorImage";
import { Error404Page } from "@/components/molecules/Error404Page";

export default async function MyLibraries() {
  return (
    <Error404Page
      messages={[
        "개발 중인 페이지에요.",
        "9월 안으로 추가될 수 있게 노력할게요.",
      ]}
    />
  );
}
