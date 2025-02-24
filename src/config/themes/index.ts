// src/theme.ts
export const themes = {
  color: {
    primary: '#ff6b81',
    secondary: '#ffe4e6',
    secondaryLight: '#ffffff',
  },
};

// Hàm để áp dụng theme vào CSS Variables
export const applyThemeToCSS = () => {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', themes.color.primary);
  root.style.setProperty('--secondary-color', themes.color.secondary);
  root.style.setProperty('--secondary-light', themes.color.secondaryLight);
};
