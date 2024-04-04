import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    IconButton,
    Hidden,
    Divider,
    makeStyles
} from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const defaultDrawerWidth = 240;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

export default function ResizableDrawer({ children }: { children: React.ReactNode }) {
    const [drawerWidth, setDrawerWidth] = useState<number>(defaultDrawerWidth);

    const handleMouseDown = (e: any) => {
        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mouseup", handleMouseUp, true);
        document.removeEventListener("mousemove", handleMouseMove, true);
    };


    const handleMouseMove = useCallback((e: any) => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
            setDrawerWidth(newWidth);
        }
    }, []);
    return <Drawer
        // className={classes.drawer}
        variant="permanent"
        PaperProps={{ style: { width: drawerWidth } }}
        sx={{
            flexShrink: 0
        }}
    >
        <Box onMouseDown={e => handleMouseDown(e)}
            sx={{
                width: "2px",
                cursor: "ew-resize",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 98,
                backgroundColor: grey[100],
                transition: 'all 0.35s ease',
            }}
        />
        <List>
            {children}
        </List>
        <Divider />
    </Drawer>
}