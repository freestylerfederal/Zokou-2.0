const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUx0bjFwQmRjSnpmNytKWWZveWZ3NDl6dUtHN3dCSXl0Z2xZaXFGaHgxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEowZ3AzTm9wclNNNUdqTUVDNlNWQjJIRW1sNlZ0VVRtendTY05UcUJ4QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRDd6bUFxMzloVW1MUUk4emtETHNZKzZPeWdCanAzYlVZeHREb1QzZ1YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4anE1UWVBN0RXMXNsNDZxNXRXTUxnUmx2bW5Pb0Q5ZUl4VkZBWG5GM3lNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1DU00vNHZyYVZFcld4dW9BeW85aGJsU254bGlzWEFhRk11SE1HTzdTRjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkcxeVhOSWFaRWpvSTVVR2tEdjBlcDR3Q0p0VnhuWmlVZVUyNHlSZVlYRlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BMQm92S200OTR4cEFFUG9NL2VOTmtsaTViWldLWkdMbkFHTXp3WGgwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVkycnFFWGZVZW9iM1YvRzEzSDA1dHBZeDgyZXNmSmplcHRnMWxnMkMycz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFRK3NYMm5lYzVqV1VGYkJURDNVZjhBNHlkYVBnV2lyNmI5VjRsbGdVTUNFdFdRNjZPS2E0ME9zSEc2YnU0TnNQaVpYRHFVekQyOEdBK2Y5QjIwS2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk3LCJhZHZTZWNyZXRLZXkiOiJjTUMxYldTNEFveUdIcHpSNHhuQ1ZEVnd5OUtNcitlOXpyQ3JHY09Qa2dJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNQelNzOGtCRUpER25jTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTWTVuWXpndEttQ0IwVmNyZmdMN3hnczdhczNocjV6Qms1WjRtbHYrTmxBPSIsImFjY291bnRTaWduYXR1cmUiOiJVVDJxY2FMUW5QcmRVcVdzTS9hdjBnQ3FocFVmSnA2RnkwS08xYVFIbitWeHVidTh6NkkvSm15Qmg0MHhQQk9EMVhaNzF5WDNMTnZZcHNxYU9hTlZBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNEl2RDRWU2kvaDBrNlhBRDcxUXAxNUZ6SGhGMVVtbUh5N3BQZ09VUzVUaXJzQXNnQzFSYUNsRWVZQ3lkOHZSajMvb0oyR0taQyt5M0F0T2RxWTM2aUE9PSJ9LCJtZSI6eyJpZCI6IjUwOTM5MDQxNTk2OjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6InRyYXh68JOFkyIsImxpZCI6IjE2ODMxNjExMDkyNjAzNDoxMUBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzkwNDE1OTY6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVW1PWjJNNExTcGdnZEZYSzM0Qys4WUxPMnJONGErY3daT1dlSnBiL2paUSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxNjA2MDM2LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Traxz",
    NUMERO_OWNER : process.env.NUMERO_OWNER, '50939041596'             
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
