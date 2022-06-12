import React from "react";
import { Button,  Grid} from "@mui/material";
import * as S from "./CreateTask.style";
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem"
import { TextField } from "@mui/material";

function CreateTask({taskName, priority, dueDate, _id, handleUpdate, handleCreate, completed, doneBeingEdited }) {
  const [formDueDate, setDueDate] = React.useState(dueDate)
  const [formtaskName, setTaskName] = React.useState(taskName)
  const [formPriority, setFormPriority] = React.useState(priority)

    return (
    <Grid container>
      <Grid item xs = {3}>
        <S.MyInput placeholder="Task Name" id="taskname" defaultValue={taskName} 
            onChange={(event) => setTaskName(event.target.value)}>
          </S.MyInput>
      </Grid>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={3}>
        <Select style={{height: "70%", color:"black", background: "white", label: "black"}}
        defaultValue={!!priority ? priority: "MEDIUM"}
        label="Priority"
        onChange={(event) => { setFormPriority(event.target.value)} }>
            <MenuItem value={"LOW"}>Low</MenuItem>
            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
            <MenuItem value={"HIGH"}>High</MenuItem>
            <MenuItem value={"VERY-HIGH"}>Very High</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={2}>
      <TextField style={{color:"black", background: "white"}}
          label="Due Date"
          type="datetime-local"
         // defaultValue={formDueDate}
          sx={{ width: 220 }}
          onChange={(event) => { setDueDate(event.target.value)}}
        InputLabelProps={{
      shrink: true,
    }}/>
      </Grid>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => {
                  if (handleUpdate) {
                    handleUpdate(_id, formtaskName, completed, formPriority, formDueDate);
                    doneBeingEdited();
                  } else {
                    handleCreate(formtaskName, completed, formPriority, formDueDate); 
                  }
                } 
            }>
            CREATE
        </Button>
      </Grid>
    </Grid>
    );
    
}

export default CreateTask;