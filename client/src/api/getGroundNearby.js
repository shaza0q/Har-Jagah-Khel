import axios from "axios";


export const getGroundNear = (zipcode, minDist, maxDist, setGroundData) => {
    axios.get(`https://har-jagah-khel.onrender.com/ground/list/ground?zipcode=${zipcode}&minDist=${minDist}&maxDist=${maxDist}`)
    .then(response=>{
        if(!response?.data){
            console.log("No enteries present")
        }
        else{
            setGroundData(response.data)
        }
        // console.log('------9',response.data[0].photo)
    })
}