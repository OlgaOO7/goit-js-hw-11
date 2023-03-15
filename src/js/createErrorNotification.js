import { refs } from '../index';
export function createErrorNotification() {
  const markupErr = `
    <div class="error-container">
      <img src="https://ipwatchdog.com/wp-content/uploads/2017/09/no-value.jpg" alt="error" />
    </div>`;
  refs.galerryContainer.insertAdjacentHTML('beforeend', markupErr);
}