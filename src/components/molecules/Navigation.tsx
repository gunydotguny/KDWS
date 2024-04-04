import { ButtonBase, Stack, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { theme } from "../../themes/theme";
import Notification from "./Notification";
import { useRecoilState } from "recoil";
import { questionModalState } from "../../recoil";
import Question from "./Question";


export const navigation = [
    {
        label: '홈',
        iconName: 'home',
        url: `/home`,
    },
    {
        label: '대시보드',
        iconName: 'chart_bar',
        url: `/user/dashboard`,
    },
    {
        label: '메뉴',
        iconName: 'menu',
    },
    {
        label: '알림',
        iconName: 'notification',
    },
    {
        label: '문의하기',
        iconName: 'call',
    }
]

export default function Navigation() {
    const menuRef = useRef<HTMLButtonElement>(null);
    const notificationRef = useRef<HTMLButtonElement>(null);
    const questionRef = useRef<HTMLButtonElement>(null);
    const router = useRouter()
    const pathname = router.pathname
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [questionOepn, setQuestionOpen] = useState<boolean>(false);
    const handleClickMenu = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        setMenuOpen((prev) => !prev);
        setNotificationOpen(false)
        setQuestionOpen(false)
    };
    const handleMouseOverMenu = () => {
        // setMenuOpen(true);
    };
    const handleMouseOutMenu = () => {
        // setMenuOpen(false);
    };
    const handleClickNotification = () => {
        setNotificationOpen((prev) => !prev);
        setMenuOpen(false)
        setQuestionOpen(false)
    };
    const handleMouseOverNotification = () => {
        // setMenuOpen(true);
    };
    const handleMouseOutNotification = () => {
        // setMenuOpen(false);
    };
    const handleClickQuestion = () => {
        setQuestionOpen((prev) => !prev);
        setMenuOpen(false)
        setNotificationOpen(false)
    };
    const handleMouseOverQuestion = () => {
        // setMenuOpen(true);
    };
    const handleMouseOutQuestion = () => {
        // setMenuOpen(false);
    };
    useEffect(() => {
        // 특정 영역 외 클릭 시 발생하는 이벤트
        function handleFocus(e: any) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                // input 체크 해제
                setMenuOpen(false);
            }
        }
        // 이벤트 리스너에 handleFocus 함수 등록
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [menuRef]);
    useEffect(() => {
        // 특정 영역 외 클릭 시 발생하는 이벤트
        function handleFocus(e: any) {
            if (notificationRef.current && !notificationRef.current.contains(e.target)) {
                // input 체크 해제
                setNotificationOpen(false);
            }
        }
        // 이벤트 리스너에 handleFocus 함수 등록
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [notificationRef]);
    useEffect(() => {
        // 특정 영역 외 클릭 시 발생하는 이벤트
        function handleFocus(e: any) {
            if (questionRef.current && !questionRef.current.contains(e.target)) {
                // input 체크 해제
                setQuestionOpen(false)
            }
        }
        // 이벤트 리스너에 handleFocus 함수 등록
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [questionRef]);
    return <>
        <Stack
            direction={'row'}
            sx={{
                '& > *:not(:nth-of-type(1))': {
                    borderLeft: `1px solid ${grey[600]}`
                }
            }}>
            {navigation.map((item, index) => {
                const { iconName, url } = item
                const active = url ? router.pathname === url : iconName === 'menu' ? menuOpen ? true : false :
                    iconName === 'notification' ? notificationOpen ? true : false :
                        false
                const iconSrc = `/icon/ic_24_${iconName}.png`
                const handleClick = (e: any) => {
                    if (url) {
                        router.push(url)
                    } else {
                        if (iconName === 'menu') {
                            handleClickMenu(e)
                        } else if (iconName === 'notification') {
                            handleClickNotification()
                        } else if (iconName === 'call') {
                            handleClickQuestion()
                        }//추가 필요
                    }
                }
                const handleMouseOver = () => {
                    if (url) {
                    } else {
                        if (iconName === 'menu') {
                            handleMouseOverMenu()
                        } else if (iconName === 'notification') {
                            handleMouseOverNotification()
                        } else if (iconName === 'call') {
                            handleMouseOverQuestion()
                        }//추가 필요
                    }
                }
                const handleMouseOut = () => {
                    if (url) {
                    } else {
                        if (iconName === 'menu') {
                            handleMouseOutMenu()
                        } else if (iconName === 'notification') {
                            handleMouseOutNotification()
                        } else if (iconName === 'call') {
                            handleMouseOutQuestion()
                        }//추가 필요
                    }
                }
                return iconName === 'menu' ? <ButtonBase
                    key={index}
                    ref={menuRef}
                    sx={{
                        position: "relative",
                        width: 56,
                        height: 56,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& img': {
                            width: 24,
                            height: 'auto',
                        },
                        backgroundColor: menuOpen ? grey[700] : 'transparent',
                        transition: `all 0.5s ease`,
                    }}
                    onClick={handleClick}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <img src={iconSrc} />
                    {iconName === 'menu' && <Box sx={{
                        position: 'absolute',
                        top: 56,
                        left: `50%`,
                        transform: `translateX(-50%)`,
                        zIndex: 9999,
                        display: menuOpen ? 'block' : 'none',
                        width: 320,
                        p: theme.spacing(1, 0, 0, 0)
                    }}>
                        <Menu mode='dark' setOpen={setMenuOpen} />
                    </Box>}
                </ButtonBase> :
                    iconName === 'notification' ?
                        <ButtonBase
                            key={index}
                            ref={notificationRef}
                            sx={{
                                position: "relative",
                                width: 56,
                                height: 56,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '& img': {
                                    width: 24,
                                    height: 'auto',
                                },
                                backgroundColor: notificationOpen ? grey[700] : 'transparent',
                                transition: `all 0.5s ease`,
                            }}
                            onClick={handleClick}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            <img src={iconSrc} />
                            {iconName === 'notification' && <Box sx={{
                                position: 'absolute',
                                top: 56,
                                left: `50%`,
                                transform: `translateX(-50%)`,
                                zIndex: 9999,
                                display: notificationOpen ? 'block' : 'none',
                                width: 320,
                                p: theme.spacing(1, 0, 0, 0)
                            }}>
                                <Notification mode='dark' setOpen={setNotificationOpen} />
                            </Box>}
                        </ButtonBase> :
                        iconName === 'call' ? <ButtonBase
                            key={index}
                            ref={questionRef}
                            sx={{
                                position: "relative",
                                width: 56,
                                height: 56,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '& img': {
                                    width: 24,
                                    height: 'auto',
                                },
                                backgroundColor: questionOepn ? grey[700] : 'transparent',
                                transition: `all 0.5s ease`,
                            }}
                            onClick={handleClick}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            <img src={iconSrc} />
                            {iconName === 'call' && <Box sx={{
                                position: 'absolute',
                                top: 56,
                                left: `50%`,
                                transform: `translateX(-50%)`,
                                zIndex: 9999,
                                display: questionOepn ? 'block' : 'none',
                                width: 320,
                                p: theme.spacing(1, 0, 0, 0)
                            }}>
                                <Question mode='dark' setOpen={setQuestionOpen} />
                            </Box>}
                        </ButtonBase> :
                            <ButtonBase
                                key={index}
                                sx={{
                                    position: "relative",
                                    width: 56,
                                    height: 56,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '& img': {
                                        width: 24,
                                        height: 'auto',
                                    },
                                    backgroundColor: active ? grey[700] : 'transparent',
                                    transition: `all 0.5s ease`,
                                }}
                                onClick={handleClick}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                            >
                                <img src={iconSrc} />
                            </ButtonBase>

            })
            }
        </Stack >
    </>
}