class Drone {
  constructor(tableId, drone) {
    this.drone = drone;
    this.table = document.getElementById(tableId);
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
    return Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }

  getPops() {
    return {
      top: this.drone.offsetTop || 10,
      left: this.drone.offsetLeft || 10,
      width: this.drone.offsetWidth,
      height: this.drone.offsetHeight,
    };
  }

  isOnEdge(position, direction) {
    const droneProps = this.getPops();
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
    const currentPosition = this.getPops();
    const currentAngle = this.getAngle();
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

  facing(f = 0) {
    this.drone.style.transform = `scale(1.2) rotate(${f}deg)`;
  }

  input({ x = 0, y = 0, f = 0 }) {
    const direction = Number(f);
    if (direction) {
      this.facing(direction === 1 ? 0 : direction);
    }
    const droneProps = this.getPops();
    const tableProps = this.table.getBoundingClientRect();
    let left = x || droneProps.left;
    let top = y || droneProps.top;
    if (top < 0) {
      top = 0;
    }
    if (left < 0) {
      left = 0;
    }
    if (tableProps.width - tableProps.left < left) {
      left = tableProps.width - droneProps.width;
    }
    if (tableProps.height - tableProps.top < top) {
      top = tableProps.height - droneProps.height;
    }
    this.drone.style.left = `${left}px`;
    this.drone.style.top = `${top}px`;
  }

}

export default Drone;
