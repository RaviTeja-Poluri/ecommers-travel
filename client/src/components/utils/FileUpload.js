import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import Axios from 'axios'

function FileUpload(props) {

    /**
     * Function to handle file upload
     */
    const [Images, setImages] = useState([])
    const onDrop = (files,event)=>{
        let formData = new FormData();
        let config={
            'headers': {'Content-Type':'multipart/form-data'}
        }
        formData.append('file',files[0])
        Axios.post('/api/product/uploadImage',formData,config)
        .then(response=>{
            if(response.data.success){
                let newImages = [...Images, response.data.image]
                setImages(newImages)
                props.refreshFunction(newImages) 
            }else{
                alert('Failed to upload content')
            }
        })
    }

    const deleteImage = (image) =>{
        var index = Images.indexOf(image)
        let newImages = [...Images]
        newImages.splice(index,1)
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{width:'120%',display:'flex',overflowX:'scroll'}}>
                {Images.map((image,index)=>(
                    <div onClick={() => deleteImage(image)} key={index}>
                        <img style={{minWidth: '250px',width:'250px',height:'240px'}} src={`http://localhost:5000/${image}`} alert={`Prooduct=${index}`}/>
                    </div>
                ))}
            </div>
            <br/>
            <br/>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={8000000}
            >
                {({getRootProps,getInputProps})=>(
                    <div style={{width:'300px',height:'240px',border:'1px solid lightgrey',display:'flex',alignItems:'center',justifyContent:'center'}}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()}/>
                        <Icon type='plus' style={{fontSize:'3rem'}}/>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default FileUpload
