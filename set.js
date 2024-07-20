const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUUvaEZZVzBtcFR4S0I4ZURqamJITG5QWWkrQUp3S0d5dUM1RzdsSFVrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid25VUzdFZzFVZE5ZMkYvbUZLd3BpS2xmNzlxN2hzYnVZMUdMZDEvMjlEZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQkFoanJiMytwSjRpQmR1S2xIWlJGekxtZ3pzMG5YOHcvb3ZTcFNkWFZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjZzYzQkZsSTRzV3VSWGNoZEg0ZzlzeVJUTTN1UmRaczBjVDdubS9rWHhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtIcDJmblpQOTluSi9TeUNhSU1LMGwyYUExSTZvWjZWVTJLc0ErZHhKRVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJRVUhCRnBBK2VGOVNTY1B6eFpwSjR0N01ZaXFPS25ENkpnRTBpS3VSQ2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUQxYzA0c01odmVUUncxT2VYT0dwVnpVWDdhaEhMdjBsdk5iV2pHWEEzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGVpQlNMNVVHWDN6UWsrMWZCUjc5czZYa3ZhbHJMak9qa2ovZ2g4YUVqND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR3dFgvK2pSelBBK3dCa3p2djFNZ01xQTFVOVFQcFNLekRrMGxkWWc3am1WeE9hSlF4cGNjVXNMUnU2ZlFONlkzMHhtYXJUNG1pV2wxdkxIUlA5YWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiJ1YzVnUXVlblJTNjNEZE93SHAvYUExRHB2bTdZNTJIWjlTVHhIaXVZRDEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnSG5rVFNuTVE5V1JLMHdNNzkxWW1nIiwicGhvbmVJZCI6IjQyYWRkNDE1LTc2NTItNGNiNS04MGE4LTY3ZTM2ZTM5NTUxNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEVGo3RFJ1c0g4UDZyeFNsUDZ2TFMvbVQ1S0E9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhjUmVTUWpKSDl4eThnSXJUT0FaemlmYXdyUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tUS3d0OERFS1hPN3JRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkVCeXFiVkhKazNXU2xMeEdZRXYxZTFyTGxiNFpjcWRETnJCcW82L29iVWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJTRnJBN01sZU1lNnlUT3dzRWRrRTJrcTl2MVBwUlpDNGFDczloeUxLRE1EZ3BmZm1HZ0RWNFhGY0JHQmw5YWJHaVZMemNMcnRLUjNNdFlVTFE5RkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI5VFJ1cE1xZ0RXbW5aQnovMDlNTGR4bk9sSTBRTDZuSklWL2xZYjBjeDgydVVjcXNHUUdFc2xDN3d3QTFyWWVybWJYa0hiUUUzYm56bmt4WjdKaW9pQT09In0sIm1lIjp7ImlkIjoiMjM0OTEzODE5MDMwMToxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNaWRlc3F1YXJlIiwibGlkIjoiMTYxNzUzMjY2NzEyNjY5OjEwQGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTM4MTkwMzAxOjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJBY3FtMVJ5Wk4xa3BTOFJtQkw5WHRheTVXK0dYS25RemF3YXFPdjZHMUoifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTQ3NjkxNSwibGFzdFByb3BIYXNoIjoiMXloSVJBIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
