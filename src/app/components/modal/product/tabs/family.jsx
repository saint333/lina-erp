import { Controller } from "react-hook-form";
import { arrayData, handleCategory, handleModel, handleType } from "./helper";
import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { NewFamily } from "src/app/services/maintenance/product";
import { CancelButton, SaveButton } from "src/app/components/iu/button";

const AddNewValue = ({
  setValue,
  setFormValue,
  setValueSelect,
  valueSelect,
  headOne,
  headTwo,
}) => {
  const [valueNew, setValueNew] = useState("");

  const handleAdd = async () => {
    if (valueNew == "" || headTwo == "") return;
    const data = {
      p_inidfamiliacabecera: headOne,
      p_inidfamiliacabecera2: headTwo,
      chfamiliadetalle: valueNew,
    };
    const response = await NewFamily(data, "I");
    setValueNew("");
    console.log("🚀 ~ handleAdd ~ response:", response);
  };
  return (
    <FormControl fullWidth className='!flex-row gap-1 !mb-3'>
      <TextField
        label='Nuevo'
        size='small'
        variant='outlined'
        value={valueNew}
        onChange={(e) => setValueNew(e.target.value)}
        fullWidth
      />
      <IconButton color='success' onClick={handleAdd}>
        <Add />
      </IconButton>
    </FormControl>
  );
};

