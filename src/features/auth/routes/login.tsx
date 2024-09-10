import { Button, Checkbox, Link, PasswordInput, TextInput } from "@/components";
import { AuthHeader, LoginDto, loginSchema, useAuth } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

export const Login = () => {
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      rememberMe: false,
    },
  });

  const { loginWithEmailAndPassword } = useAuth();

  const handleOnSubmit = handleSubmit(async (data) => {
    await loginWithEmailAndPassword(data);
  });

  return (
    <div className="flex flex-col">
      <AuthHeader
        title="Login"
        description="Welcome! Please Login With Your Email"
      />
      <form className="flex flex-col gap-5" onSubmit={handleOnSubmit}>
        <TextInput
          label="Email"
          placeholder="Enter email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <div className="flex justify-between items-center">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label="Remember Me"
                checked={!!value}
                onChange={onChange}
              />
            )}
          />
          <Link
            className="underline"
            color="secondary"
            component={RouterLink}
            to="/auth/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" loading={false}>
          Login
        </Button>
      </form>
    </div>
  );
};
