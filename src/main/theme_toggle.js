const toggleButton = document.getElementById('theme-toggle');

const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';

const currentTheme = localStorage.getItem('theme') || preferredTheme;

document.documentElement.setAttribute('data-theme', currentTheme);

toggleButton.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
