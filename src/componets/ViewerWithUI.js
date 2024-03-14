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
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';

const ViewerWithUI = ({ url, loaded }) => {
    const parentDiv = useRef(null);
    const viewerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fileurl = useRef(url);
    // const onResize = useCallback(() => {
    //     handleResize();
    //     // console.log('onresize');
    // }, []);
    
    // const { width, height, ref } = useResizeDetector({
    // handleHeight: false,
    // refreshMode: 'debounce',
    // refreshRate: 1000,
    // onResize
    // });
    
    const actions = [
        { icon: <DownloadIcon />, name: 'Download', action: () => downloadFile(url) },
        { icon: <VisibilityOffOutlined />, name: 'Outline Off', action: () => setOutline(false) },
        { icon: <VisibilityOutlined />, name: 'Outline On', action: () => setOutline(true) },
        { icon: <Rotate90DegreesCcw />, name: 'Y', action: () => setUpVectorY() },
        { icon: <Rotate90DegreesCw />, name: 'Z', action: () => setUpVectorZ() },
        { icon: <PanoramaWideAngle />, name: 'Perspective', action: () => setPerspective() },
        { icon: <PanoramaHorizontal />, name: 'Orthographic', action: () => setOrthographic() },
        { icon: <ZoomInMap />, name: 'Fit Model', action: () => FitModelToWindow() },
      ];
    const ttt = new OV.EdgeSettings(true, new OV.RGBColor(0, 0, 0), 30);
    
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
                    backgroundColor: new OV.RGBAColor(49, 54, 57, 255),
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
                        loaded();
                    },
                });

                // parentDiv.current.
                // ! This feels stupid but unfortunately, this resizing event can persist after clean up and lead to an error, one way to avoid this happening is to just overwrite the method so that it doesn't call this.viewer
                viewer.Resize = () => {

                    if (viewerRef.current !== null && parentDiv.current !== null) {
                        viewerRef.current.GetViewer().Resize(parentDiv.current.clientWidth, parentDiv.current.clientHeight);
                    }
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
            // window.removeEventListener('resize', handleResize);
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

    useEffect(() => {
        if (!parentDiv.current) return;
        const resizeObserver = new ResizeObserver(() => {
            if (url)
                viewerRef.current.Resize();
        });
        resizeObserver.observe(parentDiv.current);
        return () => resizeObserver.disconnect(); // clean up 
      }, []);

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
        <Box sx={{width: '100%', height: '100%'}}>
            {url ?
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 30, left: 30  }}
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
            {url ?
            <Box ref={parentDiv} sx={{height: '100%', color: '#fff'}}>
            </Box>
            : <Typography variant="h6" component="div">
            등록된 파일 없음
          </Typography>
            }            
        </Box>
    );
};

export default ViewerWithUI;