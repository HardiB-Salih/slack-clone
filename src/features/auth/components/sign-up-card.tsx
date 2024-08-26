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
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("password do not match");
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => setPending(false));
  };

  const onProviderSignup = (value: "github" | "google") => {
    signIn(value);
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to contnue</CardTitle>
        <CardDescription>
          User your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="name"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
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
            disabled={pending}
            onClick={() => onProviderSignup("google")}
          >
            <FcGoogle className="top-1/5 absolute left-2.5 size-5" />
            Contnue with Google
          </Button>
          <Button
            variant="outline"
            className="relative w-full"
            type="button"
            size="lg"
            disabled={pending}
            onClick={() => onProviderSignup("github")}
          >
            <FaGithub className="top-1/5 absolute left-2.5 size-5" />
            Contnue with Github
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-sky-700 hover:underline"
            onClick={() => setState("signIn")}
          >
            sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
