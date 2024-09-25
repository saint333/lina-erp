import { useSnackbar } from "notistack";
import ModalBasic from "..";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuList,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FuseSvgIcon from "@lina/core/LinaSvgIcon";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ItemsList = ({ item, index, setData }) => {
  const [edit, setEdit] = useState({
    estado: false,
    item: item,
  });
  return (
    <Draggable draggableId={String(item.p_inidflowdetail)} index={index}>
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
          {edit.estado ? (
            <TextField
              value={edit.item.chmessage}
              size='small'
              fullWidth
              onInput={(e) => {
                setEdit((prev) => ({
                  ...prev,
                  item: { ...prev.item, chmessage: e.target.value },
                }));
              }}
            />
          ) : (
            <ListItemText primary={edit.item.chmessage} />
          )}
          <IconButton
            onClick={() => {
              if (edit.estado) {
                setData((prev) => ({
                  ...prev,
                  details: prev.details.map((item) => {
                    if (item.p_inidflowdetail === edit.item.p_inidflowdetail) {
                      return edit.item;
                    }
                    return item;
                  }),
                }));
              }
              setEdit((prev) => ({
                ...prev,
                estado: !prev.estado,
              }));
            }}
          >
            <FuseSvgIcon size={20}>
              {edit?.estado
                ? "heroicons-outline:save"
                : "heroicons-outline:pencil"}
            </FuseSvgIcon>
          </IconButton>
        </ListItem>
      )}
    </Draggable>
  );
};

const DragAndDropList = ({ initialItems, setData }) => {
  const [items, setItems] = useState(initialItems);

  // Función que se ejecuta cuando se reordenan los elementos
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    // <Paper elevation={3} sx={{ width: 300, padding: 2 }}>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <nav className="max-h-[300px] overflow-hidden overflow-y-scroll">
        <Droppable droppableId='droppable-list'>
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ width: "100%" }}
            >
              {items.map((item, index) => (
                <ItemsList
                  key={index}
                  item={item}
                  index={index}
                  setData={setData}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </nav>
    </DragDropContext>
    // </Paper>
  );
};

export const BotModal = ({ open, setOpen, title, data, setData }) => {
  console.log("🚀 ~ BotModal ~ data:", data);
  const { titleFlow, details } = data;
  const listDetail = details?.sort((a, b) => a.nuorden - b.nuorden);

  const { enqueueSnackbar } = useSnackbar();
  const [edit, setEdit] = useState({
    title: false,
  });

  const handleClose = () => {
    setData(null);
    setOpen(false);
  };

  return (
    <ModalBasic
      open={open}
      title={title}
      handleClose={handleClose}
      className='md:!w-8/12 lg:!w-6/12 '
    >
      <div className='py-5 flex flex-col md:flex-row gap-14'>
        <div className='md:w-5/12'>
          <Typography component='h3' fontSize={16} fontWeight={500}>
            TIPOS DE RESPUESTA
          </Typography>
          <div className='grid grid-cols-2 gap-14 mt-5'>
            <Paper className='flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer'>
              <IconButton onClick={() => {}} className='w-fit'>
                <FuseSvgIcon size={30}>heroicons-outline:chat</FuseSvgIcon>
              </IconButton>
              <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                Mensaje
              </Typography>
            </Paper>
            <Paper className='flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer'>
              <IconButton onClick={() => {}} className='w-fit'>
                <FuseSvgIcon size={30}>heroicons-outline:beaker</FuseSvgIcon>
              </IconButton>
              <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                IA
              </Typography>
            </Paper>
            <Paper className='flex flex-col flex-auto shadow-none rounded-2xl overflow-hidden items-center py-10 border border-grey-300 border-solid cursor-pointer'>
              <IconButton onClick={() => {}} className='w-fit'>
                <FuseSvgIcon size={30}>heroicons-outline:globe-alt</FuseSvgIcon>
              </IconButton>
              <Typography className='px-16 text-lg font-medium tracking-tight leading-6 truncate'>
                HTTP
              </Typography>
            </Paper>
          </div>
        </div>
        <div className='md:w-7/12'>
          <Typography component='h3' fontSize={16} fontWeight={500}>
            TITULO
          </Typography>
          <ListItem
            sx={{
              marginBottom: 1,
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            }}
            className='flex items-center mt-4 justify-between'
          >
            {edit.title ? (
              <TextField
                value={titleFlow?.chname}
                size='small'
                fullWidth
                onInput={(e) => {
                  setData((prev) => ({
                    ...prev,
                    titleFlow: { ...prev.titleFlow, chname: e.target.value },
                  }));
                }}
              />
            ) : (
              <ListItemText>{titleFlow?.chname}</ListItemText>
            )}
            <IconButton
              onClick={() =>
                setEdit((prev) => ({
                  ...prev,
                  title: !prev.title,
                }))
              }
            >
              <FuseSvgIcon size={20}>
                {edit.title
                  ? "heroicons-outline:save"
                  : "heroicons-outline:pencil"}
              </FuseSvgIcon>
            </IconButton>
          </ListItem>
          <Typography component='h3' fontSize={16} fontWeight={500}>
            LISTA DE MENSAJES A ENVIAR
          </Typography>
          <DragAndDropList initialItems={listDetail} setData={setData} />
        </div>
      </div>
    </ModalBasic>
  );
};
