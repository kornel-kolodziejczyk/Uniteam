import { Box, Typography } from "@mui/material";

import Container from "@mui/material/Container";

const Footer = () => (
  <Box bgcolor="primary.main">
    <Container maxWidth="lg">
      <Typography color="#fff" fontSize={["14px", "18px"]} align="center" p="20px" variant="h4">
        Copyright © 2022 Kornel Kołodziejczyk
      </Typography>
    </Container>
  </Box>
);

export default Footer;
