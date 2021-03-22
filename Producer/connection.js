const { Pool, Client } = require('pg')
const conf = require("./conf.json");
// const pool = new Pool(conf.pg)
// pool.query(`SELECT id, text, ip_address FROM public."SystemLog";`, (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client(conf.pg)
// client.connect()
// client.query(`SELECT id, text, ip_address FROM public."SystemLog";`, (err, res) => {
//     if(err == null){
//         console.log(res.rows)
//     }else{
//         console.error(err)
//     }
//   client.end()
// })

function createTable() {
    //     const query = `ALTER DATABASE "TimeServiceDB";

    // CREATE DATABASE "TimeServiceDB"
    // WITH 
    // OWNER = postgres
    // ENCODING = 'UTF8'
    // LC_COLLATE = 'en_US.utf8'
    // LC_CTYPE = 'en_US.utf8'
    // TABLESPACE = pg_default
    // CONNECTION LIMIT = -1;

    // `;

    const query = `ALTER TABLE public."Time"
    OWNER to postgres;

    CREATE TABLE public."Time"
    (
        time character varying(30) COLLATE pg_catalog."default"
    )
    
    TABLESPACE pg_default;
`;
    console.log("Veritabanına bağlanılıyor.");
    const client = new Client(conf.pg)
    client.connect()
    console.log("Veritabanına bağlanıldı.");
    client.query(query, (err, res) => {
        if (err == null) {
            console.log("Sorgu başarılı.");
            console.log(res.rows)
        } else {
            console.log("Sorgu başarısız!");
            console.error(err)
        }
        client.end()
        console.log("Sorgu tamamlandı.");
    });
}

function writeData(data) {
    const client = new Client(conf.pg)
    client.connect()
    client.query(`INSERT INTO public."Time"("time") VALUES ($1);`, data, (err, res) => {
        if (err == null) {
            console.log("Veritabanına kaydedildi.")
        } else {
            console.error(err)
        }
        client.end()
    })
}




module.exports = {
    createTable
}