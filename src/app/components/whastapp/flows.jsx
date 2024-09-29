import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FuseSvgIcon from "@lina/core/LinaSvgIcon";
import { useEffect, useState } from "react";
import { actionFlow, getFlow } from "src/app/services/whatsapp/bots";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export const FlowsContent = () => {
  const [bot, setBot] = useState([]);
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleAddChip = async (event, item) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (chips.includes(inputValue)) {
        enqueueSnackbar("Texto ya existe", {
          variant: "error",
          style: { fontSize: "1.3rem" },
        });
        setInputValue("");
        return;
      }
      const list = [...chips, inputValue.trim()];
      setChips(list);
      setInputValue("");
      const response = await actionFlow({ ...item, chwords: list.join() }, "U");
      if (response.codigo == 1) {
        enqueueSnackbar(response.valor, {
          variant: "success",
          style: { fontSize: "1.3rem" },
        });
      } else {
        enqueueSnackbar(response.valor, {
          variant: "error",
          style: { fontSize: "1.3rem" },
        });
      }
    }
  };

  const handleDeleteChip = (chipToDelete, item) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
    enqueueSnackbar("Se ha eliminado correctamente", {
      variant: "success",
      style: { fontSize: "1.3rem" },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFlow(botId);
      setBot(response);
    };
    fetchData();
  }, []);

  const handleFlow = async (id) => {
    navigate(`/crm/flows-detail?bot=${id}`);
  };

  const handleDelete = async (item) => {
    const response = await actionFlow(item, "D");
    if (response) {
      enqueueSnackbar("Se ha eliminado correctamente", {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setBot(bot.filter((bot) => bot.p_inidflow !== item.p_inidflow));
    } else {
      enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleActivate = async (event, item) => {
    item = { ...item, p_inidtype: event.target.value };
    const response = await actionFlow(item, "A");
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0'>
      {bot.map((item, index) => {
        return (
          <Paper
            className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10'
            key={index}
          >
            <div className='flex items-center justify-between'>
              <Typography
                className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
                color='text.secondary'
              >
                {item.chname}
              </Typography>
              <div className='flex'>
                <IconButton onClick={() => handleFlow(item.p_inidflow)}>
                  <FuseSvgIcon size={20}>
                    heroicons-outline:external-link
                  </FuseSvgIcon>
                </IconButton>
                <IconButton onClick={() => handleDelete(item)}>
                  <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
              </div>
            </div>
            <img src={item.qr} className='w-full m-auto' />
            <div className='px-10 pb-10'>
              <FormControl fullWidth size='small' className='mb-10'>
                <InputLabel id={`role-label`}>Tipos</InputLabel>
                <Select
                  labelId={`role-label`}
                  label='Tipos'
                  defaultValue={""}
                  onChange={(e) => handleActivate(e, item)}
                >
                  <MenuItem value='' disabled>
                    -
                  </MenuItem>
                  <MenuItem value='1'>General</MenuItem>
                  <MenuItem value='2'>Palabras</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant='outlined'
                label='Add chips'
                fullWidth
                size='small'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleAddChip(e, item)}
                sx={{
                  "& label + div": {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingInline: "10px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        maxWidth: "100%",
                        marginTop: "10px", // Asegura que no se exceda del contenedor
                      }}
                    >
                      {chips.map((chip, index) => (
                        <Chip
                          key={index}
                          label={chip}
                          onDelete={() => handleDeleteChip(chip, item)}
                          size='small'
                          sx={{ marginBottom: 0.5 }}
                        />
                      ))}
                    </Box>
                  ),
                }}
              />
            </div>
          </Paper>
        );
      })}
    </div>
  );
};
