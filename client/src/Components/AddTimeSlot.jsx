import React, {useEffect, useState} from 'react'
import '../styling/AddTimeSlot.css'
import { useNavigate } from 'react-router-dom'
import Model from 'react-modal' 
import { SendTimeSlot } from '../api/sendTimeSlot'



const AddTimeSlot = ({visible, groundId, onClose}) => {

    const navigate = useNavigate()
    const [checkedM, setCheckedM] = useState(false);
    const [checkedA, setCheckedA] = useState(false);
    const [checkedE, setCheckedE] = useState(false);
    const [checkedN, setCheckedN] = useState(false);
    // const [groundId, setGroundId] = useState(null)

    useEffect(() => {
        if(!visible){
            setCheckedM(false);
            setCheckedA(false);
            setCheckedA(false);
            setCheckedN(false);
        }
    } , [visible])

    console.log('-------26', groundId)

    const handleSubmit = (e) => {
        e.preventDefault()
        const timeData = {checkedM, checkedA, checkedE, checkedN, groundId}
        console.log(timeData)
        SendTimeSlot(timeData, navigate)
    }

    const handleChange = (e, state) => {
        const isChecked = e.target.checked

        if(state === 'checkedA'){
            console.log('----23',checkedA)
            setCheckedA(isChecked)
        }
        else if(state === 'checkedM'){
            console.log('----27',checkedM)
            setCheckedM(isChecked)
        } 
        else if(state === 'checkedE'){
            console.log('----31',checkedE)
            setCheckedE(isChecked)
        }
        else if(state === 'checkedN'){
            console.log('----35',checkedN)
            setCheckedN(isChecked)
        }

    }


    const customStyles = {
        content: {
          width:"500px",
          height:"500px",
          top: '20%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -10%)',
          zIndex: 10000,
          position: 'relative',
          boxShadow: '0px 10px 30px'
        },
        overlay: {
            zIndex: 9999,
            position: 'fixed',
            
        },
      };



    
    return(
        <div>
            <Model isOpen={visible} onRequestClose={onClose} style={customStyles}>
                <h2 id="timeSlot-hd">Add Time slots</h2>
            
                <form className='addingTime' onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <input type='checkbox' value={checkedM} onChange={(e) => handleChange(e, 'checkedM')}/>
                            <label>Morning(5:00 am - 11:00 am)</label>
                        </li>
                        
                        <li>
                            <input type='checkbox' checked={checkedA} onChange={(e) => handleChange(e, 'checkedA')}/>
                            <label>Afternoon(12:00 pm - 3:00 pm)</label>
                        </li>

                        <li>
                            <input type='checkbox' checked={checkedE} onChange={(e) => handleChange(e, 'checkedE')}/>
                            <label>Evening(3:30 pm - 7:30 am)</label>
                        </li>
                        
                        <li>
                            <input type='checkbox' checked={checkedN} onChange={(e) => handleChange(e, 'checkedN')}/>
                            <label>Night(8:00 pm - 12:00 pm)</label>
                        </li>
                    </ul>
                    <div className='timeSlot-bts'>
                    <button className="close" id='logout-bt' onClick={onClose}>Close</button>
                    <button id='logout-bt' type='submit'>Add</button>
                    </div>
                </form>

            </Model>

        </div>
    )
}



export default AddTimeSlot