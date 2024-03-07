import { useEffect, useRef, useState } from "react";
import * as OV from "online-3d-viewer";

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ViewHeadline from "@mui/icons-material/ViewHeadline"

import Rotate90DegreesCcw from '@mui/icons-material/Rotate90DegreesCcw';
import Rotate90DegreesCw from '@mui/icons-material/Rotate90DegreesCw';
import ZoomInMap from '@mui/icons-material/ZoomInMap'
import PanoramaWideAngle from '@mui/icons-material/PanoramaWideAngle'
import PanoramaHorizontal from '@mui/icons-material/PanoramaHorizontal'

import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'

const ViewerWithUI = ({ url }) => {
    const parentDiv = useRef(null);
    const viewerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actions = [
        { icon: <VisibilityOffOutlined />, name: 'Outline Off', action: () => setOutline(false) },
        { icon: <VisibilityOutlined />, name: 'Outline On', action: () => setOutline(true) },
        { icon: <Rotate90DegreesCcw />, name: 'Y', action: () => setUpVectorY() },
        { icon: <Rotate90DegreesCw />, name: 'Z', action: () => setUpVectorZ() },
        { icon: <PanoramaWideAngle />, name: 'Perspective', action: () => setPerspective() },
        { icon: <PanoramaHorizontal />, name: 'Orthographic', action: () => setOrthographic() },
        { icon: <ZoomInMap />, name: 'Fit Model', action: () => FitModelToWindow() },
      ];
    const ttt = new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 30);      

    useEffect(() => {
        console.log(url);
        console.log(parentDiv);
        if (url) {
            OV.SetExternalLibLocation("libs");
            OV.Init3DViewerElements();

            
            if (viewerRef.current === null) {
                let viewer = new OV.EmbeddedViewer(parentDiv.current, {
                    camera: new OV.Camera(
                        new OV.Coord3D(-150.0, 200.0, 300.0),
                        new OV.Coord3D(0.0, 0.0, 0.0),
                        new OV.Coord3D(0.0, 1.0, 0.0),
                        45.0
                    ),
                    backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
                    defaultColor: new OV.RGBColor(0, 100, 100),
                    edgeSettings: ttt,
                    environmentMap: [
                        "../website/assets/envmaps/grayclouds/posx.jpg",
                        "../website/assets/envmaps/grayclouds/negx.jpg",
                        "../website/assets/envmaps/grayclouds/posy.jpg",
                        "../website/assets/envmaps/grayclouds/negy.jpg",
                        "../website/assets/envmaps/grayclouds/posz.jpg",
                        "../website/assets/envmaps/grayclouds/negz.jpg",
                    ],
                    onModelLoaded: () => {
                        FitModelToWindow();
                    },
                });
                // ! This feels stupid but unfortunately, this resizing event can persist after clean up and lead to an error, one way to avoid this happening is to just overwrite the method so that it doesn't call this.viewer
                viewer.Resize = () => {
                    console.log("I'm not resizing");
                };

                viewer.GetViewer().projectionMode = OV.ProjectionMode.Perspective;
                
                viewerRef.current = viewer;
                let urls = [
                    url
                ]
                viewer.LoadModelFromUrlList(urls);
            }
        }

        return () => {
            if (viewerRef.current !== null && parentDiv.current !== null) {
                delete viewerRef.current.model;
                viewerRef.current.viewer.renderer.resetState();
                viewerRef.current.viewer.Clear();
                delete viewerRef.current.viewer;
                const gl = viewerRef.current.canvas.getContext("webgl2");
                gl.getExtension("WEBGL_lose_context").loseContext();
                const tempClone = viewerRef.current.canvas.cloneNode(true);
                viewerRef.current.canvas.parentNode.replaceChild(
                    tempClone,
                    viewerRef.current.canvas
                );
                parentDiv.current.removeChild(parentDiv.current.children[0]);
                viewerRef.current = null;
            }
        };
    }, [url]);

    const Direction = { X: 1, Y: 2, Z: 3 };

    const setUpVectorZ = () => {
        if (viewerRef.current) {
            viewerRef.current
                .GetViewer()
                .SetUpVector(
                    Direction.Z,
                    viewerRef.current.GetViewer().GetCamera()
                );
        }
    };
    const setUpVectorY = () => {
        if (viewerRef.current) {
            viewerRef.current
                .GetViewer()
                .SetUpVector(
                    Direction.Y,
                    viewerRef.current.GetViewer().GetCamera()
                );
        }
    };

    const setOutline = (value) => {
        if (viewerRef.current) {
            ttt.showEdges = value;
            viewerRef.current
                .GetViewer()
                .SetEdgeSettings(ttt);
        }
    };

    const setPerspective = () => {
        if (viewerRef.current) {
            viewerRef.current
                .GetViewer()
                .SetProjectionMode(
                    OV.ProjectionMode.Perspective 
                );
        }
    };

    const setOrthographic = () => {
        if (viewerRef.current) {
            viewerRef.current
                .GetViewer()
                .SetProjectionMode(
                    OV.ProjectionMode.Orthographic
                );
        }
    };

    const FitModelToWindow = () => {
        if (viewerRef.current) {
            
            let boundingSphere = viewerRef.current.GetViewer().GetBoundingSphere ((meshUserData) => {
                return meshUserData;
            });
            viewerRef.current.GetViewer().FitSphereToWindow (boundingSphere, true);
        }
    };

    const handleAction = (action) => {
        action();
        handleClose();
    };

    return (
        <>
            <Box sx={{ position: 'relative', mt: 3, height: 600 }}
            ref={parentDiv}
            role={"img"}
            aria-label="Canvas showing the model in the 3D Viewer"
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 30, right: 30 }}
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
            </Box>
        </>
    );
};

export default ViewerWithUI;