import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ul[class],
  ol[class] {
    padding: 0;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  body {
    min-height: 100vh;
    max-width: 100%;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #000;
  }

  ul[class],
  ol[class] {
    list-style: none;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img {
    display: block;
  }

  article > * + * {
    margin-top: 1em;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  * {
    scrollbar-width: none;
  }

  *::-webkit-scrollbar {
    width: 0px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: none;
  }

 
`;
export default GlobalStyle;
