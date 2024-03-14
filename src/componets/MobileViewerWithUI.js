import { useEffect, useRef, useState } from "react";
import * as OV from "online-3d-viewer";

import Box from '@mui/material/Box';

const MobileViewerWithUI = ({ url, loaded, stlurl }) => {
    const parentDiv = useRef(null);
    const viewerRef = useRef(null);
    
    const ttt = new OV.EdgeSettings(true, new OV.RGBColor(0, 0, 0), 30);
    
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

                viewer.Resize = () => {
                    if (viewerRef.current !== null && parentDiv.current !== null) {
                        viewerRef.current.GetViewer().Resize(parentDiv.current.clientWidth, parentDiv.current.clientHeight);
                    }
                };

                viewer.GetViewer().projectionMode = OV.ProjectionMode.Perspective;
                
                viewerRef.current = viewer;
                let urls = [
                    stlurl
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

    const FitModelToWindow = () => {
        if (viewerRef.current) {
            
            let boundingSphere = viewerRef.current.GetViewer().GetBoundingSphere ((meshUserData) => {
                return meshUserData;
            });
            viewerRef.current.GetViewer().FitSphereToWindow (boundingSphere, true);
        }
    };

    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Box ref={parentDiv} sx={{height: '100%', color: '#fff'}}>
            </Box>         
        </Box>
    );
};

export default MobileViewerWithUI;