import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LabelValueTable } from '../../../components/LabelValueTable';
// import { DataGrid } from '@mui/x-data-grid';
import { AppLink } from '../../../components/AppLink';

/**
 * Placeholder columns for related data table
 */
// const relatedColumns = [
//   {
//     field: 'id',
//     headerName: 'ID',
//     width: 50,
//   },
//   {
//     field: 'attr1',
//     headerName: 'Attribute 1',
//     width: 100,
//   },
//   {
//     field: 'attr2',
//     headerName: 'Attribute 2',
//     width: 100,
//   },
//   {
//     field: 'attr3',
//     headerName: 'Attribute 3',
//     width: 100,
//   },
// ];

/**
 * Placeholder rows for related data table
 */
// const emptyRows = Array(25).fill(0);
// const relatedRows = emptyRows.map((d, i) => {
//   return { id: i, attr1: 'value', attr2: 'value', attr3: 'value' };
// });

interface PreviewPanelProps {
  /**
   * Data for the selected row from the main table
   */
  previewItem: any;
  /**
   * Function to handle hiding
   */
  onClose: () => void;
}

/**
 * Panel to show extra information about a row in a separate panel
 * next to the `<DataTablePanel>`.
 */
export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  previewItem,
  onClose,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        padding: 2,
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Stack direction="row">
            <Typography variant="h6" component="h3" flex={1}>
              <AppLink to="/explore-data/$id" params={{ id: previewItem._id }}>
                {previewItem.queryTranscriptName}
              </AppLink>
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2">{previewItem.hitDefline}</Typography>
        </Stack>
        <Box>
          <Typography fontWeight="medium" mb={1}>
            Query Information
          </Typography>
          <LabelValueTable
            rows={[
              {
                label: 'Query Transcript',
                value: previewItem.queryTranscriptName,
              },
              { label: 'Query Locus', value: previewItem.queryLocusName },
              { label: 'Query Identifier', value: previewItem.queryIdentifier },
            ]}
          />
        </Box>
        <Box>
          <Typography fontWeight="medium" mb={1}>
            Hit Information
          </Typography>
          <LabelValueTable
            rows={[
              { label: 'Hit Transcript', value: previewItem.hitTranscriptName },
              { label: 'Hit Locus', value: previewItem.hitLocusName },
              { label: 'Hit Identifier', value: previewItem.hitIdentifier },
              { label: 'Hit Proteome', value: previewItem.hitProteome },
            ]}
          />
        </Box>
        <Box>
          <Typography fontWeight="medium" mb={1}>
            Alignment Statistics
          </Typography>
          <LabelValueTable
            rows={[
              { label: 'Score', value: previewItem.score },
              { label: 'E-value', value: previewItem.evalue },
              { label: 'Identities', value: previewItem.identities },
              { label: 'Positives', value: previewItem.positives },
              { label: 'Coverage', value: previewItem.coverage },
              { label: 'Is Primary', value: previewItem.isPrimary },
            ]}
          />
        </Box>
        <Stack direction="row" spacing={1}>
          <AppLink to="/explore-data/$id" params={{ id: previewItem._id }}>
            <Button variant="contained">View details</Button>
          </AppLink>
        </Stack>
      </Stack>
    </Paper>
  );
};
