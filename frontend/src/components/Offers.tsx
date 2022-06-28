import { Alert, Box, Button, Container, Grid, useTheme } from "@mui/material";

import { GET_OFFERS } from "../queries/queries";
import { IOffer } from "../interfaces/offer";
import Loader from "./UI/Loader";
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

const Offers = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { loading, error, data } = useQuery<{ offers: IOffer[] }>(GET_OFFERS);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const handleAddOffer = () => navigate("/offers/add");

  return (
    <Container maxWidth="lg">
      <Box mt={6} mb={3}>
        <Button onClick={handleAddOffer} size="large" variant="contained">
          Dodaj ofertę
        </Button>
      </Box>
      <Grid container spacing={theme.spacing(1)}>
        {data!.offers.map((offer) => (
          <Grid key={offer.id} item xs={12} lg={6}>
            <Offer offer={offer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Offers;
