import type { Project } from "@/generated/prisma/client";
import { arrayToCsv } from "@/lib/actions/parse";
import { asStringArray } from "@/lib/format";
import { FormField, FieldLabel } from "@/components/molecules/form-field";
import { Textarea } from "@/components/atoms/textarea";
import { Button } from "@/components/atoms/button";
import { ImageUploadField } from "@/components/organisms/image-upload-field";
import { GalleryField } from "@/components/organisms/gallery-field";

export function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Title" name="title" defaultValue={project?.title} />
        <FormField
          label="Slug (url-friendly, e.g. my-project)"
          name="slug"
          defaultValue={project?.slug}
        />
      </div>

      <FormField label="Summary" name="summary" defaultValue={project?.summary} />

      <FieldLabel label="Description">
        <Textarea name="description" rows={6} defaultValue={project?.description} required />
      </FieldLabel>

      <FieldLabel label="Tech stack (comma separated)">
        <Textarea name="techStack" rows={2} defaultValue={arrayToCsv(project?.techStack)} />
      </FieldLabel>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Live URL (optional)"
          name="liveUrl"
          defaultValue={project?.liveUrl ?? ""}
          required={false}
        />
        <FormField
          label="Repo URL (optional)"
          name="repoUrl"
          defaultValue={project?.repoUrl ?? ""}
          required={false}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Year (optional)"
          name="year"
          defaultValue={project?.year ?? ""}
          required={false}
        />
        <FormField label="Order" name="order" type="number" defaultValue={String(project?.order ?? 0)} />
      </div>

      <ImageUploadField
        name="coverImageUrl"
        label="Cover image"
        defaultValue={project?.coverImageUrl}
        aspect={16 / 9}
      />

      <GalleryField
        name="screenshots"
        label="Screenshots"
        defaultValue={asStringArray(project?.screenshots)}
      />

      <label className="flex items-center gap-2 font-mono text-2xs tracking-widest text-muted-foreground">
        <input type="checkbox" name="featured" defaultChecked={project?.featured} />
        FEATURED ON HOME PAGE
      </label>

      <Button type="submit" className="mt-2 w-fit font-mono text-2xs tracking-widest">
        SAVE
      </Button>
    </form>
  );
}
