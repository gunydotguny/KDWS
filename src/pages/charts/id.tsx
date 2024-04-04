import { Box, ButtonBase, Container, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { theme } from "../../themes/theme";
import { charts } from "../../constants";

function downloadBlob(blob: any, filename: any) {
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const min = 240;
const max = 1920;

export default function App() {
    const router = useRouter()
    const { id } = router.query
    const chart = charts[_.findIndex(charts, (el: any) => el.type === id)]
    const [width, setWidth] = useState<number>(640)
    const [height, setHeight] = useState<number>(480)
    return <Box sx={{
        minWidth: '1376px',
        '@media(max-width: 828px)': {
            minWidth: '280px',
        }
    }}><Box sx={{
        width: '1236px',
        minHeight: 'calc(100vh - 104px)',
        m: theme.spacing(0, 'auto'),
        p: theme.spacing('88px', '40px', '120px', '200px'),
        '@media(max-width: 1493px)': {
            width: '996px',
            ml: '320px',
            pl: 0,
            pr: 0,
        },
        '@media(max-width: 828px)': {
            pl: '20px',
            pr: '20px',
            ml: 'auto !important',
            minHeight: '0 !important',
            p: theme.spacing('70px', '20px', '80px',),
            width: '100% !important',
            pt: '126px'
        }
    }}>
            {chart &&
                <>
                    {/* <MemoMain /> */}
                    <Box sx={{
                        p: theme.spacing('100px', 0, '80px'),
                        '@media(max-width: 828px)': {
                            p: theme.spacing('40px', 0),
                        }
                    }}>
                        <Typography sx={{
                            fontSize: 48,
                            lineHeight: '56px',
                            fontWeight: '900',
                            '@media(max-width: 828px)': {
                                fontSize: 32,
                                lineHeight: '40px',
                            },
                        }}>
                            {chart.title}
                        </Typography>
                    </Box>
                    <Box>
                        <Box>
                            <TextField
                                label='너비'
                                type="number"
                                value={`${width}`}
                                onChange={(e) => {
                                    var value = parseInt(e.target.value, 10);
                                    setWidth(value);
                                }}
                                onBlur={() => {
                                    var value = Number(`${width}`);
                                    if (Number.isNaN(value)) value = 640
                                    if (value > max) value = max;
                                    if (value < min) value = min;
                                    setWidth(value);
                                }}
                                sx={{
                                    mr: 2,
                                }}
                            />
                            <TextField
                                label='높이'
                                type="number"
                                value={`${height}`}
                                onChange={(e) => {
                                    var value = parseInt(e.target.value, 10);
                                    setHeight(value);
                                }}
                                onBlur={() => {
                                    var value = Number(`${width}`);
                                    if (Number.isNaN(value)) value = 640
                                    if (value > max) value = max;
                                    if (value < min) value = min;
                                    setHeight(value);
                                }}
                            />
                        </Box>
                    </Box>
                </>}
        </Box>
    </Box>
}

function Main() {
    const svgRef = useRef<any>();
    const [width, setWidth] = useState<number>(640)
    const height = width * 1
    const downloadSVG = useCallback(() => {
        const svg = svgRef.current.innerHTML;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        downloadBlob(blob, `myimage.svg`);
    }, []);
    return (
        <>
            <Box>
                <Box sx={{
                    p: theme.spacing(2, 3)
                }}>
                    <Typography sx={{
                        fontSize: 32,
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>KHDWS Chart Maker</Typography>
                </Box>
                <Box sx={{
                    p: theme.spacing(2, 3)
                }}>
                    <Box sx={{
                        border: `1px solid ${grey[300]}`,
                        borderRadius: 2,
                        width: `${width}px`,
                        height: `${height}px`,
                    }}>
                        <Box ref={svgRef} sx={{
                            width: `${width}px`,
                            height: `${height}px`,
                        }}>
                            <img src={"/images/test.svg"} />
                        </Box>
                    </Box>
                    <div>
                        <button onClick={downloadSVG}>Download</button>
                    </div>
                </Box>
            </Box>
        </>
    );
}

const MemoMain = React.memo(function (props) {
    return <Main />
})