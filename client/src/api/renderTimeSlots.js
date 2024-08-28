import fetchTimeSlots from 'fetchTimeSlot'


export const renderTimeSlots = async(groundId) => {
    const timeSlots = await fetchTimeSlots(groundId)

}