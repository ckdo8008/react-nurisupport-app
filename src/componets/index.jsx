import React from "react";

import Basic3DViewer from "./Basic3DViewer";
import ViewerWithUrls from "./ViewerWithUrls";
import ViewerWithUI from "./ViewerWithUI";
import { useEffect, useRef, useState } from "react";

const Index = (props) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl("http://localhost:3003/assets/models/NURIROBOT_BA59E_3D.STEP");
  });

  return (
    <>
      <div>
        <ViewerWithUI url={url}  />
      </div>
    </>
  );
};

export default Index;