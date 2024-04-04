import { Box, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";

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
                }
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
                        Charts
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
                        KDWS Charts는 의료 데이터 연구에 필수적인 시각화 자료를 팀이 쉽게 만들어낼 수 있게 돕습니다. Bar Chart부터 Circos까지 다양한 종류의 시각화 자료를 선택하고, 실제 데이터를 입력해 보고, 원하는 사이즈의 그림파일로 다운로드하여 와이어프레임 제작에 사용할 수 있습니다.
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
}