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
function create(params) {
    
}
function writeData(data) {
    const client = new Client(conf.pg)
    client.connect()
    const q = `CREATE TABLE IF NOT EXISTS public."Time"
    (
        time character varying(30)
    );
    
 ALTER TABLE public."Time"
        OWNER to postgres;`
    client.query(q, (err, res) => {
        if (err == null) {
        } else {
            console.error(err)
        }
        
    })
    client.query(`INSERT INTO public."Time"("time") VALUES ($1);`, [data], (err, res) => {
        if (err == null) {
            console.log("Veritabanına kaydedildi.")
        } else {
            console.error(err)
        }
        client.end()
    })
}




module.exports = {
    writeData
}