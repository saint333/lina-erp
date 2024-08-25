import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";
/**
 * Form Validation Schema
 */

const defaultValues = {
  usuario: "",
  password: "",
};

function jwtSignInTab() {
  const { jwtService } = useAuth();
  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues,
  });
  const { isValid, dirtyFields, errors } = formState;
  const [token, setToken] = useState(null);
  const { enqueueSnackbar} = useSnackbar();

  function onSubmit(formData) {
    const { usuario, password } = formData;
    if (!token) {
      return enqueueSnackbar("Por favor, verifica que no eres un robot", {
        variant: "error",
        style:{ fontSize: "1.3rem" }
      });
    }
    jwtService
      .signIn({
        usuario,
        password,
      })
      .catch((error) => {
        console.log("🚀 ~ onSubmit ~ error:", error)
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
          style:{ fontSize: "1.3rem" }
        });
      });
  }

  return (
    <div className='w-full'>
      <form
        name='loginForm'
        noValidate
        className='mt-32 flex w-[304px] flex-col justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='usuario'
          control={control}
          rules={{ required: "Email es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              className='mb-24'
              label='Email'
              autoFocus
              type='email'
              error={!!errors.usuario}
              helperText={errors.usuario?.message}
              variant='outlined'
              fullWidth
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          rules={{ required: "Contraseña es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              className='mb-24'
              label='Password'
              type='password'
              error={!!errors.password}
              helperText={errors.password?.message}
              variant='outlined'
              fullWidth
            />
          )}
        />

        <ReCAPTCHA
          // sitekey='6LdyZb0nAAAAAE6so_vgQ2JbuZPymOO1x7HvnF6I'
          sitekey='6Lfw98opAAAAAEKfWCcjORbDgJye7htjeS_GUY20'
          onChange={(e) => setToken(e)}
          className="w-full"
        />

        <Button
          variant='contained'
          color='secondary'
          className='mt-16 w-full'
          aria-label='Sign in'
          type='submit'
          size='large'
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default jwtSignInTab;
