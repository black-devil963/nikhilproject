import React from 'react';
import Navbar from './components/Footer';
import Container from './components/container';
import Share from './components/share';
import Image from './components/ImagePull';
import Details from './components/Details';
import Networks from './components/Network';
import './App.css';
import { Avatar, Box, Button, Dialog, Grid, Link, Paper, Typography } from '@mui/material';
import Logo from './logo.png';
import BackgroundImage from './BackgroundImage.png';
// var text="</>";

var content;
class Compiler extends React.Component{
  constructor(props){
    super(props);
  }
  solve() {
    fetch("http://localhost:9000/cmd?"+document.getElementsByClassName('compilertext')[0].value)
    .then(res=>res.text())
    .then(res=>{
      console.log(res.length)
      if(res.length==2){
        if(content==undefined)content="<div style='color:yellow'>-->"+document.getElementsByClassName('compilertext')[0].value+"<-- is not a valid command</div>";
        else content+=document.getElementsByClassName('compilertext')[0].value+"->not a valid command<-";
      }
      else{
      if(content==undefined)content="<div>-> <div style='display:inline-flex;'>"+JSON.parse(res)+"</div></div>";
      else content+="<div>-> <div style='display:inline-flex;'>"+JSON.parse(res)+"</div></div>";}
      document.getElementsByClassName('content')[0].innerHTML=content;
      document.getElementsByClassName('compilertext')[0].value="";
      // content.push(JSON.parse(res));
      // document.getElementsByClassName('content')[0].innerHTML=content;
      // document.getElementsByClassName('compilertext')[0].value="";
    })
    
  }
  render(){  
  return (
       <Dialog open={this.props.open} onClose={this.props.handleClose} 
       sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "70vw",  // Set your width here
          },
        },
      }}>
        <div style={{backgroundColor: 'black', width: '70vw', overflow: 'hidden'}}>
          <div className="contentbox"><pre className="content">{content}</pre></div>
          <input className="compilertext" style={{zIndex:'-1', height: '4vh',width:'100%', outline: 'none'}} onKeyDown={(e)=>{if(e.keyCode == 13)this.solve();}} />
        </div>
       </Dialog> 
  );
  }
}
class App extends React.Component{
  
  valueapp=1;
  constructor(props){
    super(props);
    this.state={apis:1, page:1, val: 1};//this.state={apiResponse:"",apiResponse1:""};
  }
  
  solve(){
    fetch("http://localhost:9000/cmd?"+document.getElementsByClassName('compilertext')[0].value)
    .then(res=>res.text())
    .then(res=>{
      console.log(res.length)
      if(res.length==2){
        if(content==undefined)content="<div style='color:yellow'>-->"+document.getElementsByClassName('compilertext')[0].value+"<-- is not a valid command</div>";
        else content+=document.getElementsByClassName('compilertext')[0].value+"->not a valid command<-";
      }
      else{
      if(content==undefined)content="<div>-> <div style='display:inline-flex;'>"+JSON.parse(res)+"</div></div>";
      else content+="<div>-> <div style='display:inline-flex;'>"+JSON.parse(res)+"</div></div>";}
      document.getElementsByClassName('content')[0].innerHTML=content;
      document.getElementsByClassName('compilertext')[0].value="";
      // content.push(JSON.parse(res));
      // document.getElementsByClassName('content')[0].innerHTML=content;
      // document.getElementsByClassName('compilertext')[0].value="";
    })
    
  }
  componentWillMount(){
    
  }
  
render(){  
return (
 <Box sx={{background:`url("${BackgroundImage}")`, overflowY:'hidden',  boxShadow: '4px 2px 2px lightblue'}}>
    <Grid container spacing={{ md: 2 }} columns={{ md: 14 }} sx={{paddingTop: '10px'}}>
          <Grid item xs={1.5}>
            <Avatar src={Logo} sx={{position: 'absolute',left:"20px", width: 56, height: 56  }} />
          </Grid>
          <Grid item xs={1.75}>
            <Button  onClick={()=>{this.setState({page:0, val: 1})}} >Network</Button>
          </Grid>
          <Grid item xs={1.75}>
            <Button  onClick={()=>{this.setState({page:1})}} >Container</Button>
          </Grid>
          <Grid item xs={1.75}>
            <Button  onClick={()=>{this.setState({page:2})}} >Pull Image</Button>
          </Grid>
          <Grid item xs={1.75}>
            <Button  onClick={()=>{this.setState({page:3})}} >Image Details</Button>
          </Grid>
          <Grid item xs={1.75}>
            <Button  onClick={()=>{this.setState({page:4})}} >Share Image</Button>
          </Grid>
          <Grid item xs={1.75}>
            <Button  onClick={()=>{this.setState({page:5})}} >Open Cli</Button>
          </Grid>
          <Grid item xs={1.75}>
          <Typography> <Link href="https://drive.google.com/u/0/uc?id=1PQZ1r0aafUdte-pHxlbeSm7enwEETzxW&export=download">Download Backend</Link> </Typography>
          </Grid>
        </Grid>
    <Box sx={{height:"calc(100% - 45px)", position: 'absolute',overflowY:'hidden', top: 45, left: 0, width: '100%', zIndex: '-1',background:'inherit'}}>
      <Networks val = {this.state.val} handleVal={(value)=>this.setState({val:value})}/>
      <Container open={this.state.page === 1} handleClose={()=> this.setState({page:0})}/>
      <Image open={this.state.page === 2} handleClose={()=> this.setState({page:0})}/>
      <Details open={this.state.page === 3} handleClose={()=> this.setState({page:0})}/>
      <Share open={this.state.page === 4} handleClose={()=> this.setState({page:0})}/>
      <Compiler open={this.state.page === 5} handleClose={()=> this.setState({page:0})}/>
    </Box>
     <Navbar/>
  </Box>
  );


}

}
export default App;
