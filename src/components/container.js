import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Containerimage from '../Containerimage.png';
import { Dialog } from '@mui/material';


class container extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:"", data:{ name:"" , image:"" , tag:"" }};//this.state={apiResponse:"",apiResponse1:""};
  }
  createcontainer(){
    console.log(this.state.data);
    fetch(`http://localhost:9000/createContainers-${this.state.data.name}-${this.state.data.image}-${this.state.data.tag}`)
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse:res.replace(/\\t/gi,' ').replace(/\"/gi,'').replace(/\\n/gi, '')}));//.then(res=>this.setState({apiResponse1:res.replace(/\\t/gi, '   ')}));
  }
  componentWillMount(){
    
  }
  
render(){
  return (
    <Dialog onClose={this.props.handleClose} open={this.props.open}>
    <Card sx={{ width: 375 }}>
    <CardMedia
      component="img"
      height={130}
      sx={{objectFit: "contain" }}
      image={Containerimage}
      title="container"
    />
    <CardContent sx={{marginTop:'-7.25vh'}}>
    <Grid sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 2 }} >
    <Grid item xs={2}>
    <h1  className='ak1'>Create on the go,</h1><h1>right from a click. </h1>
    </Grid>
    <Grid item xs={2}>
    <TextField id="outlined-basic" label="Container Name" variant="outlined" 
      placeholder='(Optional)' onChange={(event)=>this.setState({data:{...this.state.data, name:event.target.value}})}/>
    </Grid>
   
    <Grid item xs={2}>
    <TextField id="outlined-basic" label="Image Name" variant="outlined" 
      placeholder='Image Name(Required)' onChange={(event)=>this.setState({data:{...this.state.data, image:event.target.value}})} />
    </Grid>
    <Grid item xs={2}>
    
    <TextField id="outlined-basic" label="Tag Name" variant="outlined" 
    placeholder='Tag Name(Optional)' onChange={(event)=>this.setState({data:{...this.state.data, tag:event.target.value}})} />
    </Grid>
    <Grid item xs={2} >
      <Button variant="contained" onClick={event =>{this.createcontainer();}}>Create Container</Button>
    </Grid>
    <Grid item xs={2}>
    <p>{this.state.apiResponse}</p> 
    </Grid>
    </Grid>
    </CardContent>
  </Card>
  </Dialog>

    
  );
  
}

}
export default container;
