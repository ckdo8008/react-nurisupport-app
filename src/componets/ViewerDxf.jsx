import React, { useEffect, useRef, useState } from 'react';
// import * as DXFViewer from 'dxf-viewer'; // Import the dxf-viewer module
import * as DXFViewer from 'dxf-viewer'
import {Color} from 'three'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ViewHeadline from "@mui/icons-material/ViewHeadline"

import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';

const ViewerDxf = ({ url }) => {
  const containerRef = useRef();
  const fileurl = useRef(url);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  

  const actions = [
    { icon: <DownloadIcon />, name: 'Download', action: () => downloadFile(`${url}`) },
  ];

  const handleAction = (action) => {
      action();
      handleClose();
  };  

  const downloadFile = (url) => {
    fetch(url, { method: 'GET' })
        .then((res) => {
            return res.blob();
        })
        .then((blob) => {
            console.log(fileurl.current);
            const filename = fileurl.current.split('/').pop();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout((_) => {
                window.URL.revokeObjectURL(url);
            }, 60000);
            a.remove();
            setOpen(false);
        })
        .catch((err) => {
            console.error('err: ', err);
        });
};


  useEffect(() => {
    if (url) {
      const viewer = new DXFViewer.DxfViewer(containerRef.current, {
        autoResize: true,
        fileEncoding: "euc-kr",
        clearColor: new Color('#313639')
      });

      viewer.Subscribe('loaded', () => {
        console.log('load ===========================');
      });
      
      viewer.Load({
        url,
        fonts: [ '/assets/NanumGothic-Regular.ttf']
      });
    }
  }, [url]);

  return (
    <Box sx={{width: '100%', height: '100%'}}>
      { url ?
      <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 30, right: 30  }}
          icon={<ViewHeadline />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          >
          {actions.map((action) => (
          <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleAction(action.action)}
          />
          ))}
      </SpeedDial>
      : <></>
      }
      { url ?
      <Box ref={containerRef} style={{ width: '100%', height: '100%', minWidth: '100px' }} />
      : <Typography variant="h6" component="div">
      등록된 파일 없음
    </Typography>
      }
    </Box>
  );
}

export default ViewerDxf;
