import React, { Component } from 'react'
import { createBlockStyle, createContainerStyle} from './create-styles'
//All the elements have the same transform-origin and different degree of rotation.
//When an element is clicked every element transform chaging degree of rotation.
//onClick function pass the selectedElement to the user.

//objects with image property

class Rotator extends Component {
    constructor(props) {
        super(props);
        let positions = {
            left: 180,
            right: 0
        }
        this.state = {
            selected: 0,
            rotationStyles:{},
            position: positions[this.props.position]
        }
    }

    componentDidMount() {
        this.createRotationStyles();
    }

    createRotationStyles(i) {
        //Creating the angle of each rotation.
        let numOfObjects = this.props.objects.length;
        let angle = 360/numOfObjects;
        let {rotationStyles, position} = this.state;
        let currentAngle = rotationStyles[i] ? 
            this._calculateCurrentAngle(rotationStyles[i].currentAngle) : position;
        let angleDiff = rotationStyles[i] ? currentAngle - rotationStyles[i].currentAngle : angle;
        let currentObject = this.state.selected;
        for(let j = 0; j < numOfObjects; j++) {
            rotationStyles[currentObject] = createBlockStyle(currentAngle, 
                                                             this.props.position, 
                                                             this.props.sideDimension);
            currentObject = currentObject+1 < numOfObjects ? currentObject+1 : 0;
            currentAngle = rotationStyles[currentObject] ? rotationStyles[currentObject].currentAngle : currentAngle;
            currentAngle+=angleDiff;
        }
        this.setState({rotationStyles});
    }
    
    _calculateCurrentAngle(angle) {
        let { position } = this.state;
        while(( angle+ position) % 360!==0) {
            angle+=1;
        }
        return angle
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
            <div className="rotator__container" style={createContainerStyle()}>
                {
                    objects.map((obj, i) => {
                        return (
                            <div className="block" key={obj} style={rotationStyles[i]} onClick={() => { this.onClick(i) }}>
                                {obj}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}