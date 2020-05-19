import React, { Component } from 'react'

class Plano extends React.Component {

    state = {
        canvasWidth: 800,
        canvasHeight: 800,
        //canvasWidth: img.width,
        //canvasHeight: img.height,
        //canvas: ''
        //ctx: "",
        //img: ""
    }
    
    componentDidMount() {
      //const canvas = this.refs.canvas
      //canvas.addEventListener("mousedown", drawDevice(), false);
      //const ctx = canvas.getContext("2d")
      //const img = this.refs.image

      const canvas = this.refs.canvas
      const ctx = canvas.getContext("2d")
      const img = this.refs.image

      this.setState({
        canvasWidth: img.width,
        canvasHeight: img.height,
      })

      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        ctx.font = "40px Courier"
        //ctx.fillText(this.props.text, 210, 75)
     
      }

   
    }

    //dibujar = (x, y) => {
      //console.log(x + "||" + y)
   // }
/*
    onClick (event) {
      let x = event.pageX - 2;
      let y = event.pageY - 40;
      this.dibujar(x,y)
      

      //let selectedDevice = $('input[name="dispositivo"]:checked').val();

      //let deviceLoc = { tipoDisp: selectedDevice, xPos: x, yPos: y }
      //locations.push(deviceLoc);
      
      
      //var canvas = document.getElementById("canvas");

      const canvas = this.state.canvas

  }
*/
  render() {
      return(
        <div>
          <canvas 
            ref="canvas" 
            //width={this.state.canvasWidth} 
            //height={this.state.canvasHeight}
            width={640} 
            height={480}
            //onClick={this.onClick}
          />
          <img ref="image" src="/img/CentroBulonero.png" className="hidden" />
        </div>
      )
    }
  }
  export default Plano