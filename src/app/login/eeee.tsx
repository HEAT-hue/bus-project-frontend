"use client";
import { LoginUser } from "@/lib/actions";
import { NAVIGATION, User, USER_AUTHORITES } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      {/* Top Loader */}

      <div>
        {/* Logo */}
        <div className="flex justify-center">
          <p className="text-ecobankBlue text-[3rem] text-center border-b-[6px] border-b-ecobankGreen w-max font-Aladin-Regular leading-none">
            Kiti
          </p>
        </div>

        <div className="mt-8">
          <Login />
        </div>

        <div className="sm:hidden">{/* blue logo */}</div>
        <div className="hidden sm:block">{/* white logo */}</div>
      </div>
    </div>
  );
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const signInSchema = z.object({
  email: z.string().email({ message: "Must be a valid Ecobank email" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

type TSignInSchema = z.infer<typeof signInSchema>;

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    try {
      const user: User = await LoginUser({
        email: data.email,
        password: data.password,
      });

      if (user) {
        // Retrieve roles
        const authorities = user.authorities.split(" ");

        // Admin page
        if (authorities.includes(USER_AUTHORITES.ADMIN)) {
          router.push(NAVIGATION.ADMIN);
          return;
        }

        // Admin page
        if (authorities.includes(USER_AUTHORITES.CAPTAIN)) {
          router.push(NAVIGATION.CAPTAIN);
          return;
        }

        // User page
        if (authorities.includes(USER_AUTHORITES.USER)) {
          router.push(NAVIGATION.USER);
          return;
        }

        // User page
        throw new Error("User role not found!");
      }
    } catch (error) {
      // setErrorMessage("Error validating credentials!");
      // // Clear pending state
      // setSub""missionPending(false);
      setError("email", {
        type: "server",
        message: "Error validating credentials",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-5 mt-5">

        {/* Email */}
        <div className="flex flex-col gap-y-2">
          {(errors.email || errors.password) && (
            <p className="text-xs text-end text-red-600">{`${errors?.email?.message || errors?.password?.message}`}</p>
          )}
          <label htmlFor="email" className="text-sm">
            Staff ID/Email Address
          </label>
          <input
            {...register("email")}
            className="outline-none w-[90vw] max-w-[340px] border focus:border-ecobankBlue focus:shadow focus:shadow-ecobankBlue p-2 rounded"
            type="email" name="email" id="email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="text-sm"> Password </label>
          <input
            {...register("password")}
            type="password"
            className="outline-none w-[90vw] max-w-[340px] border focus:border-ecobankBlue focus:shadow focus:shadow-ecobankBlue p-2 rounded"
            name="password"
            id="password"
          />
          {/* {errors.password && (
            <p className="text-red-600">{`${errors.password.message}`}</p>
          )} */}
        </div>
      </div>

      <button
        className="bg-ecobankBlue rounded w-[90vw] max-w-[340px] py-3 mt-8 text-sm text-white focus:outline-none "
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <BeatLoader
            color={"#ffffff"}
            loading={true}
            cssOverride={override}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Log in"
        )}
      </button>
      { }
    </form>
  );
}
