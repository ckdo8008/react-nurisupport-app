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

const MobileViewerDxf = ({ url }) => {
  const containerRef = useRef();

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
      <Box ref={containerRef} style={{ width: '100%', height: '100%', minWidth: '100px' }} />
    </Box>
  );
}

export default MobileViewerDxf;
