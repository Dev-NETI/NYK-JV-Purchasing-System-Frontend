"use client";

import { useAuth } from "@/hooks/auth";
import Loading from "@/app/(app)/Loading";
import { useEffect } from "react";
import Template from "./Template";

const AppLayout = ({ children, header }) => {
  const { user, checkVerified } = useAuth({
    middleware: "auth",
  });

  useEffect(() => {
    checkVerified();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Template children={children} />
      </main>
    </div>
  );
};

export default AppLayout;
