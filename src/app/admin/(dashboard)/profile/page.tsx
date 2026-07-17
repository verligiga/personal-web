import { prisma } from "@/lib/prisma";
import { saveProfile } from "@/lib/actions/profile";
import { FormField, FieldLabel } from "@/components/molecules/form-field";
import { Textarea } from "@/components/atoms/textarea";
import { Button } from "@/components/atoms/button";
import { ImageUploadField } from "@/components/organisms/image-upload-field";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Profile</h1>

      <form action={saveProfile} className="flex max-w-xl flex-col gap-5">
        <FormField label="Name" name="name" defaultValue={profile?.name} />
        <FormField label="Role" name="role" defaultValue={profile?.role} />
        <FormField label="Location" name="location" defaultValue={profile?.location} />
        <FormField label="Email" name="email" type="email" defaultValue={profile?.email} />
        <FormField label="Phone" name="phone" defaultValue={profile?.phone} />
        <FormField label="GitHub URL" name="github" defaultValue={profile?.github} />
        <FormField label="LinkedIn URL" name="linkedin" defaultValue={profile?.linkedin} />

        <FieldLabel label="Summary">
          <Textarea name="summary" rows={6} defaultValue={profile?.summary} required />
        </FieldLabel>

        <ImageUploadField
          name="avatarUrl"
          label="Avatar"
          defaultValue={profile?.avatarUrl}
          aspect={3 / 4}
        />

        <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
          SAVE
        </Button>
      </form>
    </div>
  );
}
