// ease the work building up the iframe content in steps
// useful together with virtual fragments in reveal.js

export class VirtualIframeStack {
  steps = [];
  pending = [];
  active = [];

  constructor(steps) {
    this.steps = steps;
    this.reset();
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage({data}) {
    if (data === 'virtual:next') {
      this.next();
    }

    if (data === 'virtual:prev') {
      this.prev();
    }

    if (data === 'virtual:prepare:backwards') {
      this.fastForward();
    }
  }

  fastForward() {
    while (this.pending.length) {
      this.next();
    }
  }

  goto(index) {
    let counter = index;
    while (counter > 0) {
      this.next();
      counter--;
    }
  }

  reset() {
    this.pending = [...this.steps];
  }

  next() {
    const action = this.pending.shift();
    this.active.push(action);

    if (typeof action === 'function') {
      action();
    } else if (typeof action === 'object' && action.start && action.stop) {
      action.start();
    }
  }

  prev() {
    const action = this.active.pop();
    this.pending.unshift(action);

    if (typeof action === 'object' && action.start && action.stop) {
      action.stop();
    }
  }
}
