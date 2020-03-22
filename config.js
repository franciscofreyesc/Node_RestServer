//PUERTO
PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Expira Token
// ============================
EXP_TOKEN = process.env.EXP_TOKEN || 60 * 60;

// ============================
//  Secreto Token
// ============================

SECRET_TOKEN = process.env.SECRET_TOKEN || 'secreto-del-token-jajaja';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;