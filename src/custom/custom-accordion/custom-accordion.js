import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CustomAccordion = (props) => {
    const {accordionTitle,openPanel,accordionDetailData} = props
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div>
         <Accordion defaultExpanded onChange={handleChange(openPanel)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography >
           {accordionTitle}
          </Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          {accordionDetailData}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
