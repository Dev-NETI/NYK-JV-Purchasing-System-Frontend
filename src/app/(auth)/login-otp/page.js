"use client";

import { React, useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/auth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function LoginOtp() {
  const router = useRouter();
  const { user, logout } = useAuth({
    middleware: "auth",
  });
  const [tempt_otp, setTempt_otp] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    axios
      .post("/api/verify-otp", { otp: data.pin, temp_otp: tempt_otp })
      .then((response) => {
        toast({
          title: "Successfully Verified",
          description:
            "You have successfully verified your account. You can now log in.",
        });
        console.log(response.data.status);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error authenticating:", error.response.data.status);
        toast({
          title: "Authentication failed",
          variant: "destructive",
          description: error.response.data.status,
        });
      });
  };

  async function generateOtp() {
    console.log(user);
    await axios
      .post("/api/authenticating", { temp_otp: tempt_otp })
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((error) => {
        console.error("Error authenticating:", error);
      });
  }

  useEffect(() => {
    axios.get("/api/checking-status-otp").then((response) => {
      if (response.data.status === true) {
        router.push("/dashboard");
        console.log("Verified");
      } else {
        generateOtp();
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h2 className="text-center mb-4 font-bold">
                        Authentication
                      </h2>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                  <div className="flex justify-center">
                                    <InputOTP maxLength={6} {...field}>
                                      <InputOTPGroup className="gap-1">
                                        <InputOTPSlot
                                          className="rounded-md border w-10 h-10 text-center text-lg"
                                          type="number"
                                          index={0}
                                        />
                                        <InputOTPSlot
                                          className="rounded-md border w-10 h-10 text-center text-lg"
                                          type="number"
                                          index={1}
                                        />
                                      </InputOTPGroup>
                                      <InputOTPSeparator className="mx-2" />
                                      <InputOTPGroup className="gap-1">
                                        <InputOTPSlot
                                          className="rounded-md border w-10 h-10 text-center text-lg"
                                          type="number"
                                          index={2}
                                        />
                                        <InputOTPSlot
                                          className="rounded-md border w-10 h-10 text-center text-lg"
                                          type="number"
                                          index={3}
                                        />
                                      </InputOTPGroup>
                                      <InputOTPSeparator className="mx-2" />
                                      <InputOTPGroup className="gap-1">
                                        <InputOTPSlot
                                          className="rounded-md border w-10 h-10 text-center text-lg"
                                          type="number"
                                          index={4}
                                        />
                                        <InputOTPSlot
                                          className="rounded-md border w-10 h-10 text-center text-lg"
                                          type="number"
                                          index={5}
                                        />
                                      </InputOTPGroup>
                                    </InputOTP>
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Please enter the one-time password sent to
                                  your phone.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button className="w-full" type="submit">
                            Submit
                          </Button>
                        </form>
                      </Form>

                      <p className="mt-10 text-center text-sm text-gray-500">
                        Logout an Account?{" "}
                        <button
                          onClick={logout}
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                          Click here
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginOtp;
