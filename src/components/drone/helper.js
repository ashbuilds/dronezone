class Drone {
  constructor(tableId, drone) {
    this.drone = drone;
    this.table = document.getElementById(tableId);
    this.tablePosition = {
      top: this.table.offsetTop,
      left: this.table.offsetLeft,
      width: this.table.offsetWidth,
      height: this.table.offsetHeight,
    };
  }

  getAngle() {
    const element = window.getComputedStyle(this.drone, null);
    const transform = element.getPropertyValue('-webkit-transform') ||
        element.getPropertyValue('-moz-transform') ||
        element.getPropertyValue('-ms-transform') ||
        element.getPropertyValue('-o-transform') ||
        element.getPropertyValue('transform') ||
        'Cannot find the transform';
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle;
  }

  getPosition() {
    return {
      top: this.drone.offsetTop || 10,
      left: this.drone.offsetLeft || 10,
      width: this.drone.offsetWidth,
      height: this.drone.offsetHeight,
    };
  }
  isOnEdge(position, direction) {
    const droneProps = this.getPosition();
    const tableProps = this.table.getBoundingClientRect();
    let isEdge = false;
    if (direction === '-1horizontal') {
      isEdge =
           (tableProps.width - tableProps.left) < position;
    }
    if (direction === '1horizontal') {
      isEdge =
          position < 0;
    }
    if (direction === '1vertical') {
      isEdge =
          (tableProps.height - tableProps.top) < position - (droneProps.height / 2);
    }
    if (direction === '-1vertical') {
      isEdge =
          position <= 0;
    }
    return isEdge;
  }
  rotate(direction) {
    const currentAngle = this.getAngle();
    let newAngle = 0;
    console.log('currentAngle : ', currentAngle);
    if (direction === 'left') {
      newAngle = currentAngle - 90;
    } else {
      newAngle = currentAngle + 90;
    }
    if (Math.abs(newAngle) === 270) {
      newAngle = currentAngle;
    }
    this.drone.style.transform = `scale(1.2) rotate(${newAngle}deg)`;
  }
  move() {
    const currentPosition = this.getPosition();
    const currentAngle = this.getAngle();
    // if (currentAngle === 0) {
    //   const position = currentPosition.top - 20;
    //   if (!this.isOnEdge(position, `1vertical`)) {
    //     this.drone.style.top = `${position}px`;
    //   }
    // }
    if (Math.abs(currentAngle) === 90) {
      const direction = currentAngle < 0 ? 1 : -1;
      const position = currentPosition.left - (20 * direction);
      if (!this.isOnEdge(position, `${direction}horizontal`)) {
        this.drone.style.left = `${position}px`;
      }
    }
    if (Math.abs(currentAngle) === 180 || currentAngle === 0) {
      const direction = currentAngle <= 0 ? -1 : 1;
      const position = currentPosition.top + (20 * direction);
      if (!this.isOnEdge(position, `${direction}vertical`)) {
        this.drone.style.top = `${position}px`;
      }
    }
  }
}

export default Drone;
