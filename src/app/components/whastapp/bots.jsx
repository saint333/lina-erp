import { IconButton, Paper, Typography } from "@mui/material";
import FuseSvgIcon from "@lina/core/LinaSvgIcon";
import { useEffect, useState } from "react";
import { getBots, getQR } from "src/app/services/whatsapp/bots";

export const BotsContent = () => {
  const [bot, setBot] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBots();
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        const data = await getQR(element.p_inidbot);
        response[index].qr = data;
      }
      setBot(response);
    };
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0'>
      {bot.map((item, index) => {
        console.log(item);
        
        return (
          <Paper
            className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
            key={index}
          >
            {/* <img src={"image/png,"+item.qr.replace("PNG", "")}/> */}
            <img src='https://api-messages.linaerp.com/api/whatsapp/qrcode/1'/>
          </Paper>
        );
      })}
    </div>
  );
};
