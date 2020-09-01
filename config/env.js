//======================
//Puerto rest server
//======================

process.env.PORT = process.env.PORT || 3000;


//================================
//            Entorno
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//================================
//       Vencimiento del token
//================================
process.env.EXPIRATION_DATE = '1000000h';


//================================
//     Seed de autenticación
//================================

process.env.SEED = process.env.SEED || 'secret-dev'

//================================
//     Cors client
//================================

process.env.CLIENT_CORS_URL = process.env.CLIENT_CORS_URL || 'http://localhost:8080';

//================================
//     Credenciales del servicio de correo
//================================
process.env.EMAIL_USER = "aryasistema@gmail.com";
process.env.CLIENT_ID = "568531038882-k5k0u71r9eabjpfm2o4s724u07vmnbpo.apps.googleusercontent.com";
process.env.CLIENT_SECRET = "RrWQ-EcvYkWKjAXH343orVSZ"
process.env.ACCESS_TOKEN = "ya29.a0AfH6SMCtKnptKhmJnw9XCvKA5uRhM3ocg1S66SOrxrUV0FsdS83VxcuM4HYRUuoaf1pZsUWUlMTTGjtKEQRKmMS8fiaFJ0N94vC88owSBGzX8ivq0FlnwnFFk86aFlSH7kzsCUH3GfcbR_16q1lscGmBjXQnXHNer0Y";
process.env.REFRESH_TOKEN = "1//04oA5zf5Y-biYCgYIARAAGAQSNwF-L9Iryj73Um-fV1eJgf1kH6PfHu0lZGNMqeigklIbmm2CkQPDan6bOXkl_PZrsH2mYKUACwI";

//================================
//     Credenciales de firebase
//================================
process.env.GOOGLE_APPLICATION_CREDENTIALS = './config/aryaproject-ea993-firebase-adminsdk-zoq8u-6e13eeab58.json'