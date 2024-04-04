import { Box, ButtonBase, Container, InputBase, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { cyan, deepPurple, grey, pink, teal } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { theme } from "../../themes/theme";
import { foundations } from "../../constants";
import { TransformWrapper, TransformComponent, useControls, } from "react-zoom-pan-pinch";

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
    const foundation = foundations[_.findIndex(foundations, (el: any) => el.type === id)]
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
            {foundation &&
                <>
                    <Box sx={{
                        p: theme.spacing('100px', 0, '80px'),
                        '@media(max-width: 828px)': {
                            p: theme.spacing('40px', 0),
                        },
                        borderBottom: `1px solid ${grey[300]}`
                    }}>
                        <Box sx={{
                            pr: '104px',
                            '@media(max-width: 828px)': {
                                pr: 0,
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
                                {foundation.title}
                            </Typography>
                            <Typography sx={{
                                mt: 2,
                                fontSize: 16,
                                lineHeight: '24px',
                                color: grey[700],
                                '@media(max-width: 828px)': {
                                    fontSize: 14,
                                    lineHeight: '24px',
                                },
                            }}>
                                {foundation.description}
                            </Typography>
                            <ButtonBase sx={{
                                mt: 4,
                                width: 'auto',
                                height: 48,
                                p: theme.spacing(0, 2),
                                backgroundColor: grey[900],
                                color: '#ffffff',
                                fontWeight: '700',
                                '& .icon': {
                                    width: '24px',
                                    height: 'auto',
                                }
                            }}
                                onClick={() => window.open('https://www.figma.com/file/s4LF8C7lP1WVoZD9BIvqoR/KHC-DP-Wireframe-System?type=design&node-id=0%3A1&mode=design&t=0Wrqpu3RY3mLWmeo-1')}
                            >
                                <img src='/logo/figma.png' className="icon" />
                                <Box sx={{
                                    flex: 1,
                                    p: theme.spacing(0, 1)
                                }}>
                                    Figma에서 보기
                                </Box>
                            </ButtonBase>
                        </Box>
                    </Box>
                </>}
        </Box>
    </Box>
}