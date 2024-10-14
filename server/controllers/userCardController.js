import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

function calcOverall(RW, KAST, ACS, DDA) {

    let overall = 0
    let RwCalc = RW * 0.10
    let KASTCalc = KAST * 0.10
    let ACSCalc = ((ACS / 500) * 1000) * 0.10
    let DDACalc = ((DDA / 200) * 1000) * 0.13

    overall = RwCalc + KASTCalc + ACSCalc + DDACalc
    return overall.toFixed(0)
}

function getAgentProfile(segment) {

    let agentsFounded = []

    segment.forEach((segmentItem) => {
        if (segmentItem?.type === "agent") {
            agentsFounded.push({
                agent: segmentItem?.metadata,
                stats: segmentItem?.stats?.matchesPlayed?.value
            })
        }
    })

    return agentsFounded
}

function getMostPlayedAgent(agents) {

    let mostPlayedAgent = null
    let maxStats = -Infinity

    agents.forEach((agentFounded) => {
        if (agentFounded?.stats > maxStats) {
            maxStats = agentFounded.stats
            mostPlayedAgent = agentFounded
        }
    })

    return mostPlayedAgent
}

async function getUserTrackerData(req, res) {
    const { name, code } = req.params
    const encodedName = encodeURIComponent(name)
    const encodedCode = encodeURIComponent(code)
    const url = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${encodedName}%23${encodedCode}`

    try {
        const browser = await puppeteer.launch({ headless: true })
        console.log(url)
        const page = await browser.newPage()

        // using puppeteer-extra 
        await page.goto(url, { waitUntil: 'networkidle2' })

        // <pre> tag content extract
        const preContent = await page.$$eval('pre', elements => elements.map(el => el.textContent))

        // get card overall
        const cardData = JSON.parse(preContent)?.data?.segments[0]
        const actualRW = cardData?.stats?.roundsWinPct?.value?.toFixed(1)
        const actualKAST = cardData?.stats?.kAST?.value?.toFixed(1)
        const actualACS = cardData?.stats?.scorePerRound?.value?.toFixed(1)
        const actualDDA = cardData?.stats?.damageDeltaPerRound?.value?.toFixed(1)

        const card = {
            overall: calcOverall(actualRW, actualKAST, actualACS, actualDDA),
            RW: actualRW,
            KAST: actualKAST,
            ACS: actualACS,
            DDA: actualDDA
        }

        const agents = getAgentProfile(JSON.parse(preContent)?.data?.segments)

        await browser.close()

        res.status(200).json({
            message: 'success',
            playerCard: {
                card: card,
                agent: getMostPlayedAgent(agents),
                name: JSON.parse(preContent)?.data?.platformInfo?.platformUserHandle,
                rank: cardData?.stats?.rank,
                trackerOv: cardData?.stats?.trnPerformanceScore,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal server error',
            data: error,
        })
    }
}

export default {
    getUserTrackerData,
}
