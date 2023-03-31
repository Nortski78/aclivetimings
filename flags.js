const flags = {
    "GBR": '',
    "USA": '',
    "HUN": '',
    "DEU": '',
    "CAN": ''
}

export function getFlag(code) {
    return flags[code];
}