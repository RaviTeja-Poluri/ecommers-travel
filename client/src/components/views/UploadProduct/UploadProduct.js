import React,{useState} from 'react'
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios'
import { response } from 'express';


function UploadProduct(props) {
    const {TextArea} = Input
const continents = [
    {key:1,value:'Africa'},
    {key:2,value:'Asia'},
    {key:3,value:'Europe'},
    {key:4,value:'North America'},
    {key:5,value:'South America'},
    {key:6,value:'Australia'},
    {key:7,value:'Antarctica'}

 ]
    /************************************************* 
     * ********* title related functions *************
     * ***********************************************/ 
    const [Title, setTitle] = useState("")

    const onTitleChange = (event) =>{
        setTitle(event.currentTarget.value)
    }

     /************************************************* 
     * ********* description related functions ********
     * ***********************************************/ 
    const [Description, setDescription] = useState("")

    const onDescriptionChange = (event) =>{
        setDescription(event.currentTarget.value)
    }

    /************************************************* 
     * ********* price related functions *************
     * ***********************************************/ 
    const [Price, setPrice] = useState(0)

    const onPriceChange = (event) =>{
        setPrice(event.currentTarget.value)
    }

    /************************************************* 
     * ********* continent related functions *********
     * ***********************************************/ 
    const [Continent, setContinent] = useState(2)
    const onContinentSelect = (event) =>{
        setContinent(event.currentTarget.value)
    }

    /************************************************* 
     * ********* file related functions **************
     * ***********************************************/
    const [Images, setImages] = useState([])
    const updateImages = (image) =>{
        setImages(image)
    }


    const onPost = (event) => {
        event.preventDefault();
        const postData = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            continent: Continent,
            images: Images
        }
        Axios.post('/api/product/upload',postData)
        .then(response=>{
            if (response.data.success) {
                alert("product uploaded")
                props.history.push('/')
            } else {
                alert("Failed to upload Product")
            }
        },err=>{

        })
    }

    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Typography level={2}>Upload</Typography>
            </div>

            <Form onSubmit={onPost}>
                {/** drag drop zone */}
                <FileUpload refreshFunction={updateImages}/>
                <br/>
                <br/>
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={Title}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br/>
                <br/>
                <label>Price</label>
                <Input 
                    onChange={onPriceChange}
                    value={Price}
                    type='number'
                />
                <br/>
                <select onChange={onContinentSelect}>
                    {
                        continents.map(continent=>(
                            <option key={continent.key} value={continent.key}>
                                {continent.value}
                            </option>
                        ))
                    }
                </select>
                <br/>
                <br/>
                <Button onClick={onPost}>
                    upload
                </Button>

            </Form>
        </div>
    )
}

export default UploadProduct