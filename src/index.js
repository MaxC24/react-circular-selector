import React, { Component } from 'react'

//All the elements have the same transform-origin and different degree of rotation.
//When an element is clicked every element transform chaging degree of rotation.
//onClick function pass the selectedElement to the user.

//objects with image property

class Rotator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected = 0
        }
    }

    createRotationStyles() {
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
            currentObject = currentObject+1 < numOfObjects ? currentObjects+1 : 0;
        }
    }

    render() {
        let { objects } = this.props;
        let rotationClasses = this.createRotationStyles();
        return(
            <React.Fragment>
                {
                    objects.map((obj, i) => {
                        return (
                            <div style={rotationClasses[i]} onClick={() => { this.setState({selected:i}) }}>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}