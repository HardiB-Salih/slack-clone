import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../typs";
import { useState } from "react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignInCard({ setState }: SignInCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to contnue</CardTitle>
        <CardDescription>
          User your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <div className="flex w-full items-center justify-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm font-semibold text-muted-foreground/50">
            OR
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            className="relative w-full"
            type="button"
            size="lg"
            disabled={false}
            onClick={() => {}}
          >
            <FcGoogle className="top-1/5 absolute left-2.5 size-5" />
            Contnue with Google
          </Button>
          <Button
            variant="outline"
            className="relative w-full"
            type="button"
            size="lg"
            disabled={false}
            onClick={() => {}}
          >
            <FaGithub className="top-1/5 absolute left-2.5 size-5" />
            Contnue with Github
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer text-sky-700 hover:underline"
            onClick={() => setState("signUp")}
          >
            sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
