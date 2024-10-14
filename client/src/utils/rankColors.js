
function colorizeCard(overall) {

    //console.log(overall)

    if (overall <= 30) {
        console.log('#bf868f')
        return '#bf868f'
    } else if (overall > 30 && overall <= 50) {
        console.log('#a7c6cc')
        return '#a7c6cc'
    } else if (overall > 50 && overall <= 75) {
        console.log('#e6bc5c')
        return '#e6bc5c'
    } else if (overall > 75 && overall <= 85) {
        console.log('#5ee790')
        return '#5ee790'
    } else if (overall > 85) {
        console.log('#3ecbff')
        return '#3ecbff'
    }
}

export default {
    colorizeCard
}