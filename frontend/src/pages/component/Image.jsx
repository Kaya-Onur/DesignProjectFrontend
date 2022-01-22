import React from 'react'

const Image=(props)=> {
    const {image}=props;
    let imageSource;
    if(image){
        imageSource=image;
    }
    return (
        
        <img src={imageSource} {...props} />
    )
}
export default {Image};