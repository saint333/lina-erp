import {
  Box,
  Button,
  Chip,
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

export const FlowsDetailContent = () => {
  const [bot, setBot] = useState(null);
  const [details, setDetails] = useState(null);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);

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
      const botFind = response?.find((bot) => bot.p_inidflow === Number(botId));
      setBot(botFind);
      const details = await getFlowDetail(botFind.p_inidflow);
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    let newItems = Array.from(details);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    newItems = newItems.map((item, index) => ({
      ...item,
      nuorden: index + 1,
    }));
    setDetails(newItems);
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 w-full min-w-0 grid-rows-3 sm:grid-rows-2 md:grid-rows-1'>
      <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10'>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div className='flex items-center justify-between'>
              <Typography
                className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
                color='text.secondary'
              >
                {bot?.chname}
              </Typography>
              <div className='flex'>
                <IconButton onClick={() => handleDelete(bot)}>
                  <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
              </div>
            </div>
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
          </div>
          <div className='px-10 pb-10'>
            <Typography component='h3' fontSize={16} fontWeight={500}>
              TIPOS DE RESPUESTA
            </Typography>
            <div className='grid grid-cols-2 gap-14 mt-5'>
              <Paper
                className='flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer'
                onClick={() => {
                  setDetails((prev) => [
                    ...prev,
                    {
                      chmessage: "Mensaje",
                      nuorden: prev.length + 1,
                      p_inidflowdetail: bot.p_inidflow,
                      p_inidtype: 1,
                      churl: null,
                      status: true,
                      accion: "I",
                    },
                  ]);
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
                className='flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer'
                onClick={() => {
                  setDetails((prev) => [
                    ...prev,
                    {
                      chmessage: "Mensaje IA",
                      nuorden: prev.length + 1,
                      p_inidflowdetail: bot.p_inidflow,
                      p_inidtype: 2,
                      churl: null,
                      status: true,
                      accion: "I",
                    },
                  ]);
                }}
              >
                <IconButton className='w-fit'>
                  <FuseSvgIcon size={30}>heroicons-outline:beaker</FuseSvgIcon>
                </IconButton>
                <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                  IA
                </Typography>
              </Paper>
              <Paper className='flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer'>
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
      <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-10'>
        <div className='flex items-center justify-between'>
          <Typography
            className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
            color='text.secondary'
          >
            Detalles
          </Typography>
          <IconButton>
            <FuseSvgIcon size={20}>heroicons-outline:cloud-upload</FuseSvgIcon>
          </IconButton>
        </div>
        <div className='p-10 flex flex-col gap-10'>
          <TextField
            label='Mensaje'
            fullWidth
            size='small'
            multiline
            rows={4}
          />
          <SendButton text='Probar' />
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            <span className='truncate'>{file ? file.name : "Subir PDF"}</span>
            <VisuallyHiddenInput
              type='file'
              onChange={(event) => setFile(event.target.files[0])}
              accept='application/pdf'
            />
          </Button>
        </div>
      </Paper>
      <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-20'>
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
                        <ListItemText primary={item.chmessage} />

                        <IconButton onClick={async () => {}}>
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
