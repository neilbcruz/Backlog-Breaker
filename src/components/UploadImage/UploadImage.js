import './UploadImage.scss';
import { useState } from "react";

export default function UploadImage() {
    const [image, setImage] = useState(null);

    function imageSelectHandler(event) {
        const [file] = event.target.files;
        setImage(URL.createObjectURL(file));
    }

    return (
        <div className='upload'>
            <label htmlFor='image'>Profile Pic</label>
            {image && <img className='upload__image' src={image} />}
            <input
                className='upload__input'
                type="file"
                id="image"
                name="image"
                  style={{ display: "none" }}
                accept="image/jpg"
                onChange={imageSelectHandler}
            />
        </div>

    );
}