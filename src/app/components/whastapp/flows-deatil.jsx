import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
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
  actionFlowDetail,
  actionFlowDetail2,
  getFlow,
  getFlowDetail,
} from "src/app/services/whatsapp/bots";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SendButton } from "../iu/button";
import { CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const classes =
  "flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer";

export const FlowsDetailContent = () => {
  const [bot, setBot] = useState(null);
  const [details, setDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");
  const flow = searchParams.get("flow");
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [item, setItem] = useState(null);
  const [select, setSelect] = useState("");
  const [buttonSave, setButtonSave] = useState(true);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");

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

  const handleActivate = async (event, item) => {
    item = { ...item, p_inidtype: event.target.value };
    const response = await actionFlow(item, "U");
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFlow(botId);
      const botFind = response?.find((bot) => bot.p_inidflow === Number(flow));
      setBot({...botFind, p_inidbot: botId});
      setSelect(botFind?.p_inidtype);
      setChips(botFind?.chwords.split(","));
      setTitle(botFind?.chname || "");
      const details = await getFlowDetail(flow);
      setDetails(
        details
          .sort((a, b) => a.nuorden - b.nuorden)
          .map((item, index) => ({
            ...item,
            nuorden: index + 1,
            p_inidflow: botFind.p_inidflow,
            accion: "U",
          }))
      );
    };
    fetchData();
  }, []);

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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    let newItems = Array.from(details);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    newItems = newItems.map((item, index) => ({
      ...item,
      nuorden: index + 1,
    }));
    setDetails(newItems);
    setButtonSave(false);
  };

  const handleAddNewMessage = async (type, message) => {
    const newMessage = {
      chmessage: message,
      nuorden: details.length + 1,
      p_inidflowdetail: bot.p_inidflow,
      p_inidtype: type,
      p_inidflow: bot.p_inidflow,
      churl: null,
      status: true,
      accion: "I",
    };

    const detail = await actionFlowDetail(newMessage);
    if (detail.codigo == 1) {
      enqueueSnackbar(detail.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setDetails((prev) => [...prev, { ...newMessage, accion: "U" }]);
      setItem({ ...newMessage, accion: "U" });
    } else {
      enqueueSnackbar(detail.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        formData.append(key, item[key]);
      }
    }

    if (file) {
      formData.append("file", file);
    }

    const response = await actionFlowDetail2(formData);
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setDetails((prev) =>
        prev.map((detail) => (detail.nuorden === item.nuorden ? item : detail))
      );
      setItem(null);
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleDeleteItem = async (item) => {
    const response = await actionFlowDetail({ ...item, accion: "D" });
    setItem(null);
    if (response.codigo == 1) {
      enqueueSnackbar(response.valor, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      setDetails((prev) =>
        prev
          .filter((detail) => detail.nuorden !== item.nuorden)
          .map((item, index) => ({
            ...item,
            nuorden: index + 1,
          }))
      );
    } else {
      enqueueSnackbar(response.valor, {
        variant: "error",
        style: { fontSize: "1.3rem" },
      });
    }
  };

  const handleSaveItem = async () => {
    for (let index = 0; index < details.length; index++) {
      const element = details[index];
      const response = await actionFlowDetail(element);
      if (response.codigo == 1) {
        enqueueSnackbar(response.valor, {
          variant: "success",
          style: { fontSize: "1.3rem" },
        });
        setButtonSave(true);
        setItem(null);
      } else {
        enqueueSnackbar(response.valor, {
          variant: "error",
          style: { fontSize: "1.3rem" },
        });
      }
    }
  };

  const handleSave = async () => {
    setEdit(false);
    const response = await actionFlow({ ...bot, chname: title }, "U");
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

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 w-full min-w-0 grid-rows-3 sm:grid-rows-2 md:grid-rows-1'>
      <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10'>
        <div className='flex flex-col justify-between h-full'>
          <div>
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
                      <FuseSvgIcon size={20}>
                        heroicons-outline:check
                      </FuseSvgIcon>
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
                      <FuseSvgIcon size={20}>
                        heroicons-outline:pencil
                      </FuseSvgIcon>
                    </IconButton>
                  </>
                )}
              </div>
              <div className='flex'>
                <IconButton onClick={() => handleDelete(bot)}>
                  <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className='px-10 pb-10 pt-10'>
              {select && (
                <FormControl fullWidth size='small' className='mb-10'>
                  <InputLabel id={`role-label`}>Tipos</InputLabel>
                  <Select
                    labelId={`role-label`}
                    label='Tipos'
                    defaultValue={select}
                    onChange={(e) => {
                      setSelect(e.target.value);
                      handleActivate(e, bot);
                    }}
                  >
                    <MenuItem value='' disabled>
                      -
                    </MenuItem>
                    <MenuItem value='1'>General</MenuItem>
                    <MenuItem value='2'>Palabras</MenuItem>
                  </Select>
                </FormControl>
              )}
              {select == 2 && (
                <TextField
                  variant='outlined'
                  label='Palbras'
                  fullWidth
                  size='small'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleAddChip(e, bot)}
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
                            onDelete={() => handleDeleteChip(chip, bot)}
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
          </div>
          <div className='px-10 pb-10'>
            <Typography component='h3' fontSize={16} fontWeight={500}>
              TIPOS DE RESPUESTA
            </Typography>
            <div className='grid grid-cols-2 gap-14 mt-5'>
              <Paper
                className={classes}
                onClick={() => {
                  handleAddNewMessage(3, "Mensaje");
                }}
              >
                <IconButton className='w-fit'>
                  <FuseSvgIcon size={30}>heroicons-outline:chat</FuseSvgIcon>
                </IconButton>
                <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                  Mensaje
                </Typography>
              </Paper>
              <Paper
                className={classes}
                onClick={() => {
                  handleAddNewMessage(4, "Mensaje IA");
                }}
              >
                <IconButton className='w-fit'>
                  <FuseSvgIcon size={30}>heroicons-outline:beaker</FuseSvgIcon>
                </IconButton>
                <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                  IA
                </Typography>
              </Paper>
              <Paper className={classes}>
                <IconButton disabled className='w-fit'>
                  <FuseSvgIcon size={30} color=''>
                    heroicons-outline:globe-alt
                  </FuseSvgIcon>
                </IconButton>
                <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                  HTTP
                </Typography>
              </Paper>
            </div>
          </div>
        </div>
      </Paper>
      {item && (
        <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10'>
          <div className='flex items-center justify-between'>
            <Typography
              className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
              color='text.secondary'
            >
              Detalles del mensaje
            </Typography>
            <IconButton onClick={handleUpdate}>
              <FuseSvgIcon size={20}>
                heroicons-outline:cloud-upload
              </FuseSvgIcon>
            </IconButton>
          </div>
          <div className='p-10 flex flex-col gap-10'>
            <TextField
              label='Mensaje'
              fullWidth
              size='small'
              multiline
              rows={4}
              value={item.chmessage}
              onChange={(e) => setItem({ ...item, chmessage: e.target.value })}
            />
            {item.p_inidtype == 4 && <SendButton text='Probar' />}
            {item.p_inidtype == 3 && (
              <Button
                component='label'
                role={undefined}
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                <span className='truncate'>
                  {file ? file.name : "Subir imagen, video o archivo"}
                </span>
                <VisuallyHiddenInput
                  type='file'
                  onChange={(event) => setFile(event.target.files[0])}
                  accept='application/pdf,image/*,video/*'
                />
              </Button>
            )}
          </div>
        </Paper>
      )}
      <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-20'>
        <Button
          variant='contained'
          disabled={buttonSave}
          onClick={handleSaveItem}
        >
          Guardar
        </Button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='droppable-list'>
            {(provided) => (
              <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ width: "100%" }}
              >
                {details?.map((item, index) => (
                  <Draggable
                    draggableId={String(item.nuorden)}
                    index={index}
                    key={item.nuorden}
                  >
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          marginBottom: 1,
                          backgroundColor: "#f0f0f0",
                          borderRadius: "4px",
                        }}
                      >
                        <ListItemText
                          primary={item.chmessage}
                          onClick={() => setItem(item)}
                        />

                        <IconButton onClick={() => handleDeleteItem(item)}>
                          <FuseSvgIcon size={20}>
                            heroicons-outline:trash
                          </FuseSvgIcon>
                        </IconButton>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>
    </div>
  );
};
