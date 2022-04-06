import mysql from "mysql"
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Aa+012004',
  port: 3306,
  database: 'cygh'
}

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if(err) console.log(err)
  else console.log("mysql connencted!")
})

export default connection