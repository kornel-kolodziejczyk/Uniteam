import { CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container maxWidth="lg" >
      <CircularProgress />
    </Container>
  );
};

export default Loader;
