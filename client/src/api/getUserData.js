import axios from 'axios'

export const gettingData = (setUser) =>{
    axios.get('http://localhost:3100/auth/verify')
      .then(res=>{
          if(res.data.status){
            axios.get('http://localhost:3100/auth/loginData')
            .then(userRes => {
              setUser(userRes.data.user)
            }).catch(err => {
              console.log('error fetching data: ', err)
            })
          }else{
            console.log('Error fetching user data: ', res.data.error)
          }
      })
      .catch(err => {
        console.log('Eror fethching 1', err)
      })
}