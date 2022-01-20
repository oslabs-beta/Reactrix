import styled from '@emotion/styled';

interface IHorizontal {
  horizontal: boolean;
}
export const OrgTreeContainer = styled.div<IHorizontal>`
  display: block;
  padding: 15px;
`;

export const OrgTree = styled.div<IHorizontal>`
  display: table;
  text-align: center;

  &:before,
  &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
`;
