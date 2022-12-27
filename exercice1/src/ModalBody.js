import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};
function ModalBody({handleClose, setShowConfetti}) {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [showOkButton, setShowOkButton] = useState(false);
    const [showAmazingText, setShowAmazingText] = useState(false);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setShowConfetti(false)
        setShowOkButton(false)
        setShowAmazingText(false)
        setCurrentValue(value)
        console.log(currentValue);
        if (value < 5){
            setShowOkButton(true)
        } else {
            setShowConfetti(true)
            setShowAmazingText(true)
        }
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    return (
        <div style={styles.container}>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer",
                            }}
                        />
                    )
                })}
            </div>

            {
                showOkButton ?
                <button
                onClick={handleClose}
                    style={styles.button}
                >
                    Ok
                </button> : null
            }

            {
                showAmazingText ?
                <div>
                    <h3 style={{textAlign: 'center'}}>Amazing 🥳</h3>
                    <h4>Can you help us and add a quick review here 👇</h4>
                    <button 
                    onClick={()=> window.location.href = 'https://www.trustpilot.com/review/noota.io'}
                    style={styles.reviewButton}>
                        Review us on  
                        <FaStar
                            size={15}
                            color={'green'}
                            style={{
                                marginLeft: 5 ,
                                marginRight: 5,
                                marginTop: 5,
                                cursor: "pointer"
                            }}
                        />
                        Trustpilot
                    </button>
                </div> : null
            }

        </div>
    );
};


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
        marginTop: 30,
        borderColor: 'black'
    },
    reviewButton: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
        marginTop: 30,
        borderColor: 'green'
    }

};

export default ModalBody;
