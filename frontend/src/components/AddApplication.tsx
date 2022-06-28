import { Alert, Autocomplete, Box, Button, Container, TextField, Tooltip, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { GET_APPLICATIONS, GET_TECHNOLOGIES } from "../queries/queries";
import { SyntheticEvent, useState } from "react";
import { number, object, string } from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import { ADD_APPLICATION } from "../mutations/mutations";
import { ITechnology } from "../interfaces/technology";
import Loader from "./UI/Loader";
import Subheader from "./UI/Subheader";
import _ from "lodash";

const initialValue = {
  name: "",
  salary: "",
  email: "",
};

const AddApplication = () => {
  const { id } = useParams();
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const { loading, error, data } = useQuery<{ technologies: ITechnology[] }>(GET_TECHNOLOGIES);
  const [addApplication, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_APPLICATION, { refetchQueries: [{ query: GET_APPLICATIONS, variables: { offer: id } }] });
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
        <Subheader>Dodawanie aplikacji</Subheader>
        <Formik
          initialValues={initialValue}
          onSubmit={async (values, formikHelpers) => {
            await addApplication({ variables: { offer: id, ...values, technologies: technologies.map((technology) => technology.id) } });
            navigate(`/offers`);
          }}
          validationSchema={object({
            name: string().required("Wpisz poprawne imię i nazwisko.").min(5, "Imię i nazwisko musi składać się z co najmniej 5 znaków."),
            salary: number().required("Wpisz poprawną kwotę wynagrodzenia.").min(1, "Wysokość wynagrodzenia nie może być mniejsza niż zero."),
            email: string().email().required("Wpisz poprawny adres e-mail."),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <Field
                as={TextField}
                color="primary"
                error={Boolean(errors.name) && Boolean(touched.name)}
                fullWidth
                helperText={Boolean(touched.name) && errors.name}
                label="Imię i nazwisko"
                name="name"
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
                        <Box onClick={() => handleDeleteTechnology(technology)} bgcolor="primary.main" color="white" py="5px" px="10px" sx={{ cursor: "pointer" }}>
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
              <Field
                as={TextField}
                color="primary"
                error={Boolean(errors.email) && Boolean(touched.email)}
                fullWidth
                helperText={Boolean(touched.email) && errors.email}
                label="E-mail"
                name="email"
                type="email"
                variant="outlined"
              />
              <Box height={16} />
              <Button type="submit" variant="contained" color="primary" size="large" disabled={!dirty || !isValid || mutationLoading}>
                Dodaj aplikację
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddApplication;
