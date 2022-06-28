import { Alert, Autocomplete, Box, Button, Container, TextField, Tooltip, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { GET_OFFERS, GET_TECHNOLOGIES } from "../queries/queries";
import { SyntheticEvent, useState } from "react";
import { number, object, string } from "yup";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_OFFER } from "../mutations/mutations";
import { ITechnology } from "../interfaces/technology";
import Loader from "./UI/Loader";
import Subheader from "./UI/Subheader";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const initialValue = {
  companyName: "",
  positionName: "",
  salary: "",
};

const AddOffer = () => {
  const { loading, error, data } = useQuery<{ technologies: ITechnology[] }>(GET_TECHNOLOGIES);
  const [addOffer, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_OFFER, { refetchQueries: [{ query: GET_OFFERS }] });
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (mutationError) {
    return <Alert severity="error">{mutationError.message}</Alert>;
  }

  const handleAddTechnology = (e: SyntheticEvent, value: ITechnology | null) => {
    if (value && !_.some(technologies, { id: value.id })) {
      setTechnologies((prevState) => [...prevState, { name: value.name, id: value.id }]);
    }
  };

  const handleDeleteTechnology = (technology: ITechnology) => {
    const { id } = technology;
    setTechnologies((prevState) => [...prevState.filter((technology) => technology.id !== id)]);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={7}>
        <Subheader>Dodawanie oferty</Subheader>
        <Formik
          initialValues={initialValue}
          onSubmit={async (values) => {
            await addOffer({ variables: { ...values, technologies: technologies.map((technology) => technology.id) } });
            navigate(`/offers`);
          }}
          validationSchema={object({
            companyName: string().required("Wpisz poprawną nazwę firmy.").min(2, "Nazwa firmy musi składać się z co najmniej 2 znaków"),
            positionName: string().required("Wpisz poprawną nazwę stanowiska.").min(3, "Nazwa stanowiska musi składać się z co najmniej 3 znaków."),
            salary: number().required("Wpisz poprawną kwotę wynagrodzenia.").min(1, "Wysokość wynagrodzenia nie może być mniejsza niż zero."),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <Field
                as={TextField}
                color="primary"
                error={Boolean(errors.companyName) && Boolean(touched.companyName)}
                fullWidth
                helperText={Boolean(touched.companyName) && errors.companyName}
                label="Nazwa firmy"
                name="companyName"
                type="text"
                variant="outlined"
              />
              <Box height={16} />
              <Field
                as={TextField}
                color="primary"
                error={Boolean(errors.positionName) && Boolean(touched.positionName)}
                fullWidth
                helperText={Boolean(touched.positionName) && errors.positionName}
                label="Nazwa stanowiska"
                name="positionName"
                type="text"
                variant="outlined"
              />
              <Box height={16} />
              <Autocomplete
                disablePortal
                fullWidth
                getOptionLabel={(option) => option.name}
                onChange={handleAddTechnology}
                options={data!.technologies}
                renderInput={(params) => <TextField {...params} label="Nazwa technologii" />}
              />
              <Box height={16} />
              {technologies.length ? (
                <>
                  <Box display="flex" gap="5px" flexWrap="wrap">
                    {technologies.map((technology) => (
                      <Tooltip key={technology.id} title="Kliknij, żeby usunąć.">
                        <Box onClick={() => handleDeleteTechnology(technology)} bgcolor="primary.main" color="#fff" py="5px" px="10px" sx={{ cursor: "pointer" }}>
                          <Typography variant="subtitle2">{technology.name}</Typography>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                  <Box height={16} />
                </>
              ) : null}
              <Field
                as={TextField}
                color="primary"
                error={Boolean(errors.salary) && Boolean(touched.salary)}
                fullWidth
                helperText={Boolean(touched.salary) && errors.salary}
                label="Wynagrodzenie"
                name="salary"
                type="number"
                variant="outlined"
              />
              <Box height={16} />
              <Button type="submit" variant="contained" color="primary" size="large" disabled={!dirty || !isValid || mutationLoading}>
                Dodaj ofertę
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddOffer;
