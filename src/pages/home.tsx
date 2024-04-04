import { Box, Stack } from "@mui/material";
import { useState } from "react";
import _ from "lodash";
import Summary from "../components/organisms/Summary";
import Menu from "../components/molecules/Menu";
import Announcement from "../components/organisms/Announcement";
import { theme } from "../themes/theme";
import { grey } from "@mui/material/colors";
import PersonalizedPanel from "../components/organisms/PersonalizedPanel";

type CounterProps = {
    title: string,
    standard: string,
    value: number,
    unit: string
}

type SummaryProps = {
    counterData: CounterProps[]
}

type MainDataProps = {
    summaryData: SummaryProps
}

type HomeDataProps = {
    mainData: MainDataProps
}


const summaryData: SummaryProps = {
    counterData: [
        {
            title: '전체 환자 수',
            standard: 'ETL 기준',
            value: 153231,
            unit: '명'
        },
        {
            title: '지식은행 환자 수',
            standard: '정제 승인 기준',
            value: 104503,
            unit: '명'
        }
    ]
}

const mainData: MainDataProps = {
    summaryData: summaryData
}

const homeData: HomeDataProps = {
    mainData: mainData
}

type TabProps = {
    label: string, value: string
}

const graphTabs: TabProps[] = [
    { label: `월별`, value: `monthly` }, {
        label: `일별`, value: `daily`
    }
]


export default function Page() {
    return <Home data={homeData} />
}


function Home({ data }: { data: HomeDataProps }) {
    const { mainData } = data
    return <Stack direction={`row`} spacing={3} sx={{
        width: `100%`,
        minWidth: 1200,
        maxWidth: 1920,
        m: theme.spacing(0, `auto`),
        p: theme.spacing(3),
        boxSizing: `border-box`,
        position: `relative`,
        display: 'flex',
        height: `calc(1080px - 56px)`,
    }}>
        <Main data={mainData} />
        <PersonalizedPanel />
    </Stack>
}

function Main({ data }: { data: MainDataProps }) {
    const [dateStandard, setDateStandard] = useState<string>(graphTabs[0].value)
    const { summaryData } = data
    return <Stack spacing={3} sx={{
        flex: 1,
    }}>
        <Box sx={{ height: 278, backgroundColor: 'red' }} />
        <Stack direction={'row'} spacing={3} sx={{
            flex: 1,
        }}>
            <Stack direction={`column`} spacing={3} sx={{
                flex: 1,
            }}>
                <Summary data={summaryData}
                    dateStandard={dateStandard}
                    setDateStandard={setDateStandard}
                />
                <Box sx={{ flex: 1, }}>
                    <Announcement />
                </Box>
            </Stack>
            <Box sx={{
                backgroundColor: `#ffffff`,
                width: 320,
            }}>
                <Menu />
            </Box>
        </Stack>
    </Stack>
}