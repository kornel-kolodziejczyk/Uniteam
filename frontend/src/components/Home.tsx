import { Container, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Home = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" mt={7}>
      Cześć, zespole Uniteam!
    </Typography>
    <Typography variant="h5" pt={3} paragraph>
      Strona została stworzona na potrzeby aplikacji na stanowisko Junior Frontend Developera.
    </Typography>
    <Typography paragraph>
      Moim celem było odświeżenie swojej wiedzy na temat pracy w technologiach, których od jakiegoś czasu nie używałem oraz zaprezentowanie swoich aktualnych umiejętności. W praktycznym projekcie
      wykorzystałem bibliotekę<span className="bold"> Apollo Client</span> oraz <span className="bold">GraphQL</span> w połączeniu z <span className="bold">React.js</span>.
      <Typography paragraph>
        Do tworzenia i walidacji formularzy użyłem biblioteki <span className="bold">Formik</span>.
      </Typography>
      W projekcie wykorzystałem również <span className="bold">Typescript</span>, <span className="bold">Material-UI</span> oraz<span className="bold"> Lodash</span>. Backend napisałem przy użyciu
      Node.js oraz Express.js. Użyłem bazy danych MongoDB i biblioteki Mongoose.
    </Typography>
    <Typography variant="h6" mt={4}>
      Aplikacja umożliwia zarządzanie ofertami pracy i do jej podstawowych funkcjonalności można zaliczyć:
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleOutlineIcon color="primary" fontSize="large" />
        </ListItemIcon>
        <ListItemText>Dodawanie, usuwanie oraz edytowanie ofert pracy,</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleOutlineIcon color="primary" fontSize="large" />
        </ListItemIcon>
        <ListItemText>Dodawanie aplikacji do poszczególnych ofert pracy, edytowanie ich oraz usuwanie.</ListItemText>
      </ListItem>
    </List>
  </Container>
);

export default Home;
