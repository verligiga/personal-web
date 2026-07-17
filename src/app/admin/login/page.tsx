import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { FormField } from "@/components/molecules/form-field";
import { FigureLabel } from "@/components/atoms/figure-label";
import { Button } from "@/components/atoms/button";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: callbackUrl ?? "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(`/admin/login?error=1`);
      }
      throw err;
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-sm border border-dashed border-border bg-(--panel-surface) p-8">
        <FigureLabel fig="A0" className="mb-1 block">
          ADMIN
        </FigureLabel>
        <h1 className="mb-8 font-mono text-2xl text-foreground">Sign in</h1>

        <form action={login} className="flex flex-col gap-5">
          <FormField label="Email" name="email" type="email" />
          <FormField label="Password" name="password" type="password" />

          {error && (
            <p className="font-mono text-2xs text-destructive">Invalid email or password.</p>
          )}

          <Button type="submit" className="mt-2 font-mono text-2xs tracking-widest">
            LOG IN
          </Button>
        </form>
      </div>
    </div>
  );
}
