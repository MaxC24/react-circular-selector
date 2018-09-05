import React, { Component } from 'react'

//All the elements have the same transform-origin and different degree of rotation.
//When an element is clicked every element transform chaging degree of rotation.
//onClick function pass the selectedElement to the user.

//objects with image property

class Rotator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            rotationStyles:{}
        }
    }

    componentDidMount() {
        this.createRotationStyles();
    }

    //TODO create a custome the currentAngle. so it adds the angle so rotates clockwise
    createRotationStyles(i) {
        //Creating the angle of each rotation.
        let numOfObjects = this.props.objects.length;
        let angle = 360/numOfObjects;
        let rotationStyles = {};
        let currentAngle = 180;
        let currentObject = this.state.selected;
        for(let i = 0; i < numOfObjects; i++) {
            rotationStyles[currentObject] = {
                transform: `rotate(${currentAngle}DEG)`
            }
            currentAngle+=angle;
            currentObject = currentObject+1 < numOfObjects ? currentObject+1 : 0;
        }
        this.setState({rotationStyles});
    }
    
    onClick(i) {
        let { onClick, objects } = this.props;
        this.setState({ selected: i }, () => {
            onClick(objects[i]);
            this.createRotationStyles(i);
        })
    }

    render() {
        let { objects } = this.props;
        let { rotationStyles } = this.state;
        return(
            <React.Fragment>
                {
                    objects.map((obj, i) => {
                        return (
                            <div className="block" key={i} style={rotationStyles[i]} onClick={() => { this.onClick(i) }}>
                                {obj}
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}