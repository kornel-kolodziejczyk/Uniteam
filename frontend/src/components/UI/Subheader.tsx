import { FC, ReactNode } from "react";

import { Typography } from "@mui/material";

interface Props {
  children: ReactNode;
}
const Subheader: FC<Props> = ({ children }) => <Typography variant="h4" mb={3}>{children}</Typography>;

export default Subheader;
