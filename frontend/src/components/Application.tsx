import { Alert, Box, Button, Card, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { DELETE_APPLICATION } from "../mutations/mutations";
import { FC } from "react";
import { GET_APPLICATIONS } from "../queries/queries";
import { IApplication } from "../interfaces/application";
import { useMutation } from "@apollo/client";

interface Props {
  application: IApplication;
}

const Application: FC<Props> = ({ application }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteApplication, { loading, error }] = useMutation(DELETE_APPLICATION, { refetchQueries: [{ query: GET_APPLICATIONS, variables: { offer: id } }] });

  const handleDeleteApplication = async () => {
    await deleteApplication({ variables: { id: application.id, offer: id } });
  };

  const handleEditApplication = () => {
    navigate(`/offers/${id}/applications/${application.id}/edit`, { state: { application } });
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: "#fff", p: "20px", flex: "1" }}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Box display={["block", "flex"]} justifyContent={["start", "space-between"]}>
        <Typography fontWeight="bold" variant="subtitle1">{application.name}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1">Stack technologiczny:</Typography>
        <Box display="flex" gap="5px" flexWrap="wrap">
          {application.technologies.map((technology) => (
            <Box key={technology.id} bgcolor="primary.main" color="#fff" py="5px" px="10px">
              <Typography variant="subtitle2">{technology.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box display={["block", "flex"]} justifyContent={["start", "space-between"]} mt="5px">
        <Typography variant="subtitle1">Oczekiwania finansowe:</Typography>
        <Typography fontWeight="bold" variant="subtitle1">{application.salary} PLN</Typography>
      </Box>
      <Box display={["block", "flex"]} justifyContent={["start", "space-between"]}>
        <Typography variant="subtitle1">E-mail:</Typography>
        <Typography fontWeight="bold" variant="subtitle1">{application.email}</Typography>
      </Box>
      <Box textAlign="center" display="flex" gap="5px" mt="10px">
        <Button disabled={loading} onClick={handleDeleteApplication} size="small" variant="outlined" fullWidth>
          Usuń aplikację
        </Button>
        <Button onClick={handleEditApplication} size="small" variant="outlined" fullWidth>
          Edytuj aplikację
        </Button>
      </Box>
    </Card>
  );
};

export default Application;
