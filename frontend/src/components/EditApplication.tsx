import { Alert, Autocomplete, Box, Button, Container, TextField, Tooltip, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { SyntheticEvent, useState } from "react";
import { number, object, string } from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { EDIT_APPLICATION } from "../mutations/mutations";
import { GET_TECHNOLOGIES } from "../queries/queries";
import { IApplication } from "../interfaces/application";
import { ITechnology } from "../interfaces/technology";
import Loader from "./UI/Loader";
import Subheader from "./UI/Subheader";
import _ from "lodash";

const EditApplication = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ technologies: ITechnology[] }>(GET_TECHNOLOGIES);
  const { application } = useLocation().state as { application: IApplication };
  const initialValue = { name: application.name, salary: application.salary, email: application.email };

  const [editApplication, { loading: mutationLoading, error: mutationError }] = useMutation(EDIT_APPLICATION);
  const [technologies, setTechnologies] = useState<ITechnology[]>(application.technologies);
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
          onSubmit={async (values, formikHelpers) => {
            await editApplication({ variables: { id: application.id, ...values, technologies: technologies.map((technology) => technology.id) } });
            navigate(`/offers/${id}/applications`);
          }}
          validationSchema={object({
            name: string().required("Wpisz poprawne imię i nazwisko.").min(5, "Imię i nazwisko musi składać się z co najmniej 5 znaków."),
            salary: number().required("Wpisz poprawną kwotę wynagrodzenia.").min(1, "Wysokość wynagrodzenia nie może być mniejsza niż zero."),
            email: string().email().required("Wpisz poprawny adres e-mail."),
          })}
        >
          {({ errors, isValid, touched }) => (
            <Form>
              <Field
                name="name"
                type="text"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Imię i nazwisko"
                fullWidth
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(touched.name) && errors.name}
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
              <Field
                name="email"
                type="email"
                as={TextField}
                variant="outlined"
                color="primary"
                label="E-mail"
                fullWidth
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
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

export default EditApplication;
