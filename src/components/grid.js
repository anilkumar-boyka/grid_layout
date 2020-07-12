function calculateNumberOfRows(windowHeight) {
    if(windowHeight > 750) return 4
    else if(windowHeight > 550) return 3
    else if(windowHeight > 330) return 2
    else return 1
}

function calculateNumberOfColumns(windowWidth) {
    if(windowWidth > 1400) {
        return 12;
    } else if(windowWidth > 1000) {
        return 10
    } else if(windowWidth > 700) {
        return 8
    } else if(windowWidth > 500) {
        return 6
    } else if(windowWidth > 300) {
        return 4
    } else {
        return 2;
    }
}

export default {
    calculateNumberOfRows,
    calculateNumberOfColumns
}