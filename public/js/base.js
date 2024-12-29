export default class ScrollHandler {
// class ScrollHandler {
  constructor() {
      this.header = document.querySelector('.header');
      this.leftBottom = document.getElementById('leftBottom');
      this.leftBottomScroll = document.querySelector('.left-bottom-scroll');
      this.placeholder = null;

      this.init();
  }

  init() {
      document.addEventListener('dragstart', this.preventDefault);
      document.addEventListener('selectstart', this.preventDefault);
      document.addEventListener('scroll', this.handleScroll.bind(this));

      this.header.style.transition = 'font-size 0.5s, margin 0.5s';
  }

  preventDefault(event) {
      event.preventDefault();
  }

  handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      if (!this.placeholder) {
          this.createPlaceholder();
      }

      this.adjustHeader(scrollPercentage);
      this.adjustLeftBottom(scrollPercentage);
  }

  createPlaceholder() {
      this.placeholder = document.createElement('div');
      this.placeholder.id = 'leftBottomPlaceholder';
      this.leftBottom.parentNode.insertBefore(this.placeholder, this.leftBottom);
  }

  adjustHeader(scrollPercentage) {
      if (scrollPercentage > 22) {
          this.header.style.fontSize = '74px';
          this.header.style.margin = '0 0 8%';
      } else {
          this.header.style.fontSize = '120px';
          this.header.style.margin = '0';
      }
  }

  adjustLeftBottom(scrollPercentage) {
      if (scrollPercentage > 26) {
          this.placeholder.style.display = 'block';
          this.placeholder.style.height = `${this.leftBottom.offsetHeight}px`;

          this.leftBottom.style.position = 'fixed';
          this.leftBottom.style.top = '0';
          this.leftBottom.style.marginTop = '9%';
          this.leftBottom.style.left = '0';
          this.leftBottom.style.width = '70%';
          this.leftBottom.style.transition = '';

          this.leftBottomScroll.classList.add('add');
      } else {
          this.leftBottom.style.transition = 'all 0.3s ease-in-out';
          this.leftBottom.style.position = 'relative';
          this.leftBottom.style.marginTop = '60%';
          this.leftBottom.style.top = '';
          this.leftBottom.style.left = '';
          this.leftBottom.style.width = '';

          this.placeholder.style.display = 'none';

          this.leftBottomScroll.classList.remove('add');
      }
  }
}

// new ScrollHandler();
// module.exports = ScrollHandler;