/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        'panel-el-bg': 'var(--panel-el-bg-color)',
        'panel-el-color': 'var(--panel-el-color)',
        'panel-el-bg-color': 'var(--panel-el-bg-color)',
        'panel-el-bg-hover': 'var(--panel-el-bg-color-hover)',
        'panel-el-bg-color-bright': 'var(--panel-el-bg-color-bright)',
        'panel-el-bg-color-bright-hover': 'var(--panel-el-bg-color-bright-hover)',
      },
      borderColor:{
        "panel-el-color":'var(--panel-el-color)'
      }
    }
  },
  plugins: []
};