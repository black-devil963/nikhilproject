import { Button, Grid, Popover, Typography } from '@mui/material';
import React from 'react';
class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:"",anchorEl:null};
  }
  callAPI(){
    fetch("http://localhost:9000/testAPI")
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse:res}))
     .catch((error) => {
      this.setState({apiResponse:"Backend server not working"});
  });
  }
  callVersion(){
    fetch("http://localhost:9000/version")
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse:res.replace(/\\n/gi,"").replace(/\"/gi,"")}))
    .catch((error) => {
      this.setState({apiResponse:"Docker not installed"});
  });
  }
  volumels(){
    fetch("http://localhost:9000/volume-ls")
    .then(res=>res.text())
    .then(res=>{
      this.state.apiResponse=JSON.parse(res).split("\\n")
    var table=[];
     for(let i=0;i<this.state.apiResponse.length;i++){
       table.push(this.state.apiResponse[i])
       table.push(<br/>)
     }
     this.setState({apiResponse:table[0]})
  });
  }
  containerls(){
    fetch("http://localhost:9000/container-ls")
    .then(res=>res.text())
    .then(res=>{
      this.state.apiResponse=JSON.parse(res).split("\\n")
    var table=[];
     for(let i=0;i<this.state.apiResponse.length;i++){
       table.push(this.state.apiResponse[i])
       table.push(<br/>)
     }
     this.setState({apiResponse:table[0]})
  });//lis=<b>CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMESss</b>;});
}

  imagels(){
    fetch("http://localhost:9000/image-ls")
    .then(res=>res.text())
    .then(res=>{
      this.state.apiResponse=JSON.parse(res).split("\\n")
    var table=[];
     for(let i=0;i<this.state.apiResponse.length;i++){
       table.push(this.state.apiResponse[i])
       table.push(<br/>)
     }
     this.setState({apiResponse:table[0]})
  });
  }
  componentWillMount(){
    this.callAPI();
  }

  
render(){
  return (
    <div style={{position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={()=>this.setState({anchorEl: null})}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
               <Typography sx={{ padding: 2 }}><pre>{this.state.apiResponse}</pre></Typography>
           

          </Popover>
          <div>
          <Button onClick={event =>{this.callAPI();this.setState({anchorEl:event.currentTarget});}} >callAPI</Button>
          <Button onClick={event =>{this.callVersion();this.setState({anchorEl:event.currentTarget});}} >version</Button>
          <Button onClick={event =>{this.containerls();this.setState({anchorEl:event.currentTarget});}} >containers</Button>
          <Button onClick={event =>{this.volumels();this.setState({anchorEl:event.currentTarget});}} >volumes</Button>
          <Button onClick={event =>{this.imagels();this.setState({anchorEl:event.currentTarget});}} >images</Button>
          
          </div>
       </div>
    
  );
  
}

}
export default Navbar;