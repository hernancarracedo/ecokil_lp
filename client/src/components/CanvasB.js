import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Circle, Image, Rect, Text, Group } from 'react-konva';
import useImage from 'use-image';

const PlanoImage = () => {
  //const [image] = useImage('http://konvajs.org/assets/lion.png');
  const [image, height, width] = useImage('http://localhost:3000/img/Plano.png');
  
  //alert("ALTURA: "+height)
  //console.log("ANCHO: "+width)

  return <Image image={image} />;
};


class CanvasB extends Component {
  state = {
    items: [],
    canvasWidth: 1000,
    canvasHeight: 1000,
    editing: true
  };



  componentDidMount() {
    const img = this.refs.image
    this.setState({ canvasWidth: img.width, canvasHeight: img.height})
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push({
        //x: Math.random() * window.innerWidth,
        //y: Math.random() * window.innerHeight,
        //x: Math.random() * this.state.canvasWidth,
        //y: Math.random() * this.state.canvasHeight,
        x: 300,
        y: i * 20,
        id: 'node-' + i,
        //color: Konva.Util.getRandomColor(),
        color: "black",
        name: i+1
      });
    }
    this.setState({ items: items})
  }

  handleDragStart = e => {
    const id = e.target.name();
    const items = this.state.items.slice();
    const item = items.find(i => i.id === id);
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top

    items.push(item);
    this.setState({
      items
    });
  };
  onDragEnd = e => {
    const id = e.target.name();
    const items = this.state.items.slice();
    const item = this.state.items.find(i => i.id === id);
    const index = this.state.items.indexOf(item);
    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y()
    };
    this.setState({ items });
    //console.log(this.state.items);
  };

  _onSubmit = event => {
    event.preventDefault();
    const newDespliegue = [];
    let output = "";
    this.state.items.map(item => newDespliegue.push({
      x: item.x,
      y: item.y,
      id: item.id,
      name: item.name })
    )

    this.state.items.map(item => output = output + "X: " + item.x + " Y: " + item.y + " ID:" + item.id + " nombre: " + item.name + "\n"
    )

    console.log ("HOLA");

    alert(output);
    //axios.post('http://localhost:5000/monitoreo/create/', newMonitoreo);
    //window.location.href = '/';
  };

  render() {
    return (
      <div>
       <Stage width={this.state.canvasWidth} height={this.state.canvasHeight}>
        <Layer>
          <PlanoImage />

          <Rect
            x={200}
            y={500}
            width={20}
            height={20}
            fill="black"
            stroke="black"
            shadowBlur={0}
            //onDragStart={this.handleDragStart}
            //onDragEnd={this.handleDragEnd}  
          />
          <Rect
            x={200+20}
            y={500}
            width={20}
            height={20}
            stroke="black"
            shadowBlur={0}
            //onDragStart={this.handleDragStart}
            //onDragEnd={this.handleDragEnd}  
          />
          <Text 
            text="88" 
            fontSize={13}
            x={200+3}
            y={500+3}
            fontStyle="bold"
            fill="white"
            />

          {this.state.items.map(item => (
            <Group 
              key={item.id}
              name={item.id}
              draggable
              x={item.x}
              y={item.y}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            >
              <Rect
                key={item.id}
                //name={item.id}
                //draggable
                x={item.x}
                y={item.y}
                width={20}
                height={20}
                fill={item.color}
                //radius={10}
                //onDragStart={this.handleDragStart}
                //onDragEnd={this.handleDragEnd}
              />
              <Text 
                text={item.name}
                fontSize={13}
                x={item.x+3}
                y={item.y+3}
                fontStyle="bold"
                fill="white"
              />
            </Group>

          ))}
           
        </Layer>
      </Stage>
      <form onSubmit={this._onSubmit}>
        <div className="d-flex justify-content-center m-4"><button className="btn btn-danger btn-lg btn-block" type="submit">Confirma Monitoreo</button></div>
      </form>
      <img ref="image" src="/img/CentroBulonero.png" className="hidden" />
      </div>
    );
  }
}

export default CanvasB
//render(<App />, document.getElementById('root'));
