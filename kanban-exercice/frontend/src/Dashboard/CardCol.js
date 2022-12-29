import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { getCard } from '../apiCalls';
import Card from './Card';

function CardCol({ cardId }) {
    const [card, setCard] = useState({})
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getCard(cardId).then(function (response) {
            setCard(response.data)
        });

    }, [cardId])

    if (card !== null) {
        return (
            <div>
                <Button onClick={handleOpen} style={styles.cardBtn} variant="outlined">
                    {card?.name}
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card card={card} />
                </Modal>
            </div>
        );
    }
}
const styles = {
    cardBtn: {
        backgroundColor: 'transparent',
        fontSize: 17,
        marginTop: 10,
        // marginLeft: -170,
        width: '100%',
        height: 40,
        color: 'black',
        borderColor: 'black'
    },
    deleteIcon: {
        color: 'black',
        marginLeft: 70
    }
}
export default CardCol;
