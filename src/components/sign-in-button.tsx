import { Button } from "./ui/button";
import { signIn } from "@/server/auth";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button aria-label="Login to your account" type="submit">
        Login
      </Button>
    </form>
  );
}
