// Gets references for themes
const themePicker = document.getElementById('theme-picker');
const pinkPicker = document.getElementById('theme-picker-2');
const purplePicker = document.getElementById('theme-picker-3');
const bluePicker = document.getElementById('theme-picker-4');
const defaultPicker = document.getElementById('theme-picker-default');

const themes = ['darkmode', 'pinkmode', 'purplemode', 'bluemode', 'defaultmode'];

// Clears themes
function clearThemes() {
    themes.forEach(theme => document.documentElement.classList.remove(theme));
}

// Sets and saves theme in localStorage
function setTheme(theme) {
    clearThemes();
    if (theme) {
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    
    } else {
        localStorage.removeItem('theme');
    }
}

// Saves theme in localStorage to persist on refresh
const savedTheme = localStorage.getItem('theme');
if (savedTheme && themes.includes(savedTheme)) {
    setTheme(savedTheme);
}

// Adds event listeners for clicks on each theme button
themePicker.addEventListener('click', () => setTheme('darkmode'));
pinkPicker.addEventListener('click', () => setTheme('pinkmode'));
purplePicker.addEventListener('click', () => setTheme('purplemode'));
bluePicker.addEventListener('click', () => setTheme('bluemode'));
defaultPicker.addEventListener('click', () => setTheme('defaultmode'));