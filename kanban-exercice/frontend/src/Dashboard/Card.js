import  React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import { getCard } from '../apiCalls';

function Card({cardId}) {
const [card, setCard] = useState({})
useEffect(() => {
   getCard(cardId).then(function (response) {
        setCard(response.data)
      });
  
  }, [cardId])

  if (card !== null){
    return (
        <div>
            <Button style={styles.cardBtn} variant="outlined">
                {card?.name}
            </Button>

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
    deleteIcon:{
        color: 'black',
        marginLeft: 70
    }
}
export default Card;
