import { initDropBox } from "./dropbox.js";
import { initLaps } from "./laps.js";
import { initLeaderboard} from "./leaderboard.js";

const initApp = () => {
    initDropBox();
    initLaps();
    initLeaderboard();
}

document.addEventListener("DOMContentLoaded", initApp);