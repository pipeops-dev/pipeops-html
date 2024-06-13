export const baseUrl = ''


export const postRequest = async(url, body)=>{
    await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type' :'application.json'
        },
        body,
    })

}