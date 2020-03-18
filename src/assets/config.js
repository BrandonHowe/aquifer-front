const wsProduction = "wss://aquifer-social.herokuapp.com";
const wsDev = "ws://localhost:5000";

const serverProduction = "https://aquifer-social.herokuapp.com";
const serverDev = "http://localhost:5000";

const config = {
    wsUrl: wsProduction,
    serverUrl: serverProduction,
};

const mode = "dev"; // Use this for development
// const mode = "prod"; // Use this for production, default

if (mode === "dev") {
    config.wsUrl = wsDev;
    config.serverUrl = serverDev;
}

export {config};
