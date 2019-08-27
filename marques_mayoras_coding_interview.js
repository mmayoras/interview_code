class AnimationSequence {
  constructor(element, sequence) {
    this.element = element;
    this.sequence = sequence;
  }
  
  /*
   * Promise wrapper function
   */
  promiseTimeout = (callback, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, delay);
    });
  }

  /*
   * Promise approach calling function that returns Promise
   */
  animate2 = async () => {
    for (const frame of this.sequence) {
      const { styles, delay } = frame;
      await this.promiseTimeout(() => {
        // console.log('Next width' + styles.width);
        this.element.style.width = styles.width;        
      }, delay);
    }
  };

  /*
   * Recursive approach for inwordly calling next timeout frame
   */
  animateFrame = (idx) => {
    if (idx === this.sequence.length) {
      return;
    }
    
    console.log(idx);
    const { styles, delay } = this.sequence[idx];
    setTimeout(() => {
      console.log('Next width' + styles.width);
      
      this.element.style.width = styles.width;
      
      this.animateFrame(idx + 1);
    }, delay);
  }

  /*
   * Calls recursive function with initial index of 0
   */
  animate = () => {
    this.animateFrame(0);
  };
  
  pause = () => {
    console.log('Pause!');
  };
}

const bar = document.querySelector('#inner-bar');
const frames = [
  { styles: { width: '10%' }, delay: 225 },
  { styles: { width: '20%' }, delay: 420 },
  { styles: { width: '30%' }, delay: 150 },
  { styles: { width: '40%' }, delay: 210 },
  { styles: { width: '50%' }, delay: 300 },
  { styles: { width: '60%' }, delay: 150 },
  { styles: { width: '70%' }, delay: 250 },
  { styles: { width: '80%' }, delay: 275 },
  { styles: { width: '90%' }, delay: 325 },
  { styles: { width: '100%' }, delay: 175 },
];

const barAnimation = new AnimationSequence(bar, frames);

const animateButton = document.querySelector('#bar-animate');
const pauseButton = document.querySelector('#pause');

animateButton.addEventListener('click', barAnimation.animate);
pauseButton.addEventListener('click', barAnimation.pause);
