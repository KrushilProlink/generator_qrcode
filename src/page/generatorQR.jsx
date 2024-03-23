import React, { useState } from 'react';
import axios from 'axios';

const GeneratorQR = () => {
    const [data, setData] = useState('');
    const [img, setImg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generatorQR = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`
            );
            setImg(response?.request?.responseURL);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className='body'>
            <div className='container'>
                <p>Enter your text and URL</p>
                <input type="text" placeholder='Text and URL' onChange={(e) => setData(e.target.value)} />

                <div className='imgBox'>
                    {isLoading ? <span className="loader"></span> : img && <img src={img} alt="QR Code" />}
                </div>

                <button onClick={generatorQR} disabled={!data}>Generate QR Code</button>
            </div>
        </div>
    );
};

export default GeneratorQR;
