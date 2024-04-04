import { Box, ButtonBase, Container, Stack, Typography, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import { theme } from "../../themes/theme";
import Link from 'next/link'
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { UserProps, authLabel } from "../../datas/user";
import Navigation from "../molecules/Navigation";
import { useEffect, useState } from "react";
import { pages } from "../../constants";
import { useRouter } from "next/router";

export default function GlobalNavigation() {
    const router = useRouter()
    const pathnames = router.pathname.split("/");
    const [user, setUser] = useRecoilState<UserProps | null>(userState)
    const [mounted, setMounted] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [menuDisplay, setMenuDisplay] = useState<string>('none')
    const handleMenuClick = () => {
        if (menuOpen === true && menuDisplay === 'flex') {
            setMenuOpen(false)
            setTimeout(() => {
                setMenuDisplay('none')
            }, 500)
        } else if (menuOpen === false && menuDisplay === 'none') {
            setMenuOpen(true)
            setMenuDisplay('flex')
        }
    }
    useEffect(() => {
        setMounted(true)
    }, [])
    return mounted ? <>
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
            backgroundColor: alpha('#ffffff', 0.9),
            borderBottom: router.pathname !== '/' ? `1px solid ${grey[300]}` : `none`,
        }}>
            <Box sx={{
                minWidth: '280px !important',
                height: 88,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.35s ease',
                p: theme.spacing(0, 4),
                '@media(max-width: 828px)': {
                    height: 70,
                    p: theme.spacing(0, 2.5),
                }
            }}>
                <Link href='/' passHref>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& .icon': {
                            width: 14,
                            height: 'auto',
                            m: theme.spacing(0, 0.75, 0, 0)
                        },
                        cursor: 'pointer',
                    }}>
                        <img src='/icon/writing.png' className="icon" />
                        <Typography sx={{
                            fontSize: 16,
                            lineHeight: '24px',
                            fontWeight: '900',
                            letterSpacing: '-2px'
                        }}>
                            KHC DP Wireframe System
                        </Typography>
                    </Box>
                </Link>
                <ButtonBase
                    disableRipple
                    sx={{
                        display: 'none',
                        aspectRatio: '1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& .icon': {
                            width: 20,
                            height: 'auto',
                        },
                        '@media(max-width: 828px)': {
                            display: 'flex',
                        },
                        transition: 'all 0.35s ease',
                        transform: `rotate(${menuOpen ? '45deg' : '0deg'})`
                    }}
                    onClick={handleMenuClick}
                >
                    <img src='/icon/layout.png' className="icon" />
                </ButtonBase>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    '@media(max-width: 828px)': {
                        display: 'none',
                    }
                }}>
                    {pages.map((item, index) => {
                        const focused = `/${pathnames[1]}` === item.url
                        const onClick = (e: any) => {
                            e.stopPropagation()
                            e.preventDefault()
                            if (item.url === '') {
                                alert('작업중입니다.')
                            } else {
                                router.push(item.url)
                                setMenuOpen(false)
                            }
                        }
                        return <Link key={index} href={item.url} passHref>
                            <ButtonBase
                                disableRipple
                                sx={{
                                    m: theme.spacing(0, 2, 0, 0),
                                    '&:hover': {
                                        '& .title': {
                                            color: grey[900]
                                        },
                                    },
                                }}
                                onClick={onClick}
                            >
                                <Typography sx={{
                                    fontSize: 16,
                                    lineHeight: '24px',
                                    fontWeight: '700',
                                    transition: 'all 0.5s ease',
                                    color: focused ? grey[900] : grey[500]
                                }}
                                    className="title"
                                >
                                    {item.title}
                                </Typography>
                            </ButtonBase>
                        </Link>
                    })}
                </Box>
            </Box>
        </Box>
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'none',
            '@media(max-width: 828px)': {
                display: 'flex',
                zIndex: menuDisplay === 'flex' ? 99999 : -1,
                p: theme.spacing(1, 0),
                backgroundColor: '#ffffff',
                borderBottom: `1px solid ${grey[300]}`,
                transition: 'opacity 0.5s ease',
                opacity: menuOpen ? 1 : 0,
                minWidth: '280px !important',
            },
        }}>
            <ButtonBase
                disableRipple
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: 70,
                    aspectRatio: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& .icon': {
                        width: 20,
                        height: 'auto',
                    },
                }}
                onClick={handleMenuClick}
            >
                <img src='/icon/close.png' className="icon" />
            </ButtonBase>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: '70px',
            }}>
                {pages.map((item, index) => {
                    const focused = `/${pathnames[1]}` === item.url
                    const onClick = (e: any) => {
                        if (item.url === '') {
                            alert('작업중입니다.')
                        } else {
                            setMenuOpen(false)
                        }
                    }
                    return <Link key={index} href={item.url} passHref>
                        <ButtonBase
                            disableRipple
                            sx={{
                                justifyContent: 'flex-start',
                                m: theme.spacing(0),
                                p: theme.spacing(1.5, 2.5),
                                '&:hover': {
                                    '& .title': {
                                        color: grey[900]
                                    },
                                },

                            }}
                            onClick={onClick}
                        >
                            <Typography sx={{
                                fontSize: 20,
                                lineHeight: '28px',
                                fontWeight: '900',
                                transition: 'all 0.5s ease',
                                color: focused ? grey[900] : grey[500]
                            }}
                                className="title"
                            >
                                {item.title}
                            </Typography>
                        </ButtonBase>
                    </Link>
                })}
            </Box>
        </Box >
    </> : <></>
}
