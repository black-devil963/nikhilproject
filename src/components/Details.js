import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog } from '@mui/material';
var copy;

class Details extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:"", data:{image:"" , tag:"" }};//this.state={apiResponse:"",apiResponse1:""};
  }
  PullImage(){
    fetch(`http://localhost:9000/DetailsImg-${this.state.data.image}-${this.state.data.tag}`)
    .then(res=>res.text())
    .then(res=>{this.setState({apiResponse:res.replace(/\\t/gi,' ').replace(/\"/gi,'').replace(/\\n/gi, '')});copy=res.replace(/\\t/gi,' ').replace(/\"/gi,'').replace(/\\n/gi, '');})//.then(res=>this.setState({apiResponse1:res.replace(/\\t/gi, '   ')}));
  }
  componentWillMount(){
    
  }
  
render(){
  function copyText(){
    navigator.clipboard.writeText(copy);
    alert("Copied!!");
    }
  return (
    <Dialog onClose={this.props.handleClose} open={this.props.open}>
    <Card sx={{ width: 375}}>
    <CardContent>
    <Grid sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 2 }} >
    <Grid item xs={2}>
    <h1 className='ak2'>Image Details</h1>
    </Grid>
    <Grid item xs={2}>
    <TextField id="outlined-basic" label="Image Name" variant="outlined" 
      placeholder='Image Name(Required)' onChange={(event)=>this.setState({data:{...this.state.data, image:event.target.value}})}/>
    </Grid>
    <Grid item xs={2}>
    <TextField id="outlined-basic" label="Tag Name" variant="outlined" 
      placeholder='Tag Name(Optional)' onChange={(event)=>this.setState({data:{...this.state.data, tag:event.target.value}})}/>
    </Grid>
    <Grid item xs={2} >
      <Button variant="contained" onClick={event =>{this.PullImage();}} style={{}}>Submit for Details</Button>
    </Grid>
    <Grid item xs={2}>
    <p onClick={copyText}>{this.state.apiResponse}</p> 
    </Grid>
    </Grid>
    </CardContent>
  </Card>
  </Dialog>

    
  );
  
}

}
export default Details;
