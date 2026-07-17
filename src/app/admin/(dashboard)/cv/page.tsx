import { Metadata } from "next";
import { CVUploadForm } from "@/components/organisms/cv-upload-form";
import { getCV } from "@/lib/actions/cv";
import { requireAdmin } from "@/lib/actions/require-admin";

export const metadata: Metadata = {
  title: "CV Management | Admin",
};

export default async function CVPage() {
  await requireAdmin();

  const currentCV = await getCV();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-mono font-medium">CV Management</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload and manage your CV file
        </p>
      </div>

      <div className="max-w-2xl">
        <CVUploadForm currentCV={currentCV} />
      </div>
    </div>
  );
}
