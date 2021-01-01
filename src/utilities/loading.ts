const element = document.getElementById('js-loading');

export const showLoading: () => void = () => {
  if (element) {
    element.classList.add('is-visible');
  }
};

export const hideLoading: () => void = () => {
  if (element) {
    element.classList.remove('is-visible');
  }
};
