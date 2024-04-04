import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import { menuList } from "../../datas/menu";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { questionModalState } from "../../recoil";

export default function Question({ mode = 'light', setOpen }: { mode?: 'dark' | 'light', setOpen?: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter()
    const [questionModal, setQuestionModal] = useRecoilState(questionModalState)
    const handleClickNewQuestion = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        setQuestionModal({ open: true })
        if (setOpen !== undefined) {
            setOpen(false)
        }
    }
    const handleClickQuestions = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        router.push(`/user/questions`)
        if (setOpen !== undefined) {
            setOpen(false)
        }
    }
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
        <Box sx={{
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
                    문의사항
                </Typography>
            </Box>
            <Stack sx={{
                p: theme.spacing(1, 0)
            }}>
                <ButtonBase sx={{
                    p: theme.spacing(1, 2),
                    justifyContent: 'flex-start',
                    '& img': {
                        width: 20,
                        height: 20,
                    }
                }}
                    onClick={handleClickNewQuestion}
                >
                    <Typography sx={{
                        flex: 1,
                        fontSize: 14,
                        lineHeight: `20px`,
                        m: theme.spacing(0, 2, 0, 0),
                        color: modeStyle.color
                    }}>
                        새 문의하기
                    </Typography>
                    <img src={modeStyle.src} />
                </ButtonBase>
                <ButtonBase sx={{
                    p: theme.spacing(1, 2),
                    justifyContent: 'flex-start',
                    '& img': {
                        width: 20,
                        height: 20,
                    }
                }}
                    onClick={handleClickQuestions}
                >
                    <Typography sx={{
                        flex: 1,
                        fontSize: 14,
                        lineHeight: `20px`,
                        m: theme.spacing(0, 2, 0, 0),
                        color: modeStyle.color
                    }}>
                        기존 문의내역
                    </Typography>
                    <img src={modeStyle.src} />
                </ButtonBase>
            </Stack>
        </Box>
    </Stack>
}
