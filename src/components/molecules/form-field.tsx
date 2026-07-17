import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="font-mono text-2xs tracking-widest text-muted-foreground">
        {label.toUpperCase()}
      </Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} required={required} />
    </div>
  );
}

export function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-mono text-2xs tracking-widest text-muted-foreground">
        {label.toUpperCase()}
      </Label>
      {children}
    </div>
  );
}
