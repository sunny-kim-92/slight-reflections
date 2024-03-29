import styled from 'styled-components';
import MEDIA from '../../helpers/mediaTemplates';

export const Container = styled.div`
  text-align: center;
`;

export const ChartLayout = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 4vh;
  ${MEDIA.TABLET`
  display: block;
`};
`;

export const DoughnutContainer = styled.div`
  height: 60vh;
  width: 24vw;
  margin-right: 2vw;
  position: relative;
  ${MEDIA.TABLET`
  width: 50%;
`};
`;

export const ChessboardContainer = styled.div`
  ${MEDIA.TABLET`
  width: 100%;
`};
`;

export const Text = styled.span`
  display: inline;
  font-size: 3rem;
  font-weight: 500;
  color: ${({ side }) =>
    side === 'p' ? 'blue' : side === 'r' ? 'red' : 'black'};
  ${MEDIA.TABLET`
    display: block;
  `};
`;

export const DropdownContainer = styled.div`
  align-content: center;
  width: 22vw;
  margin-bottom: 10px;
  ${MEDIA.TABLET`
  width: 40vw;
`};
`;

export const GamesTable = styled.div`
  margin-top: 6vh;
  max-height: 35vh;
  overflow-y: auto;
  justify-content: center;
  padding-bottom: 4px;
`;

export const TableHeader = styled.td`
  font-weight: bold;
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
