/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "chat-background": "url('/chatBg.jpg')",
      },
      colors: {
        secondary: "#8696a0",
        "teal-light": "#7ae3c3",
        "photopicker-overlay-background": "rgba(30,42,49,0.8)",
        "dropdown-background": "#233138",
        "dropdown-background-hover": "#18222950",
        "input-background": "#2a3942",
        "primary-strong": "#e9edef",
        "panel-header-background": "#00000060",
        "panel-header-icon": "#ffffff",
        "icon-lighter": "#8696a0",
        "icon-green": "#00a884",
        "search-input-container-background": "#485778",
        "conversation-border": "rgba(134,150,160,0.15)",
        "conversation-panel-background": "#f7efe0",
        "background-default-hover": "#d47f4c",
        "incoming-background": "#2D3438",
        "outgoing-background": "#4E5E78",
        "bubble-meta": "hsla(0,0%,100%,0.6)",
        "icon-ack": "#53bdeb",
        "chatlistAll" : "#485778" ,
        "chatList-icon" : "#ffffff" ,
        "searchbar-text" : "#ffffff" ,
        "searchBar-Bg" : "#2F3744" ,
        "textfield-bar" : "#fffff" ,
        "testfield-text": "#485778" ,
      },
      gridTemplateColumns: {
        main: "1fr 2.4fr",
      },
    },
  },
  plugins: [],
};
