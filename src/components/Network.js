import React from 'react';
import { Typography, Box, Button} from '@mui/material';
var container;
var cn;
var sources;
class Network extends React.Component{
  text=-1;
  constructor(props){
    super(props);
    this.state={apiResponse:[],apiNetwork:[]};
  }
 
  Network(){
    fetch(`http://localhost:9000/Network`)
    .then(res=>res.text())
    .then(res=>{this.setState({apiResponse:JSON.parse(res)});this.props.handleVal(2)});//.then(res=>this.setState({apiResponse1:res.replace(/\\t/gi, '   ')}));
  }

  Download(){
    fetch(`http://localhost:9000/download-${cn}`)
    .then(res=>{console.log("done"+cn)})
    
  }
  
  checkbody=(timer) =>{
    clearTimeout(timer);
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#B0DAFF";
    ctx.fillRect(0,0,1000,569);
    ctx.beginPath();
    ctx.arc(390, 284, 50, 0, 2 * Math.PI);
    ctx.font = "15px Verdana";
    
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0"," magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText(cn,341,290);
    var x=container.length,i=0;
var angle=360/x;
for(i=0;i<x;i++)
{
ctx.moveTo(390+50*Math.cos(i*angle*3.14/180),284-50*Math.sin(i*angle*3.14/180));
ctx.lineTo(390+160*Math.cos(i*angle*3.14/180),284-160*Math.sin(i*angle*3.14/180));

}
ctx.stroke();
    
for(i=0;i<x;i++)
  {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.font = "10px Verdana";
  const text=container[i].split('#$#');
  const x = 345 + 230 * Math.cos(i * angle * Math.PI / 180);
  const y = 270 - 230 * Math.sin(i * angle * Math.PI / 180);
  ctx.fillText(text[0],x+20,y);
  ctx.fillText(text[1],x,y+10);
  ctx.fillText(text[2],x,y+20);
  if (!text[3].includes("map[]"))ctx.fillText(text[3],x,y+30);
    //container circle
  //ctx.arc(390+200*Math.cos(i*angle*3.14/180), 284-200*Math.sin(i*angle*3.14/180), 40, 0, 2 * Math.PI);
  
  const sides = 6; // Number of sides for a hexagon
  const angleStep = 2 * Math.PI / sides; // Angle between vertices in radians
  ctx.beginPath();
  for (let j = 0; j < sides; j++) {
                  // Calculate the vertex position
                  const xhaxagonal = 390+220*Math.cos(i*angle*3.14/180) + 60 * Math.cos(j * angleStep);
                  const yhaxagonal = 284-220*Math.sin(i*angle*3.14/180) + 60 * Math.sin(j * angleStep);
                  
                  if (j === 0) {
                      ctx.moveTo(xhaxagonal, yhaxagonal); // Move to the first vertex
                  } else {
                      ctx.lineTo(xhaxagonal, yhaxagonal); // Draw lines to subsequent vertices
                  }
              }
     ctx.closePath();
  
    
  ctx.stroke();

  
  }
    
  }
  functionLoad(source){
    fetch(`http://localhost:9000/Network-${source}`)
   .then(res=>res.json())
   .then(res=>{
    cn=source
    container=res
    this.props.handleVal(3);
   
});
  }
  
  componentWillMount(){
    
  }
  
render(){
    
  
    if(this.props.val===1)return (
        <div style={{height:'100%', display:'flex',justifyContent:'center', alignItems:'center', marginTop: '-70px'}}>
       <div className="Nbody1">
       
       <Typography sx={{border: '2px solid #1976d2 ', borderRadius: '20vh', height:70, width: 70, cursor: 'pointer',padding:8, fontSize:'1.2rem',color:'#1976d2'}} onClick={event =>{this.Network();}}>Search Network</Typography>
       </div></div>
  );
 else if(this.props.val===2){
var lis = [];
for (let i=0;i<this.state.apiResponse.length-1; ++i) {
    lis.push(<button style={{"margin-top":"40px"}}   onClick={event =>{this.functionLoad(this.state.apiResponse[i]);}}>{this.state.apiResponse[i]}</button>);
}
    return (
    <div className="Network">
   <div className="Nbody2">
   {lis}
   </div></div>

);
  
}
else if(this.props.val===3){

  const timer = setTimeout(() => {this.checkbody(timer)}, 2000); // 4000 mill
  return (
    
 
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      
      <pre className="Nbody2" style={{"position":"relative"}}>
      <canvas id="myCanvas" width="800" height="600"  >.</canvas>
      <Button variant="text" style={{"position":"absolute","right":"0px"}} onClick={event =>{this.Download();}}>Download</Button>
      </pre>  
    </Box>

  

  );
}
}

}
export default Network;
