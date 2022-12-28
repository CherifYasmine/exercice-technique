import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteColumn, getColumn, updateColumn } from '../apiCalls';
import Card from './Card'
function KanbanColumn({ columnId }) {

    const [column, setColumn] = useState({})
    const [columnName, setColumnName] = useState("")
    useEffect(() => {
        getColumn(columnId).then(function (response) {
            setColumn(response.data)
            setColumnName(response.data.name)
        });

    }, [columnId])

    const updateColumnName = async (e) => {
        setColumnName(e.target.value)
        await updateColumn({ columnId: columnId, name: e.target.value }).then((response) => {
            console.log(response)
        })
    }
    const openCard = () => {
        console.log('hi')
    }
    const dropColumn = async () =>{
        await deleteColumn(columnId).then((response)=>console.log(response))
    }
    return (
        <div style={styles.container}>
            <div style={{margin: 20}}>
            <div style={styles.columnName}>
            <input
                style={styles.inputName}
                type="text"
                name="name"
                value={columnName}
                onChange={updateColumnName}
            />
            <IconButton style={styles.deleteIcon} onClick={dropColumn} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            </div>
            {
                column?.cards?.map((card) => (
                    <div key={card}><Card cardId={card} /></div>
                ))
            }
            <Button style={styles.newBtn} onClick={openCard}> + New </Button>
            </div>
        </div>
    );
}

const styles = {
    container:{
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid'
    },
    columnName:{
        marginBottom: 20,
        display: 'flex',
    },
    inputName: {
        border: 'none',
        fontSize: 18,
        // marginLeft: -50
    },
    newBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: 17,
        display: 'block',
        color: 'grey',
        marginTop: 10,

    },
    deleteIcon:{
        color: 'black',
        marginTop: -10
    }
}
export default KanbanColumn;
