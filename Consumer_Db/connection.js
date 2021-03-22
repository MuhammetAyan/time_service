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

function writeData(data) {
    const client = new Client(conf.pg)
    client.connect()
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