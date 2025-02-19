import { CorsOptions } from "cors";

export const corsConfig : CorsOptions ={
    origin: function(origin, callback){
        console.log(origin)
        if (origin === 'http://localhost:8081') {// Permite solo este origen
            console.log('permitido')
            callback(null, true)
        }else{
            console.log(new Error('Error de CORS'))
        }
    }
}

// {
//     origin: 'http://localhost:8081', // Permite solo este origen
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
//     credentials: true, // Permite enviar cookies o headers de autenticación
//   }