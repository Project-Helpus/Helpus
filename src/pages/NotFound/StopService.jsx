import styled from "styled-components";

const StopService = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>Sorry, temporarily stop the service.</Description>
    </Container>
  );
};

export default StopService;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 0;
`;

const Subtitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 2rem;
`;
