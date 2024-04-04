import { Box, ButtonBase, Container, InputBase, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { cyan, deepPurple, grey, pink, teal } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { theme } from "../../themes/theme";
import { charts } from "../../constants";
import { Chart } from "react-chartjs-2";
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
    // const { id } = router.query
    const chart = charts[_.findIndex(charts, (el: any) => el.type === 'bar_chart')]
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
                                {chart.title}
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
                                {chart.description}
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
                    <Canvas />
                </>}
        </Box>
    </Box>
}

function Canvas() {
    const [tempWidth, setTempWidth] = useState<number>(640)
    const [tempHeight, setTempHeight] = useState<number>(480)
    const [width, setWidth] = useState<number>(640)
    const [height, setHeight] = useState<number>(480)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    function Controls() {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return <Box sx={{
            heigt: 48,
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: '#ffffff',
            boxShadow: '0 0.5px 8px rgba(0,0,0,.16)',
            zIndex: 99,
            '& img': {
                width: '20px',
                height: 'auto'
            },
            '@media(max-width: 828px)': {
                top: 8,
                right: 8,
                '& > button': {
                    width: `36px !important`,
                    height: `36px !important`,
                    '& img': {
                        width: '16px',
                        height: 'auto'
                    },
                }
            },
        }}>
            <ButtonBase
                disableRipple
                sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={() => zoomIn()}
            >
                <img src='/icon/zoom-in.png' />
            </ButtonBase>
            <Box sx={{ width: '100%', height: '1px', backgroundColor: grey[300] }} />
            <ButtonBase
                disableRipple
                sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={() => zoomOut()}
            >
                <img src='/icon/zoom-out.png' />
            </ButtonBase>
            <Box sx={{ width: '100%', height: '1px', backgroundColor: grey[300] }} />
            <ButtonBase
                disableRipple
                sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={() => resetTransform()}
            >
                <img src='/icon/rotate.png' />
            </ButtonBase>
        </Box>
    }
    return <Box sx={{
        m: theme.spacing('80px', 0, '60px'),
        '@media(max-width: 828px)': {
            m: theme.spacing('40px', 0, '60px'),
        },
        '& input': {
            pb: 0
        },
    }}>
        <Box sx={{
            m: theme.spacing('160px', 0, '12px'),
            '@media(max-width: 828px)': {
                m: theme.spacing('80px', 0, '12px'),
            },
            '&:nth-of-type(1)': {
                mt: 0,
            }
        }}>
            <Typography sx={{
                fontSize: 32,
                lineHeight: '40px',
                fontWeight: '700',
                '@media(max-width: 828px)': {
                    fontSize: 24,
                    lineHeight: '32px',
                },
            }}>
                Chart Maker
            </Typography>
        </Box>
        <Box sx={{
            position: 'relative'
        }}>
            <Box sx={{
                position: 'relative',
                backgroundColor: grey[100],
                border: `1px solid ${grey[300]}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'scroll',
                width: '100%',
                aspectRatio: `16/9`,
                m: theme.spacing('20px', 'auto', 0),
                '@media(max-width: 828px)': {
                    m: theme.spacing('16px', 'auto', 0),
                    aspectRatio: `1`,
                },
            }}>
                <Box sx={{
                    width: '100%',
                    aspectRatio: `16/9`,
                    '@media(max-width: 828px)': {
                        aspectRatio: `1`,
                    },
                }}>
                    <Box sx={{
                        width: '100% !important',
                        height: '100% !important',
                        '& .react-transform-wrapper': {
                            width: '100% !important',
                            height: '100% !important',
                        },
                        '& .react-transform-component': {
                            // width: '100% !important',
                            // height: '100% !important',
                            p: theme.spacing(3, 3, 6, 3)
                        },
                        '@media(max-width: 828px)': {
                            '& .react-transform-component': {
                                // width: '100% !important',
                                // height: '100% !important',
                                p: theme.spacing(3, 3, 3, 3)
                            },
                        },
                    }}><TransformWrapper minScale={0.5} wheel={{ step: 100 }}
                        centerOnInit={true}
                    >
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <>
                                    <Controls />
                                    <TransformComponent>
                                        <Box sx={{
                                            minWidth: `${width}px`,
                                            minHeight: `${height}px`,
                                            width: `${width}px`,
                                            height: `${height}px`,
                                            backgroundColor: '#ffffff',
                                        }}>
                                            <Graph />
                                        </Box>
                                    </TransformComponent>
                                </>)}
                        </TransformWrapper>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
                mt: 2,
                '@media(max-width: 828px)': {
                    flexDirection: 'column'
                }
            }}>
                <Box sx={{
                    height: 48,
                    border: `1px solid ${grey[300]}`,
                    backgroundColor: '#ffffff',
                    // boxShadow: '0 0.5px 8px rgba(0,0,0,.16)',
                    display: 'flex',
                    mr: 1,
                    flex: 1,
                    '@media(max-width: 828px)': {
                        // border: 'none',
                        flex: 'initial',
                        mr: 0,
                        height: 'auto',
                        boxShadow: 'none',
                        flexDirection: 'column'
                    }
                }}>
                    <Box sx={{
                        position: 'relative',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        '@media(max-width: 828px)': {
                            flex: 'initial',
                            height: 36,
                        }
                    }}>
                        <Box sx={{
                            p: theme.spacing(0, 2)
                        }}>
                            <Typography sx={{
                                fontSize: 14,
                                color: grey[500],
                            }}>너비</Typography>
                        </Box>
                        <InputBase
                            type="number"
                            size="small"
                            value={`${tempWidth}`}
                            onChange={(e) => {
                                var value = parseInt(e.target.value, 10);
                                setTempWidth(value);
                            }}
                            onBlur={() => {
                                var value = Number(`${tempWidth}`);
                                if (Number.isNaN(value)) value = 640
                                if (value > max) value = max;
                                if (value < min) value = min;
                                setTempWidth(value);
                                setWidth(value);
                            }}
                            onKeyUp={(ev) => {
                                console.log(`Pressed keyCode ${ev.key}`);
                                if (ev.key === 'Enter') {
                                    var value = Number(`${tempWidth}`);
                                    if (Number.isNaN(value)) value = 640
                                    if (value > max) value = max;
                                    if (value < min) value = min;
                                    setTempWidth(value);
                                    setWidth(value);
                                    ev.preventDefault();
                                }
                            }}
                            sx={{
                                flex: 1,
                                height: '100%',
                                fontSize: 14,
                                pr: '40px',
                                '& *': { p: 0 },
                            }}
                        />
                        <img src='/icon/pen.png' style={{
                            position: 'absolute',
                            top: '50%',
                            right: 16,
                            transform: 'translateY(-50%)',
                            width: 14, height: 'auto', zIndex: 2
                        }} />
                    </Box>
                    <Box sx={{
                        width: '1px', backgroundColor: grey[300],
                        '@media(max-width: 828px)': {
                            width: '100%',
                            height: '1px'
                        }
                    }} />
                    <Box sx={{
                        position: 'relative',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        '@media(max-width: 828px)': {
                            flex: 'initial',
                            height: 36,
                        }
                    }}>
                        <Box sx={{
                            p: theme.spacing(0, 2)
                        }}>
                            <Typography sx={{
                                fontSize: 14,
                                color: grey[500],
                            }}>높이</Typography>
                        </Box>
                        <InputBase
                            type="number"
                            size="small"
                            value={`${tempHeight}`}
                            onChange={(e) => {
                                var value = parseInt(e.target.value, 10);
                                setTempHeight(value);
                            }}
                            onBlur={() => {
                                var value = Number(`${tempHeight}`);
                                if (Number.isNaN(value)) value = 640
                                if (value > max) value = max;
                                if (value < min) value = min;
                                setHeight(value);
                                setTempHeight(value);
                            }}
                            onKeyUp={(ev) => {
                                console.log(`Pressed keyCode ${ev.key}`);
                                if (ev.key === 'Enter') {
                                    var value = Number(`${tempHeight}`);
                                    if (Number.isNaN(value)) value = 480
                                    if (value > max) value = max;
                                    if (value < min) value = min;
                                    setHeight(value);
                                    setTempHeight(value);
                                    ev.preventDefault();
                                }
                            }}
                            sx={{
                                flex: 1,
                                height: '100%',
                                fontSize: 14,
                                pr: '40px',
                                '& *': { p: 0 },
                            }}
                        />
                        <img src='/icon/pen.png' style={{
                            position: 'absolute',
                            top: '50%',
                            right: 16,
                            transform: 'translateY(-50%)',
                            width: 14, height: 'auto', zIndex: 2
                        }} />
                    </Box>
                </Box>
                <Box sx={{
                    flex: 1,
                    height: 48,
                    display: 'flex',
                    '@media(max-width: 828px)': {
                        mt: 2,
                        flex: 'initial',
                        '& button': {
                            boxShadow: 'none',
                            width: '100% !important',
                        }
                    }
                }}>
                    <Box sx={{
                        height: '100%',
                        flex: 1,
                        mr: 1,
                        '@media(max-width: 828px)': {
                            flex: 1,
                        }
                    }}>
                        <ButtonBase
                            // disableRipple
                            sx={{
                                width: '100%',
                                height: '100%',
                                p: theme.spacing(0, 2),
                                backgroundColor: teal[500],
                                '& .icon': {
                                    width: '20px',
                                    height: 'auto',
                                    mr: 1,
                                }
                            }}
                            onClick={() => alert('기능 준비중입니다.')}
                        >
                            <img src='/icon/file-upload_white.png' className="icon" />
                            <Typography sx={{
                                fontSize: 14,
                                lineHeight: '20px',
                                color: '#ffffff',
                                fontWeight: '700',
                            }}>
                                CSV 업로드
                            </Typography>
                        </ButtonBase>
                    </Box>
                    <Box sx={{
                        flex: 1,
                        height: '100%',
                        '@media(max-width: 828px)': {
                            flex: 1,
                        }
                    }}>
                        <ButtonBase
                            // disableRipple
                            sx={{
                                width: '100%',
                                height: '100%',
                                p: theme.spacing(0, 0, 0, 2),
                                backgroundColor: deepPurple[500],
                                // boxShadow: '0 0.5px 8px rgba(0,0,0,.16)',
                                '& .icon': {
                                    width: '20px',
                                    height: 'auto',
                                }
                            }}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                setAnchorEl(anchorEl === null ? event.currentTarget : null);
                            }}
                        >
                            <Typography sx={{
                                fontSize: 14,
                                lineHeight: '20px',
                                color: '#ffffff',
                                fontWeight: '700',
                                textAlign: 'center',
                                flex: 1,
                            }}>
                                내보내기
                            </Typography>
                            <Box sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                // borderLeft: `1px solid ${grey[500]}`,
                                backgroundColor: deepPurple[700],
                                ml: 2,
                                p: theme.spacing(0, 1),
                                '& .icon': {
                                    transform: 'rotate(180deg)'
                                }

                            }}>
                                <img src='/icon/caret-up_white.png' className="icon" />
                            </Box>
                        </ButtonBase>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        // hideBackdrop
                        >
                            <MenuItem onClick={() => {
                                alert('기능 준비중입니다.')
                                setAnchorEl(null)
                            }}>SVG로 저장</MenuItem>
                            <MenuItem onClick={() => {
                                alert('기능 준비중입니다.')
                                setAnchorEl(null)
                            }}>PNG로 저장</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box >
}

function Graph() {
    const chartData = {
        labels: ["23-05", "23-06", "23-07", "23-08", "23-09", "23-10", "23-11", "23-12", "23-01", "23-02", "23-03", "24-04"],
        datasets: [
            {
                type: "bar" as const,
                label: "전체 환자 수",
                data: [4000, 4500, 4700, 5200, 5100, 5500, 6000, 5500, 5600, 5200, 7000, 8000],
                pointRadius: 0,
                pointBorderWidth: 0,
                borderWidth: 2,
                curve: 0,
                backgroundColor: pink[500],
                borderColor: 'transparent',
            },
            {
                type: "bar" as const,
                label: "지식은행 환자 수",
                data: [3000, 2500, 4500, 4300, 4900, 4700, 5300, 5000, 5100, 4300, 6000, 7500],
                pointRadius: 0,
                pointBorderWidth: 0,
                borderWidth: 2,
                curve: 0,
                backgroundColor: cyan[500],
                borderColor: 'transparent',
            },
        ],
    }
    const chartOptions = {
        plugins: {
            legend: {
                // display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    font: {
                        size: 12,
                        family: `LINESeedKR`,
                        weight: `500`
                    },
                    color: grey[600],
                },
                grid: {
                    // display: false,
                    drawBorder: false,
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                        family: `LINESeedKR`,
                        weight: `500`
                    },
                    color: grey[600],
                },
                grid: {
                    display: false,
                    // drawBorder: false,
                },
            },
        },
        maintainAspectRatio: false,
    };
    return <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
    />
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