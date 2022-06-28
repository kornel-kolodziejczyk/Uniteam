import { Alert, Box, Button, Card, Typography } from "@mui/material";

import { DELETE_OFFER } from "../mutations/mutations";
import { FC } from "react";
import { GET_OFFERS } from "../queries/queries";
import { IOffer } from "../interfaces/offer";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface Props {
  offer: IOffer;
}

const Offer: FC<Props> = ({ offer }) => {
  const navigate = useNavigate();
  const [deleteOffer, { loading, error }] = useMutation(DELETE_OFFER, { refetchQueries: [{ query: GET_OFFERS }] });

  const handleShowApplications = () => navigate(`/offers/${offer.id}/applications`);

  const handleDeleteOffer = () => deleteOffer({ variables: { id: offer.id } });

  const handleAddApplication = () => navigate(`/offers/${offer.id}/applications/add`);

  const handleEditOffer = () => navigate(`/offers/${offer.id}/edit`, { state: { offer } });

  return (
    <Card variant="outlined" sx={{ bgcolor: "#fff", p: "20px", flex: "1" }}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Box display={["block", "flex"]} justifyContent={["start", "space-between"]}>
        <Typography variant="subtitle1">Firma:</Typography>
        <Typography fontWeight="bold" variant="subtitle1">
          {offer.companyName}
        </Typography>
      </Box>
      <Box display={["block", "flex"]} justifyContent={["start", "space-between"]}>
        <Typography variant="subtitle1">Nazwa stanowiska:</Typography>
        <Typography fontWeight="bold" variant="subtitle1">
          {offer.positionName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1">Stack technologiczny:</Typography>
        <Box display="flex" gap="5px" flexWrap="wrap">
          {offer.technologies.map((technology) => (
            <Box key={technology.id} bgcolor="primary.main" color="#fff" py="5px" px="10px">
              <Typography variant="subtitle2">{technology.name}</Typography>
            </Box>
          ))}
        </Box>
        <Box display={["block", "flex"]} justifyContent={["start", "space-between"]} mt="5px">
          <Typography variant="subtitle1">Wynagrodzenie (netto):</Typography>
          <Typography fontWeight="bold" variant="subtitle1">
            {offer.salary} PLN
          </Typography>
        </Box>
      </Box>
      <Box textAlign="center" display="flex" gap="5px" mt="10px">
        <Button disabled={loading} onClick={handleDeleteOffer} size="small" variant="outlined">
          Usuń ofertę
        </Button>
        <Button onClick={handleEditOffer} size="small" variant="outlined">
          Edytuj ofertę
        </Button>
        <Button onClick={handleAddApplication} size="small" variant="outlined">
          Dodaj aplikację
        </Button>
      </Box>
      <Box textAlign="center" mt="15px">
        <Button {...(offer.applications.length && { onClick: handleShowApplications })} variant="text" size="small">
          {offer.applications.length ? `Wyświetl aplikacje (${offer.applications.length})` : `Brak aplikacji`}
        </Button>
      </Box>
    </Card>
  );
};

export default Offer;
