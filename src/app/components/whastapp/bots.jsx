import { IconButton, Paper, Typography } from "@mui/material";
import FuseSvgIcon from "@lina/core/LinaSvgIcon";
import { useEffect, useState } from "react";
import { getBots, getQR } from "src/app/services/whatsapp/bots";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-24 w-full min-w-0'>
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
              <div>
                <IconButton onClick={() => handleFlow(item.p_inidbot)}>
                  <FuseSvgIcon>heroicons-outline:map</FuseSvgIcon>
                </IconButton>
                <IconButton
                  aria-label='more'
                  size='large'
                  onClick={() => handleRefresh(item.p_inidbot)}
                >
                  <FuseSvgIcon>heroicons-outline:refresh</FuseSvgIcon>
                </IconButton>
              </div>
            </div>
            <img src={item.qr} className='w-full m-auto' />
          </Paper>
        );
      })}
    </div>
  );
};
