import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ModalBody from './ModalBody';
import Confetti from 'react-confetti'
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 5, 5),
    },
    title: {
      textAlign: 'center'
    },
    button: {
      width: 200, 
      height: 60, 
      // marginTop: '20%', 
      // marginLeft: '40%' 
    }
}));

export default function ModalReview() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowConfetti(false)
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 className={classes.title} id="simple-modal-title">How do you like Noota ?</h2>
          <ModalBody setShowConfetti={setShowConfetti} handleClose={handleClose} />
        </div>
      );
    
      return (
        <div>
          {
            showConfetti && 
            <Confetti/>
          }
          <button style={{ width: 200, height: 60, marginTop: '20%', marginLeft: '40%'}} type="button" onClick={handleOpen}>
            <h4 style={{fontSize : 15}}>Review Noota</h4>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{marginTop: -300, marginLeft: -400}}
          >
            {body}
          </Modal>
        </div>
      );

}