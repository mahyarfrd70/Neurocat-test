import { createGlobalStyle } from "styled-components";

// we use this file to write global styles which we use many times in application

export default createGlobalStyle`
  body{
    margin:unset;
  }
  div{
    box-sizing:border-box;
  }
`;
