import { useContactForm } from "../hooks/useContactForm";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import { useState } from "react";

export function MuiForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });

  const primaryColor = styleOptions.themeColor;
  const radius = parseInt(styleOptions.borderRadius) || 8;

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="mui-form-title"
        sx={{
          maxWidth: 420,
          mx: "auto",
          p: 3,
          borderRadius: `${radius}px`,
          border: "1px solid",
          borderColor: "grey.300",
          bgcolor: "background.paper",
          fontSize: styleOptions.fontSize,
        }}
      >
        <Typography id="mui-form-title" variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: 600 }}>
          Форма (Material UI)
        </Typography>

        {isSuccess && (
          <Box sx={{ mb: 2, p: 1.5, bgcolor: "success.light", color: "success.dark", borderRadius: 1, fontWeight: 500 }}>
            ✓ Форма успешно отправлена!
          </Box>
        )}

        <TextField
          label="Имя *"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
          required
          {...register("name")}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: `${radius}px`,
              fontSize: styleOptions.fontSize,
              "& fieldset": { borderColor: primaryColor },
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": { borderColor: primaryColor },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
          }}
        />

        <TextField
          label="Email *"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          required
          {...register("email")}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: `${radius}px`,
              fontSize: styleOptions.fontSize,
              "& fieldset": { borderColor: primaryColor },
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": { borderColor: primaryColor },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
          }}
        />

        <TextField
          label="Пароль *"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          required
          {...register("password")}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: `${radius}px`,
              fontSize: styleOptions.fontSize,
              "& fieldset": { borderColor: primaryColor },
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": { borderColor: primaryColor },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              {...register("newsletter")}
              sx={{
                color: primaryColor,
                "&.Mui-checked": { color: primaryColor },
              }}
            />
          }
          label="Получать новости по email"
          sx={{ mt: 1, fontSize: styleOptions.fontSize }}
        />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              minWidth: 120,
              backgroundColor: primaryColor,
              borderRadius: `${radius}px`,
              fontSize: styleOptions.fontSize,
              "&:hover": { backgroundColor: primaryColor, opacity: 0.9 },
              "&.Mui-disabled": { backgroundColor: "#9ca3af" },
            }}
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </Box>
      </Box>

      <FormTheoryCard data={formTheory.mui} />
    </div>
  );
}