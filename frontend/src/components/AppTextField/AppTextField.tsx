"use client";

import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SxProps, Theme } from "@mui/material/styles";

type AppTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "name" | "defaultValue"
> & {
  name: Path<T>;
  control: Control<T>;
};

export default function AppTextField<T extends FieldValues>({
  name,
  control,
  helperText,
  sx,
  InputLabelProps,
  FormHelperTextProps,
  ...props
}: AppTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        const stableHelperText = hasError
          ? fieldState.error?.message
          : helperText ?? "\u00A0";

        const helperSx: SxProps<Theme> = FormHelperTextProps?.sx ?? {};

        return (
          <TextField
            {...props}
            {...field}
            value={field.value ?? ""}
            error={hasError}
            helperText={stableHelperText}
            variant={props.variant ?? "outlined"}
            size={props.size ?? "medium"}
            fullWidth={props.fullWidth ?? true} // ✅ default full width

            InputLabelProps={{
              shrink: true,
              ...InputLabelProps,
            }}
            FormHelperTextProps={{
              ...FormHelperTextProps,
              sx: {
                minHeight: 10,
                marginLeft: 0,
                marginTop: 1,
                lineHeight: 1.1,
                fontSize: 12,
                ...helperSx,
              },
            }}
            sx={{
              "& .MuiInputLabel-root": { fontWeight: 600 },

              "& .MuiOutlinedInput-root": {
                borderRadius: 16, // ✅ ناعم زي الصورة
                backgroundColor: "background.paper",
                height: 56, // ✅ طول ثابت
                "& .MuiOutlinedInput-input": {
                  padding: "0 14px", // ✅ لأن الheight ثابت
                  height: "56px",
                  boxSizing: "border-box",
                },
              },

              // ✅ border أخف
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0.15)",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0.25)",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0.35)",
              },

              ...sx,
            }}
          />
        );
      }}
    />
  );
}
