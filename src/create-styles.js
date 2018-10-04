export function createBlockStyle(angle, position, sd) {
    return {
        position: 'absolute',
        transform: `rotate(${angle}DEG)`,
        transformOrigin: `${ position === 'right' ? `${-sd}px` : `${sd}px` } 50px`,
        transition: `transform .6s`,
        currentAngle: angle
    }
}

export function createContainerStyle() {
    return {
        position: 'relative',
        transform: 'translate(50%, 300px)',
        transformOrigin: '50% 50%',
    }
}