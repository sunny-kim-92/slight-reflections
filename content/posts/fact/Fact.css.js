import styled from 'styled-components';

export const TeamsTable = styled.div`
  margin-top: 1vh;
  margin-bottom: 1vh;
  overflow-y: auto;
  justify-content: center;
  padding-bottom: 4px;
  border-collapse: collapse;
`;

export const GamesTable = styled.div`
  margin-top: 1vh;
  max-height: 40vh;
  overflow-y: auto;
  justify-content: center;
  padding-bottom: 4px;
  border-collapse: collapse;
`;

export const TableHeader = styled.td`
  font-weight: bold;
  color: black;
  background-color: #ededed;
  border: 1px solid;
  padding-left: 2vw;
  padding-right: 2vw;
`;

export const TableCell = styled.td`
  padding-left: 2vw;
  padding-right: 2vw;
  border-left: 1px solid;
  border-right: 1px solid;
`;
