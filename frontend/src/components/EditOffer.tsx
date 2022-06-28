import { Alert, Autocomplete, Box, Button, Container, TextField, Tooltip, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { SyntheticEvent, useState } from "react";
import { number, object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { EDIT_OFFER } from "../mutations/mutations";
import { GET_TECHNOLOGIES } from "../queries/queries";
import { IOffer } from "../interfaces/offer";
import { ITechnology } from "../interfaces/technology";
import Loader from "./UI/Loader";
import Subheader from "./UI/Subheader";
import _ from "lodash";

const EditOffer = () => {
  const { loading, error, data } = useQuery<{ technologies: ITechnology[] }>(GET_TECHNOLOGIES);
  const { offer } = useLocation().state as { offer: IOffer };
  const initialValue = { companyName: offer.companyName, positionName: offer.positionName, salary: offer.salary };

  const [editOffer, { loading: mutationLoading, error: mutationError }] = useMutation(EDIT_OFFER);
  const [technologies, setTechnologies] = useState<ITechnology[]>(offer.technologies);
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
    <Container>
      <Box mt={7}>
        <Subheader>Dodawanie oferty</Subheader>
        <Formik
          initialValues={initialValue}
          onSubmit={async (values) => {
            await editOffer({ variables: { id: offer.id, ...values, technologies: technologies.map((technology) => technology.id) } });
            navigate(`/offers`);
          }}
          validationSchema={object({
            companyName: string().required("Wpisz poprawną nazwę firmy.").min(2, "Nazwa firmy musi składać się z co najmniej 2 znaków"),
            positionName: string().required("Wpisz poprawną nazwę stanowiska.").min(3, "Nazwa stanowiska musi składać się z co najmniej 3 znaków."),
            salary: number().required("Wpisz poprawną kwotę wynagrodzenia.").min(1, "Wysykość wynagrodzenia nie może być mniejsza niż zero."),
          })}
        >
          {({ errors, isValid, touched }) => (
            <Form>
              <Field
                name="companyName"
                type="text"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Nazwa firmy"
                fullWidth
                error={Boolean(errors.companyName) && Boolean(touched.companyName)}
                helperText={Boolean(touched.companyName) && errors.companyName}
              />
              <Box height={16} />
              <Field
                name="positionName"
                type="text"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Nazwa stanowiska"
                fullWidth
                error={Boolean(errors.positionName) && Boolean(touched.positionName)}
                helperText={Boolean(touched.positionName) && errors.positionName}
              />
              <Box height={16} />
              <Autocomplete
                fullWidth
                onChange={handleAddTechnology}
                disablePortal
                options={data!.technologies}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.name}
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
                name="salary"
                type="number"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Wynagrodzenie"
                fullWidth
                error={Boolean(errors.salary) && Boolean(touched.salary)}
                helperText={Boolean(touched.salary) && errors.salary}
              />
              <Box height={16} />
              <Button type="submit" variant="contained" color="primary" size="large" disabled={!isValid || mutationLoading}>
                Zapisz zmiany
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default EditOffer;
