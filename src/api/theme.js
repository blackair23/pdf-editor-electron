const btn = document.getElementById('theme-controller');
const currentTheme = document.querySelector('html');
btn.checked = true;

const themeChanger = () => {
    
    if(currentTheme.getAttribute('data-theme') === "dark"){
        currentTheme.setAttribute('data-theme', 'light');
    }else if(currentTheme.getAttribute('data-theme') === "light"){
        currentTheme.setAttribute('data-theme', 'dark');
    }
    
};

btn.addEventListener('click', themeChanger);