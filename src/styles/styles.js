import styled from "styled-components";
import Select from "react-select";


export const FormContainer = styled.form`
   display: flex;
   align-items: flex-end;
   gap: 10px;
   flex-wrap: wrap;
   background-color: #fff;
   padding: 20px;
   box-shadow: 0px 0px 5px #ccc;
   border-radius: 5px;
`;

export const InputArea = styled.div`
   display: flex;
   flex-direction: column;
`;

export const Input = styled.input`
   width: 120px;
   padding: 0 10px;
   border: 1px solid #bbb;
   border-radius: 5px;
   height: 40px;
`;

export const Label = styled.label`
`;

export const Button = styled.button`
   padding: 10px;
   cursor: pointer;
   border-radius: 5px;
   border: none;
   background-color: #2c73d2;
   color: white;
   height: 42px;
`;

export const StyledSelect = styled(Select)`
  width: 200px;

  .react-select__control {
    height: 40px;
    border-radius: 5px;
    border: 1px solid #bbb;
  }

  .react-select__value-container {
    padding: 0 10px;
  }

  .react-select__option {
    font-size: 14px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const Title = styled.h2``;