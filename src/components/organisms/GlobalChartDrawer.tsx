import { Box, ButtonBase, Container, Drawer, Typography, alpha } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useRouter } from "next/router"
import { charts } from "../../constants"
import Link from "next/link"
import { theme } from "../../themes/theme"
import { useEffect, useState } from "react"

export default function GlobalChartDrawer() {
    const router = useRouter()
    const pathnames = router.pathname.split("/");
    const { type } = router.query
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
    return <>
        <ButtonBase
            disableRipple
            sx={{
                position: 'fixed',
                top: 70,
                left: 0,
                right: 0,
                zIndex: 9999,
                display: 'none',
                '@media(max-width: 828px)': {
                    display: pathnames[1] === 'charts' ? 'flex' : 'none',
                },
                height: 56,
                borderBottom: `1px solid ${grey[300]}`,
                p: theme.spacing(0, '20px'),
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: alpha('#ffffff', 0.9)
            }}
            onClick={handleMenuClick}
        >
            <Typography sx={{
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: '900',
            }}>
                Charts
            </Typography>
        </ButtonBase>
        <Box
            sx={{
                display: pathnames[1] === 'charts' ? 'flex' : 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                borderRight: `1px solid ${grey[300]}`,
                minWidth: 'initial',
                width: `278px !important`,
                backgroundColor: '#ffffff',
                overflowX: 'hidden',
                overflowY: 'scroll',
                zIndex: 99,
                '@media(max-width: 828px)': {
                    top: 0,
                    pt: '126px',
                    bottom: 'inital',
                    right: 0,
                    width: '100% !important',
                    transition: 'transform 0.5s ease',
                    transform: `translateY(${menuOpen ? '0%' : '-100%'})`,
                    height: `calc(100% - 70px)`,
                    borderBottom: `1px solid ${grey[300]}`,
                    borderRight: 'none',
                    zIndex: menuDisplay === 'flex' ? 999 : -1,
                },
            }}>
            <Box sx={{
                pt: '88px',
                '@media(max-width: 828px)': {
                    pt: 0,
                },
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: theme.spacing(4, 0),
                    '@media(max-width: 828px)': {
                        pt: 1,
                    },
                }}>
                    {charts.map((item, index) => {
                        const focused = type === item.type
                        return <Link key={index} href={{
                            pathname: '/charts/[id]',
                            query: { id: item.type },
                        }}
                            passHref
                        >
                            <ButtonBase disableRipple sx={{
                                justifyContent: 'flex-start',
                                p: theme.spacing(1, 4),
                                '@media(max-width: 828px)': {
                                    p: theme.spacing(1, 2.5),
                                },
                            }}>
                                <Typography sx={{
                                    fontSize: 16,
                                    lineHeight: '24px',
                                    fontWeight: '700',
                                    color: focused ? grey[900] : grey[400],
                                    transition: 'all 0.35s ease',
                                    '&:hover': {
                                        color: grey[900]
                                    }
                                }}>
                                    {item.title}
                                </Typography>
                            </ButtonBase>
                        </Link>
                    })}
                </Box>
            </Box>
        </Box >
    </>
}