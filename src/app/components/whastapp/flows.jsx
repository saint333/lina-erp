import {
  Box,
  Button,
  Chip,
  Divider,
  Fab,
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

const FlowsContentItem = ({ item, botId, setChange, setBot }) => {
  console.log("🚀 ~ FlowsContentItem ~ item:", item)
  const [chips, setChips] = useState(item.chwords?.split(",") || []);
  const [inputValue, setInputValue] = useState("");
  const [select, setSelect] = useState(item?.p_inidtype || "");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(item?.chname || "");
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

  const handleDeleteChip = async (chipToDelete, item) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
    const list = chips.filter((chip) => chip !== chipToDelete);
    const response = await actionFlow({ ...item, chwords: list.join() }, "U");
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setChange(new Date());
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleFlow = async (item) => {
    navigate(`/crm/flows-detail?bot=${botId}&flow=${item.p_inidflow}`);
  };

  const handleDelete = async (item) => {
    console.log("🚀 ~ handleDelete ~ item:", item)
    const response = await actionFlow(item, "D");
    if (response) {
      enqueueSnackbar("Se ha eliminado correctamente", {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setBot((prev) => prev.filter((bot) => bot.p_inidflow !== item.p_inidflow));
      setChange(new Date());
    } else {
      enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleActivate = async (event, item) => {
    item = { ...item, p_inidtype: event.target.value };
    const response = await actionFlow(item, "U");
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setChange(new Date());
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleSave = async () => {
    setEdit(false);
    const response = await actionFlow({ ...item, chname: title }, "U");
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
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10 h-max'>
      <div className='flex items-center justify-between'>
        <div className='flex justify-between w-full truncate items-center'>
          {edit ? (
            <>
              <TextField
                fullWidth
                size='small'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <IconButton onClick={handleSave}>
                <FuseSvgIcon size={20}>heroicons-outline:check</FuseSvgIcon>
              </IconButton>
            </>
          ) : (
            <>
              <Typography
                className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
                color='text.secondary'
              >
                {title}
              </Typography>
              <IconButton onClick={() => setEdit(true)}>
                <FuseSvgIcon size={20}>heroicons-outline:pencil</FuseSvgIcon>
              </IconButton>
            </>
          )}
        </div>
        <div className='flex'>
          <IconButton onClick={() => handleFlow(item)}>
            <FuseSvgIcon size={20}>heroicons-outline:external-link</FuseSvgIcon>
          </IconButton>
          <IconButton onClick={() => handleDelete(item)}>
            <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
          </IconButton>
        </div>
      </div>
      <Divider />
      <div className='px-10 pb-10 pt-10'>
        <FormControl fullWidth size='small' className='mb-10'>
          <InputLabel id={`role-label`}>Tipos</InputLabel>
          <Select
            labelId={`role-label`}
            label='Tipos'
            defaultValue={item?.p_inidtype || ""}
            onChange={(e) => {
              setSelect(e.target.value);
              handleActivate(e, item);
            }}
          >
            <MenuItem value='' disabled>
              -
            </MenuItem>
            <MenuItem value='1'>General</MenuItem>
            <MenuItem value='2'>Palabras</MenuItem>
          </Select>
        </FormControl>
        {select == 2 && (
          <TextField
            variant='outlined'
            label='Palabras'
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
        )}
      </div>
    </Paper>
  );
};

export const FlowsContent = () => {
  const [bot, setBot] = useState([]);
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");
  const { enqueueSnackbar } = useSnackbar();
  const [change, setChange] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFlow(botId);
      setBot(response.map((item) => ({ ...item, p_inidbot: botId })));
    };
    fetchData();
  }, [change]);

  const handleAdd = async () => {
    const response = await actionFlow({ p_inidbot: Number(botId), chname: "Flujo de prueba" }, "I");
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setChange(new Date());
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  return (
    <div className="relative">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 w-full min-w-0'>
        <pre>{JSON.stringify(bot, null, 2)}</pre>
        {bot.map((item, index) => {
          return (
            <FlowsContentItem
              item={item}
              botId={botId}
              key={index}
              setChange={setChange}
              setBot={setBot}
            />
          );
        })}
      </div>
      <Fab aria-label='add' onClick={handleAdd} className="fixed bottom-52 right-52" color="secondary">
        <FuseSvgIcon color="white">heroicons-outline:plus</FuseSvgIcon>
      </Fab>
    </div>
  );
};
