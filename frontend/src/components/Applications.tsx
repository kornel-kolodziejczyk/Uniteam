import { Alert, Button, Container, Grid, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Application from "./Application";
import { Box } from "@mui/system";
import { GET_APPLICATIONS } from "../queries/queries";
import { IApplication } from "../interfaces/application";
import Loader from "./UI/Loader";
import { useQuery } from "@apollo/client";

const Applications = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const { loading, error, data } = useQuery<{ applications: IApplication[] }>(GET_APPLICATIONS, { variables: { offer: id } });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (!data?.applications.length) {
    navigate("/offers");
  }

  const handleBackToOffers = () => navigate("/offers");

  return (
    <Container maxWidth="lg">
      <Box mt={6} mb={3}>
        <Button size="large" variant="contained" onClick={handleBackToOffers}>
          Wróć do ofert
        </Button>
        <Box height={30} />
        <Grid container spacing={theme.spacing(1)}>
          {data!.applications.map((application) => (
            <Grid key={application.id} item xs={12} md={6} lg={4}>
              <Application application={application} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Applications;
