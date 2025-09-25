import { HomePrimaryButton } from "@/components/atoms/button/HomePrimaryButton";
import { ErrorImage } from "@/components/atoms/ErrorImage";

interface Error404PageProps {
  messages: string[];
}

export const Error404Page = ({ messages }: Error404PageProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <ErrorImage src="/404.svg" alt="404" />
      <div>
        {messages.map((msg, idx) => (
          <p key={idx} className="mt-2 text-2xl font-bold text-gray-800">
            {msg}
          </p>
        ))}
        <div className="mt-4 flex justify-center gap-4">
          <HomePrimaryButton />
        </div>
      </div>
    </div>
  );
};
