const flags = {
    "GBR": 'gb.png',
    "USA": 'us.png',
    "HUN": 'hu.png',
    "DEU": 'ge.png',
    "CAN": 'ca.png',
    "ITA": 'it.png',
    "FRA": 'fr.png',
    "BEL": 'be.png'
}

export function getFlag(code) {
    if(!flags[code]) return 'ac.png';
    return flags[code];
}