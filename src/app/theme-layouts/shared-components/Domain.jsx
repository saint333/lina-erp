import { FormControl, InputLabel, MenuItem, Select, Skeleton } from "@mui/material";
import { useAppSelector } from "app/store/hooks";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { DataHeader } from "src/app/services";

const DomainComponent = () => {
  const [domain, setDomain] = useState(null);
  const user = useAppSelector(selectUser);
  const {
    formState: { errors },
    control,
    setValue
  } = useForm({
    defaultValues: {
      domain: "",
    },
  });

  const CustomSelect = ({ label, textKey, handleChange = null, children }) => {
    return (
      <Controller
        name={textKey}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth size='small'>
            <InputLabel id={`role-${textKey}-label`} error={errors[textKey]}>
              {label}
            </InputLabel>
            <Select
              {...field}
              labelId={`role-${textKey}-label`}
              label={label}
              error={errors[textKey]}
              onChange={(e) => {
                field.onChange(e);
                handleChange && handleChange(e);
              }}
            >
              <MenuItem value='' disabled>-</MenuItem>
              {children}
            </Select>
          </FormControl>
        )}
        rules={{ required: "Este campo es requerido" }}
      />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await DataHeader();
      setDomain(data);
      setValue("domain", user?.data?.dominio == "default" ? 1 : user?.data?.dominio);
    };
    fetchData();
  }, [setValue]);

  if (!domain) {
    return <Skeleton width={200} height={65}/>
  }
  return (
    <CustomSelect label='Dominio' textKey='domain'>
      {domain?.lists.map((item) => (
        <MenuItem key={item.p_iniddominio} value={item.p_iniddominio}>
          {item.chnombrecomercial}
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

export default DomainComponent;
