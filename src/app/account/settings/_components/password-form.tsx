"use client";

import ActionButton from "@/components/action-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authClient } from "@/lib/auth-client";
import { changePasswordFormSchema } from "@/lib/validations/change-password-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function PasswordForm() {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmNewPassowrdVisible, setIsConfirmNewPassowrdVisible] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordFormSchema>) => {
    await authClient.changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onError: (ctx) => {
          toast(ctx.error.message || "Error changing password");
        },
        onSuccess: () => {
          toast("Password changed successfully");
        },
      },
    );
  };

  return (
    <form id="change-password-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="change-password-form-current-password">
                Current password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="change-password-form-current-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your current password"
                  autoComplete="off"
                  type={isCurrentPasswordVisible ? "text" : "password"}
                />
                <InputGroupAddon
                  align={"inline-end"}
                  className="cursor-pointer"
                  onClick={() =>
                    setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                  }
                >
                  {isCurrentPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="change-password-form-new-password">
                New password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="change-password-form-new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your current password"
                  autoComplete="off"
                  type={isNewPasswordVisible ? "text" : "password"}
                />
                <InputGroupAddon
                  align={"inline-end"}
                  className="cursor-pointer"
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                >
                  {isNewPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="change-password-form-confirm-new-password">
                Confirm new password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="change-password-form-confirm-new-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm new password"
                  autoComplete="off"
                  type={isConfirmNewPassowrdVisible ? "text" : "password"}
                />
                <InputGroupAddon
                  align={"inline-end"}
                  className="cursor-pointer"
                  onClick={() =>
                    setIsConfirmNewPassowrdVisible(!isConfirmNewPassowrdVisible)
                  }
                >
                  {isConfirmNewPassowrdVisible ? (
                    <EyeClosedIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-6 flex w-full items-center justify-end">
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
