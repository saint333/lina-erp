import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { useAuth } from "src/app/auth/AuthRouteProvider";
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

  function onSubmit(formData) {
    const { usuario, password } = formData;
    jwtService
      .signIn({
        usuario,
        password,
      })
      .catch((error) => {
        const errorData = error.response.data;
        errorData.forEach((err) => {
          setError(err.type, {
            type: "manual",
            message: err.message,
          });
        });
      });
  }

  return (
    <div className='w-full'>
      <form
        name='loginForm'
        noValidate
        className='mt-32 flex w-full flex-col justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='usuario'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className='mb-24'
              label='Email'
              autoFocus
              type='email'
              error={!!errors.usuario}
              variant='outlined'
              required
              fullWidth
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className='mb-24'
              label='Password'
              type='password'
              error={!!errors.password}
              variant='outlined'
              required
              fullWidth
            />
          )}
        />

        <Button
          variant='contained'
          color='secondary'
          className='mt-16 w-full'
          aria-label='Sign in'
          disabled={_.isEmpty(dirtyFields) || !isValid}
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
