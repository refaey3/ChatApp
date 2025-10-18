import React from "react";
import styled from "styled-components";

const MainLoader = () => {
  return (
    <StyledWrapper>
      <div className="spinner"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);

  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid transparent;
    border-top: 6px solid var(--color-primary);
    border-right: 6px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    box-shadow: 0 0 20px var(--color-primary);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default MainLoader;
