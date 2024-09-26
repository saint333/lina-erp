import { IconButton, Paper, Typography } from "@mui/material";
import FuseSvgIcon from "@lina/core/LinaSvgIcon";
import { useEffect, useState } from "react";
import { getFlow, getFlowDetail, getQR } from "src/app/services/whatsapp/bots";
import { BotModal } from "../modal/whatsapp/bot";
import { useSearchParams } from "react-router-dom";

export const FlowsContent = () => {
  const [bot, setBot] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const botId = searchParams.get("bot");

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
                className='px-16 text-sm font-medium tracking-tight leading-6 truncate'
                color='text.secondary'
              >
                {item.chname}
              </Typography>
              <div className='flex'>
                <IconButton onClick={() => handleFlow(item.p_inidflow)}>
                  <FuseSvgIcon>heroicons-outline:map</FuseSvgIcon>
                </IconButton>
                <IconButton
                  aria-label='more'
                  size='large'
                >
                  <FuseSvgIcon
                    color={item.actived ? "success" : "gray"}
                    className={item.actived && "animate-pulse"}
                  >
                    {item.actived
                      ? "heroicons-outline:status-online"
                      : "heroicons-outline:status-offline"}
                  </FuseSvgIcon>
                </IconButton>
              </div>
            </div>
            <img src={item.qr} className='w-full m-auto' />
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
