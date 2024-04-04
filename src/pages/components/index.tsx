import { Box, ButtonBase, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import { deepPurple, grey } from "@mui/material/colors";
import { charts, components } from "../../constants";
import Link from "next/link";

export default function App() {
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
                        Components
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
                        KDWS의 컴포넌트는 명확한 표준에 따라 기획자가 재사용 가능한 구성요소로 이루어져 있으며, 수많은 변형과 조립 형태로 사용할 수 있습니다.
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
            <Box sx={{
                m: theme.spacing('140px', 'auto', '0'),
                maxWidth: '1200px',
                display: 'grid',
                gridTemplateColumns: `repeat(3, 1fr)`,
                gridRowGap: 16,
                gridColumnGap: 16,
                '@media(max-width: 828px)': {
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    m: theme.spacing('80px', 0, '0'),
                },
                '@media(max-width: 640px)': {
                    gridTemplateColumns: `repeat(1, 1fr)`,
                    m: theme.spacing('40px', 0, '0'),
                },
            }}>
                {components.map((item, index) => {
                    return <Link key={index} href={`/components/${item.type}`} passHref>
                        <ButtonBase
                            disableRipple
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                border: `1px solid ${grey[300]}`,
                                transition: 'all 0.5s ease',
                                '& .icon_colored': {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0,
                                    transition: 'all 0.5s ease',
                                },
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 4px 24px 0 rgba(0, 0, 0, 0.12)`,
                                    '& .icon_colored': {
                                        opacity: 1,
                                    },
                                    '& .title': {
                                        color: deepPurple[500]
                                    },
                                    '& .description': {
                                        color: deepPurple[500]
                                    },
                                }
                            }}
                        >
                            <Box sx={{
                                position: 'relative',
                                // '& .icon': {
                                //     width: 48,
                                //     height: 'auto',
                                // }
                                width: '100%',
                                aspectRatio: '16/9',
                                overflow: 'hidden',
                                '& img': {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    objectFit: 'cover'
                                }
                            }}>
                                <img src={`/components/${item.type}.png`} className="icon" />
                            </Box>
                            <Box sx={{
                                flex: 1,
                                p: theme.spacing(3),
                                '@media(max-width: 828px)': {
                                    p: theme.spacing(2),
                                },
                            }}>
                                <Typography sx={{
                                    fontSize: 20,
                                    lineHeight: '28px',
                                    fontWeight: '700',
                                    transition: 'all 0.5s ease',
                                }}
                                    className="title"
                                >
                                    {item.title}
                                </Typography>
                                <Typography sx={{
                                    fontSize: 14,
                                    lineHeight: '20px',
                                    color: grey[700],
                                    m: theme.spacing(1, 0, 0, 0),
                                    transition: 'all 0.5s ease',
                                }}
                                    className="description"
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </ButtonBase>
                    </Link>
                })}
            </Box>
        </Box>
    </Box>
}