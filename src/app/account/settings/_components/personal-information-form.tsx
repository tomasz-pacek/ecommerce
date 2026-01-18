"use client";

import ActionButton from "@/components/action-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { personalInformationFormSchema } from "@/lib/validations/personal-information-form";
import { AuthSession } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type Props = {
  session: AuthSession;
};

export default function PersonalInformationForm({ session }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof personalInformationFormSchema>>({
    resolver: zodResolver(personalInformationFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof personalInformationFormSchema>,
  ) => {
    const promises = [];
    let shouldRefresh = false;

    if (data.name !== session?.user?.name) {
      promises.push(
        authClient.updateUser(
          {
            name: data.name,
          },
          {
            onSuccess: () => {
              toast("Name updated successfully");
              shouldRefresh = true;
            },
          },
        ),
      );
    }

    if (data.email !== session?.user?.email) {
      promises.push(
        authClient.changeEmail(
          {
            newEmail: data.email,
            callbackURL: "/account/settings",
          },
          {
            onError: (ctx) => {
              toast(ctx.error.message || "Error changing email");
            },
            onSuccess: () => {
              toast("Email updated successfully");
              shouldRefresh = true;
            },
          },
        ),
      );
    }

    if (promises.length === 0) return;

    await Promise.all(promises);

    if (shouldRefresh) {
      router.refresh();
      form.reset(data);
    }
  };

  return (
    <form id="personal-information-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="flex flex-row items-center justify-center">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="personal-information-form-name">
                Name
              </FieldLabel>
              <Input
                {...field}
                id="personal-information-form-name"
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="personal-information-form-email">
                E-mail
              </FieldLabel>
              <Input
                {...field}
                id="personal-information-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="johndoe@example.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-6 flex w-full items-center justify-between">
        <div>
          {session?.user?.emailVerified ? (
            <div className="flex items-center gap-x-2">
              <div className="bg-green-500/10">
                <CheckIcon className="size-4" />
              </div>
              <p className="text-muted-foreground text-sm">Email is verified</p>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <div className="rounded-full bg-red-500/10 p-0.5">
                <XIcon className="size-4" />
              </div>
              <p className="text-muted-foreground text-sm">
                Email is not verified
              </p>
            </div>
          )}
        </div>
        <ActionButton
          size="sm"
          className="cursor-pointer"
          content="Save"
          type="submit"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          isPending={form.formState.isSubmitting}
          isPendingContent="Saving..."
        />
      </div>
    </form>
  );
}
