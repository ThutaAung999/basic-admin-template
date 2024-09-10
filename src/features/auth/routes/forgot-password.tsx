import { Button, Link, TextInput } from "@/components";
import { ForgotPasswordDto, forgotPasswordSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthHeader } from "..";
import { Link as RouterLink } from "react-router-dom";

export const ForgotPassword = () => {
  const {
    formState: { errors },
    register,
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  return (
    <div className="flex flex-col">
      <AuthHeader
        title="Forgot Password"
        description="Please enter email to reset password"
      />
      <form className="flex flex-col gap-5">
        <TextInput
          label="Email"
          placeholder="Enter email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <div className="flex flex-col gap-3">
          <Button type="submit" loading={false}>
            Submit
          </Button>
          <Link
            className="underline text-center"
            color="secondary"
            component={RouterLink}
            to="/auth/login"
          >
            Back To Login
          </Link>
        </div>
      </form>
    </div>
  );
};
