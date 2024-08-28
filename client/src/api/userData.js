// import axios from 'axios'
// import { get } from 'mongoose';
// import React, {useEffect, useState} from 'react'


// export const getData = (setUser) => {
//     axios.defaults.withCredentials = true;

//     axios.get('http://localhost:3100/auth/verify')
//         .then(res => {
//             console.log("-----14-", res.data);
//             if (res.data.status) {
//                 axios.get('http://localhost:3100/auth/loginData')
//                     .then(userRes => {
//                         console.log("------18", res.data);
//                         setUser(userRes.data.user);
//                         console.log("---20", userRes.data.user.type);
//                     })
//                     .catch(err => {
//                         console.log('error fetching data: ', err);
//                     });
//             } else {
//                 console.log('Error fetching user data: ', res.data.error);
//             }
//         })
//         .catch(err => {
//             console.log('Eror fethching 1', err);
//         });
// };


