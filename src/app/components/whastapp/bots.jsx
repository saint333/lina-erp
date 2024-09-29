import { Divider, IconButton, Paper, Typography } from "@mui/material";
import FuseSvgIcon from "@lina/core/LinaSvgIcon";
import { useEffect, useState } from "react";
import { botRestart, getBots, getQR } from "src/app/services/whatsapp/bots";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const BotsContent = () => {
  const [bot, setBot] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBots();
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        const data = await getQR(element.p_inidbot);
        response[index].qr = URL.createObjectURL(data);
      }
      setBot(response);
    };
    fetchData();
  }, []);

  const handleRefresh = async (id) => {
    const bots = [...bot];
    for (let index = 0; index < bots.length; index++) {
      const data = await getQR(id);
      bots[index].qr = URL.createObjectURL(data);
      console.log("🚀 ~ handleRefresh ~ bot:", bots);
    }
    setBot(bots);
  };

  const handleFlow = async (id) => {
    navigate(`/crm/flows?bot=${id}`);
  };

  const handleRestart = async (id) => {
    const response = await botRestart(id);
    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
        style: { fontSize: "1.3rem" },
      });
      const bots = [...bot];
      for (let index = 0; index < bots.length; index++) {
        const data = await getQR(id);
        bots[index].qr = URL.createObjectURL(data);
      }
      setBot(bots);
    }else{
      enqueueSnackbar(response.message, {
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
            <div className='flex items-center justify-between pt-10'>
              <Typography
                className='px-16 text-sm md:text-md lg:text-lg font-medium tracking-tight leading-6 truncate'
                color='text.secondary'
              >
                {item.chname}
              </Typography>
              <div className='flex'>
                <IconButton
                  onClick={() => handleFlow(item.p_inidbot)}
                  className='p-5'
                >
                  <FuseSvgIcon size={20}>
                    heroicons-outline:external-link
                  </FuseSvgIcon>
                </IconButton>
                <IconButton
                  onClick={() => handleRefresh(item.p_inidbot)}
                  className='p-5'
                >
                  <FuseSvgIcon size={20}>heroicons-outline:refresh</FuseSvgIcon>
                </IconButton>
                <IconButton
                  onClick={() => handleRestart(item.p_inidbot)}
                  className='p-5'
                >
                  <FuseSvgIcon size={20}>heroicons-outline:refresh</FuseSvgIcon>
                </IconButton>
              </div>
            </div>
            <Divider />
            <img src={item.qr} className='w-full md:w-10/12 m-auto' />
          </Paper>
        );
      })}
    </div>
  );
};
