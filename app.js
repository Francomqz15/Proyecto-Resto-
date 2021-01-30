const dbSetup = require('./config/mysql');
const dbApi = require('./config/api');
/* const apiRequests = require('./api/requests'); */

/* CONEXION A LA BASE DE DATOS */
dbSetup.connectDb()

/* TRAIGO LOS USUARIOS DE LA BASE DE DATOS Y LOS ENVIO A LA API */
dbSetup.getUsers().then((data) => {
  dbApi.getUsersApi(data)
})

/* TRAIGO LOS PRODUCTOS DE LA BASE  */
dbSetup.getProducts().then((data) => {
  dbApi.getProductsApi(data)
})


