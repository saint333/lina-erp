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
import {
  actionFlow,
  getFlow,
  getFlowDetail,
  getQR,
} from "src/app/services/whatsapp/bots";
import { BotModal } from "../modal/whatsapp/bot";
import { useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export const FlowsDetailContent = () => {
  const [bot, setBot] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleAddChip = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue(""); // Limpiar el campo de texto
      enqueueSnackbar("Se ha agregado correctamente", {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleDeleteChip = (chipToDelete) => {
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
    const response = await getFlow(id);
    const details = await getFlowDetail(response[0].p_inidflow);
    setData({ titleFlow: response[0], details });
    setOpenModal(true);
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

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0'>
      {bot.map((item, index) => {
        return (
          <Paper
            className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
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
                <IconButton>
                  <FuseSvgIcon
                    color={item.actived ? "success" : "gray"}
                    className={item.actived && "animate-pulse"}
                    size={20}
                  >
                    {item.actived
                      ? "heroicons-outline:status-online"
                      : "heroicons-outline:status-offline"}
                  </FuseSvgIcon>
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
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                >
                  <MenuItem value='' disabled>
                    -
                  </MenuItem>
                  <MenuItem value='palabra'>Palabras</MenuItem>
                  <MenuItem value='general'>General</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant='outlined'
                label='Add chips'
                fullWidth
                size='small'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddChip}
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
                          onDelete={() => handleDeleteChip(chip)}
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
      {openModal && (
        <BotModal
          open={openModal}
          setOpen={setOpenModal}
          title='Flujo'
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
};