function ButtonAler({ item }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (item) => async () => {
    const data = {
      p_inidfamiliadetalle: item.p_inidfamiliadetalle,
      p_inidfamiliacabecera: 0,
      p_inidfamiliacabecera2: 0,
      chfamiliadetalle: "",
    };
    const response = await NewFamily(data, "D");
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Delete color='error' />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title-3'
        aria-describedby='alert-dialog-description-3'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description-3'>
            ¿Está seguro de eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton text='Cancelar' onClick={handleClose} />
          <SaveButton text='Aceptar' onClick={handleDelete(item)} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function Family({
  errors,
  category,
  control,
  setFormValue,
  caliber,
  getValues,
}) {
  const [valueSelect, setValueSelect] = useState({
    ...arrayData,
    caliber,
    category,
  });

  const [expanded, setExpanded] = useState(false);
  const [expandedSub, setExpandedSub] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeSub = (panel) => (event, isExpanded) => {
    setExpandedSub(isExpanded ? panel : false);
  };

  const CustomSelect = ({ label, textKey, handleChange, children }) => {
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
                handleChange(e);
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

  const CustomGruopRadio = ({ label, textKey, handleChange, children }) => {
    return (
      <Controller
        name={textKey}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth className="max-h-[30rem] overflow-hidden overflow-y-auto">
            <RadioGroup
              aria-labelledby={label}
              name={textKey}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
            >
              {children}
            </RadioGroup>
          </FormControl>
        )}
        rules={{ required: "Este campo es requerido" }}
      />
    );
  };

  return (
    <div className='flex flex-col gap-10 md:flex-row'>
      <div className='flex flex-col gap-10 flex-1'>
        <CustomSelect
          label='Categoria'
          textKey='category'
          handleChange={(e) =>
            handleCategory(e, setFormValue, setValueSelect, valueSelect)
          }
        >
          {valueSelect.category.map((item, index) => (
            <MenuItem key={index} value={item.p_inidfamiliadetalle}>
              {item.chfamiliadetalle}
            </MenuItem>
          ))}
        </CustomSelect>
        <div>
          <Typography variant='subtitle1'>TIPO</Typography>
          <Card>
            <CardContent>
              <AddNewValue headOne={2} headTwo={getValues("category")} />
              <CustomGruopRadio
                textKey='type'
                label='Tipo'
                handleChange={(e) =>
                  handleType(e, setFormValue, setValueSelect, valueSelect)
                }
              >
                {valueSelect.type?.map((item, index) => (
                  <FormControl
                    key={index}
                    label={item.chfamiliadetalle}
                    className='!flex-row justify-between items-center'
                  >
                    <div className='flex items-center'>
                      <Radio value={item.p_inidfamiliadetalle} id={`${String(item.p_inidfamiliadetalle)}`}/>
                      <label htmlFor={item.p_inidfamiliadetalle}>{item.chfamiliadetalle}</label>
                    </div>
                    <ButtonAler item={item} />
                  </FormControl>
                ))}
              </CustomGruopRadio>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='flex flex-col gap-10 flex-1'>
        <Typography variant='subtitle1'>FAMILIA</Typography>
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography>MARCAS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AddNewValue headOne={3} headTwo={getValues("type")} />
              <CustomGruopRadio
                textKey='brand'
                label='Marca'
                handleChange={() => null}
              >
                {valueSelect.brand?.map((item, index) => (
                  <FormControl
                    key={index}
                    label={item.chfamiliadetalle}
                    className='!flex-row justify-between items-center'
                  >
                    <div className='flex items-center'>
                    <Radio value={item.p_inidfamiliadetalle} id={`${String(item.p_inidfamiliadetalle)}`}/>
                    <label htmlFor={item.p_inidfamiliadetalle}>{item.chfamiliadetalle}</label>
                    </div>
                    <ButtonAler item={item} />
                  </FormControl>
                ))}
              </CustomGruopRadio>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls='panel2bh-content'
              id='panel2bh-header'
            >
              <Typography>MODELOS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AddNewValue headOne={4} headTwo={getValues("type")} />
              <CustomGruopRadio
                textKey='model'
                label='Modelo'
                handleChange={(e) =>
                  handleModel(e, setFormValue, setValueSelect, valueSelect)
                }
              >
                {valueSelect.model?.map((item, index) => (
                  <FormControl
                    key={index}
                    label={item.chfamiliadetalle}
                    className='!flex-row justify-between items-center'
                  >
                    <div className='flex items-center'>
                    <Radio value={item.p_inidfamiliadetalle} id={`${String(item.p_inidfamiliadetalle)}`}/>
                    <label htmlFor={item.p_inidfamiliadetalle}>{item.chfamiliadetalle}</label>
                    </div>
                    <ButtonAler item={item} />
                  </FormControl>
                ))}
              </CustomGruopRadio>
              <div>
                <Accordion
                  expanded={expandedSub === "panel1"}
                  onChange={handleChangeSub("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel1bh-content'
                    id='panel1bh-header'
                  >
                    <Typography>ACABADO</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AddNewValue headOne={6} headTwo={getValues("model")} />
                    <CustomGruopRadio
                      textKey='finish'
                      label='Acabado'
                      handleChange={() => null}
                    >
                      {valueSelect.finish?.map((item, index) => (
                        <FormControl
                          key={index}
                          label={item.chfamiliadetalle}
                          className='!flex-row justify-between items-center'
                        >
                          <div className='flex items-center'>
                          <Radio value={item.p_inidfamiliadetalle} id={`${String(item.p_inidfamiliadetalle)}`}/>
                          <label htmlFor={item.p_inidfamiliadetalle}>{item.chfamiliadetalle}</label>
                          </div>
                          <ButtonAler item={item} />
                        </FormControl>
                      ))}
                    </CustomGruopRadio>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expandedSub === "panel2"}
                  onChange={handleChangeSub("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2bh-content'
                    id='panel2bh-header'
                  >
                    <Typography>CAPACIDAD</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AddNewValue headOne={7} headTwo={getValues("model")} />
                    <CustomGruopRadio
                      textKey='capacity'
                      label='Capacidad'
                      handleChange={() => null}
                    >
                      {valueSelect.capacity?.map((item, index) => (
                        <FormControl
                          key={index}
                          label={item.chfamiliadetalle}
                          className='!flex-row justify-between items-center'
                        >
                          <div className='flex items-center'>
                          <Radio value={item.p_inidfamiliadetalle} id={`${String(item.p_inidfamiliadetalle)}`}/>
                          <label htmlFor={item.p_inidfamiliadetalle}>{item.chfamiliadetalle}</label>
                          </div>
                          <ButtonAler item={item} />
                        </FormControl>
                      ))}
                    </CustomGruopRadio>
                  </AccordionDetails>
                </Accordion>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls='panel3bh-content'
              id='panel3bh-header'
            >
              <Typography>CALIBRE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AddNewValue headOne={5} headTwo={0} />
              <CustomGruopRadio
                textKey='caliber'
                label='Calibre'
                handleChange={() => null}
              >
                {valueSelect.caliber?.map((item, index) => (
                  <FormControl
                    key={index}
                    label={item.chfamiliadetalle}
                    className='!flex-row justify-between items-center'
                  >
                    <div className='flex items-center'>
                    <Radio value={item.p_inidfamiliadetalle} id={`${String(item.p_inidfamiliadetalle)}`}/>
                    <label htmlFor={item.p_inidfamiliadetalle}>{item.chfamiliadetalle}</label>
                    </div>
                    <ButtonAler item={item} />
                  </FormControl>
                ))}
              </CustomGruopRadio>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
