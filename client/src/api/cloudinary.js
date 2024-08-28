import axios from 'axios'

export const cloudinaryUpload = (image, setPhoto) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'harjagahkhel')

    fetch('https://api.cloudinary.com/v1_1/dajux5nbc/image/upload',
        {
            method: 'POST',
            body: data
        }
    ).then(response => {
        return response.json();
    }).then((res)=>{
        setPhoto(res.secure_url)
    })

}