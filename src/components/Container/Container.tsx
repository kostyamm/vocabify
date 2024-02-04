import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: ${(props: { large?: boolean }) => props.large ? '1600px' : '1280px'};
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`