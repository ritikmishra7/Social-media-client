import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Notfound.css"
export default function Notfound() {

    const navigate = useNavigate();

    return (
        <div className="notFound-wrapper">
            <div className="error">

                <div className="error-code">
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </div>
                <div className="NOTFOUND">
                    <span>N</span>
                    <span>O</span>
                    <span>T</span>
                    <span>F</span>
                    <span>O</span>
                    <span>U</span>
                    <span>N</span>
                    <span>D</span>
                </div>
            </div>
            <div className="redirect">
                <p className='redirect-message'>This page doesn't exist!</p>
                <Button variant="contained" size="large" sx={{ color: 'white', backgroundColor: '#42a5f5', fontWeight: '600', marginTop: 3, ':hover': { bgcolor: '#90caf9', color: 'white' } }} onClick={() => navigate('/')}>
                    Home
                </Button>
            </div>
        </div>
    );
}
