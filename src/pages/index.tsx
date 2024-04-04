import { Box, ButtonBase, Container, Paper, Typography } from "@mui/material";
import { theme } from "../themes/theme";
import { deepPurple, grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { pages } from "../constants";
import Link from "next/link";

export default function App() {
  const router = useRouter()
  return <Box sx={{
    minWidth: '1280px',
    '@media(max-width: 828px)': {
      minWidth: '280px',
    },
  }}><Box sx={{
    minHeight: `calc(100vh - 104px)`,
    m: theme.spacing(0, 'auto'),
    p: theme.spacing('88px', '40px', '120px'),
    pl: 0,
    pr: 0,
    pb: 0,
    position: 'relative',
    width: '100%',
    '@only screen and (min-device-width: 829px) and (max-device-width: 960px) and (-webkit-min-device-pixel-ratio: 1.5)': {
      minHeight: 'calc(150vh - 104px)',
    },
    '@media(max-width: 828px)': {
      ml: 'auto !important',
      minHeight: '0 !important',
      p: theme.spacing('70px', '20px', '80px'),
      width: '100% !important',
      pl: 0,
      pr: 0,
      pb: 0,
    },
  }}>
      <Box sx={{
        m: theme.spacing('140px', 'auto', '0'),
        maxWidth: '1200px',
        '@media(max-width: 828px)': {
          m: theme.spacing('40px', '20px', '0'),
        },
      }}>
        <Typography sx={{
          fontSize: 60,
          lineHeight: '84px',
          fontWeight: '900',
          '@media(max-width: 828px)': {
            fontSize: 36,
            lineHeight: '48px',
          },
        }}>
          To make people healthier,<br />
          We use KDWS
        </Typography>
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
          m: theme.spacing('40px', '20px', '0'),
        },
        '@media(max-width: 640px)': {
          gridTemplateColumns: `repeat(1, 1fr)`,
        },
      }}>
        {pages.map((item, index) => {
          const onClick = (e: any) => {
            if (item.url === '') {
              e.stopPropagation()
              alert('작업중입니다.')
            }
          }
          return <Link key={index} href={item.url} passHref>
            <ButtonBase
              disableRipple
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                border: `1px solid ${grey[300]}`,
                p: theme.spacing(3),
                '@media(max-width: 828px)': {
                  p: theme.spacing(2),
              },
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
              onClick={onClick}
            >
              <Box sx={{
                position: 'relative',
                '& .icon': {
                  width: 48,
                  height: 'auto',
                }
              }}>
                <img src={`/icon/${item.icon}.png`} className="icon" />
                <img src={`/icon/${item.icon}_colored.png`} className="icon icon_colored" />
              </Box>
              <Box sx={{
                m: theme.spacing(6, 0, 0, 0),
                '@media(max-width: 828px)': {
                  m: theme.spacing(2, 0, 0, 0),
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
      <Box sx={{
        m: theme.spacing('140px', 'auto', '0'),
        pb: 5,
        maxWidth: '1200px',
        '@media(max-width: 828px)': {
          m: theme.spacing('40px', '20px', '0'),
        },
      }}>
        <Typography sx={{
          fontSize: 12,
          lineHeight: '16px',
          textAlign: 'center'
        }}>
          © 2024 Kakaohealthcare Data Platform Wireframe System
        </Typography>
      </Box>
    </Box >
  </Box>
}