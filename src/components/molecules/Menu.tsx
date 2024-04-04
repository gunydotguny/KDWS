import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import { menuList } from "../../datas/menu";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function Menu({ mode = 'light', setOpen }: { mode?: 'dark' | 'light', setOpen?: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter()
    const userMenu = _.filter(menuList, el => el.auth === 'user')
    const refinerMenu = _.filter(menuList, el => el.auth === 'refiner')
    const refinementManagerMenu = _.filter(menuList, el => el.auth === 'refinement_manager')
    const adminMenu = _.filter(menuList, el => el.admin === true)
    const menus = [
        { label: '일반 메뉴', pages: userMenu },
        { label: '정제자 메뉴', pages: refinerMenu },
        { label: '정제관리자 메뉴', pages: refinementManagerMenu },
        { label: '관리자 메뉴', pages: adminMenu }
    ]
    const modeStyle = mode === 'light' ? {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: `1px solid ${grey[300]}`,
        src: `/icon/chevron.png`
    } : {
        backgroundColor: '#000000',
        color: '#ffffff',
        border: `1px solid ${grey[500]}`,
        src: `/icon/chevron_white.png`
    }
    return <Stack direction={'column'} sx={{
        backgroundColor: modeStyle.backgroundColor,
        '& > *:not(:nth-of-type(1))': {
            borderTop: modeStyle.border,
        },
        border: `1px solid ${grey[500]}`,
        height: `100%`
    }}>
        {menus.map((item, index) => {
            const { label, pages } = item
            return <Box key={index} sx={{
                // flex: 1,
                p: theme.spacing(1)
            }}>
                <Box sx={{
                    p: theme.spacing(2, 2, 0, 2)
                }}>
                    <Typography sx={{
                        fontSize: 16,
                        lineHeight: `24px`,
                        fontWeight: `700`,
                        color: modeStyle.color
                    }}>
                        {label}
                    </Typography>
                </Box>
                <Stack sx={{
                    p: theme.spacing(1, 0)
                }}>
                    {pages.map((item, index) => {
                        const { label, url } = item
                        const handleClick = (e:any) => {
                            e.stopPropagation()
                            e.preventDefault()
                            router.push(url)
                            if (setOpen !== undefined) {
                                setOpen(false)
                            }
                        }
                        return <ButtonBase key={index} sx={{
                            p: theme.spacing(1, 2),
                            justifyContent: 'flex-start',
                            '& img': {
                                width: 20,
                                height: 20,
                            }
                        }}
                            onClick={handleClick}
                        >
                            <Typography sx={{
                                flex: 1,
                                fontSize: 14,
                                lineHeight: `20px`,
                                m: theme.spacing(0, 2, 0, 0),
                                color: modeStyle.color
                            }}>
                                {label}
                            </Typography>
                            <img src={modeStyle.src} />
                        </ButtonBase>
                    })}
                </Stack>
            </Box>
        })}
    </Stack>
}
