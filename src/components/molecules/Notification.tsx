import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import { menuList } from "../../datas/menu";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function Notification({ mode = 'light', setOpen }: { mode?: 'dark' | 'light', setOpen?: Dispatch<SetStateAction<boolean>> }) {
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
        <Box sx={{ height: 500 }} />
    </Stack>
}
