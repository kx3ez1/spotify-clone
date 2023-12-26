// const SERVER_ADDRESS = 'http://localhost:3000/v1';
// const SERVER_ADDRESS =
//   "http://nodejsdocker1-env.eba-n2snrmuy.us-east-2.elasticbeanstalk.com/v1";

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS || "http://192.168.1.152:3000/v1" || "http://localhost:3000/v1";

export { SERVER_ADDRESS };
