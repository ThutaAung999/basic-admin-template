import { Title } from "@/components";

export const AuthHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[30%] flex justify-center items-center">
        <img className="w-full object-cover" src="/images/logo.png" />
      </div>
      <Title className="text-primary-500" order={1}>
        {title}
      </Title>
      <p className="text-secondary-500 font-medium">{description}</p>
    </div>
  );
};
