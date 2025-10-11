import React from "react";
import { FaSearch } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";

const SearchAddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-secondry);
  padding: 8px 12px;
  border-radius: 8px;
  flex: 1;

  svg {
    color: #aaa;
    font-size: 14px;
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  width: 100%;

  &::placeholder {
    color: #777;
  }
`;

const Plus = styled.div`
  margin-left: 10px;
  background-color: var(--color-secondry);
  border-radius: 8px;
  padding: 7px;
  cursor: pointer;
  transition: 0.3s;

  svg {
    margin-top: 1px;
    color: #fff;
    font-size: 20px;
  }

  &:hover {
    background-color:green;
  }
`;

export default function Search({ onSearch }) {
  return (
    <SearchAddContainer>
      <SearchBox>
        <FaSearch />
        <Input
          placeholder="Search"
          type="text"
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchBox>
      <Plus>
        <BiPlus />
      </Plus>
    </SearchAddContainer>
  );
}
