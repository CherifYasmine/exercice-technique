import  React, {useState, useEffect} from 'react'
import KanbanColumn from './KanbanColumn';
import Button from '@mui/material/Button';
import { getColumns, addColumn } from '../apiCalls';

 function KanbanDashboard() {

  const [columns, setColumns] = useState([])
  const [plusClicked, setPlusClicked] = useState(false)
  const [newColumn, setNewColumn] = useState("")
  useEffect(() => {
    getColumns().then(function (response) {
           setColumns(response.data)
   });
  
  }, [columns])
  
   const addColumnK = async () => {
     await addColumn({name: newColumn}).then(function (response) {
      setNewColumn("")
      setPlusClicked(false)
     });
 }
  return (
    <div style={styles.div}>
      <hr />
      <div style={styles.container}>
        {
            columns.map((column)=>(
                <div style={styles.column} key={column._id}>
                  <KanbanColumn columnId={column._id} />
                </div>
            ))
        }
        {
          plusClicked && 
          <div style={styles.inputContainer}>
            <input placeholder='Column Name...' onBlur={addColumnK} style={styles.newColInput} type='text' name="newCol" value={newColumn} onChange={(e)=>setNewColumn(e.target.value)} />
          </div>
        }
        <Button onClick={()=>setPlusClicked(!plusClicked)} style={styles.plusIcon}>+</Button>
      </div>
    </div>
  );
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 30, 
      marginLeft: 50
    },
    div: {
      margin: 40,
    },
    column:{
      marginLeft: 40,
      marginRight: 40
    },
    plusIcon:{
      fontSize: 20,
      color: 'black',
      height: 55
    },
    newColInput: {
      margin: 20,
      height:27,
      fontSize: 18,
      marginTop: 12
    },
    inputContainer:{
      borderColor: 'black',
      borderWidth: 2,
      borderStyle: 'solid',
      height: 100
  },
}
export default KanbanDashboard;
