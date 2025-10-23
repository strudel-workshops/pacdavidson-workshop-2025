import { Box, Paper, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FilterContext } from '../../components/FilterContext';
import { PageHeader } from '../../components/PageHeader';
import { DataView } from './-components/DataView';
import { DataViewHeader } from './-components/DataViewHeader';
import { FiltersPanel } from './-components/FiltersPanel';
import { PreviewPanel } from './-components/PreviewPanel';
import { FilterConfig } from '../../types/filters.types';

export const Route = createFileRoute('/explore-data/')({
  component: DataExplorer,
});

// CUSTOMIZE: the filter definitions
const filterConfigs: FilterConfig[] = [
  {
    field: 'identities',
    label: 'Identities',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 500,
    },
  },
  {
    field: 'coverage',
    label: 'Coverage',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 500,
    },
  },
  {
    field: 'positives',
    label: 'Positives',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 500,
    },
  },
  {
    field: 'score',
    label: 'Score',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 1000,
    },
  },
  {
    field: 'evalue',
    label: 'E-value',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 1,
      step: 0.0001,
    },
  },
  {
    field: 'isPrimary',
    label: 'Is Primary',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
];

/**
 * Main explorer page in the explore-data Task Flow.
 * This page includes the page header, filters panel,
 * main table, and the table row preview panel.
 */
function DataExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewItem, setPreviewItem] = useState<any>();
  const [showFiltersPanel, setShowFiltersPanel] = useState(true);

  const handleCloseFilters = () => {
    setShowFiltersPanel(false);
  };

  const handleToggleFilters = () => {
    setShowFiltersPanel(!showFiltersPanel);
  };

  const handleClosePreview = () => {
    setPreviewItem(null);
  };

  return (
    <FilterContext>
      <Box>
        <PageHeader
          // CUSTOMIZE: the page title
          pageTitle="Explore Homologs"
          // CUSTOMIZE: the page description
          description="Browse and analyze transcript homolog data from Phytozome"
          sx={{
            marginBottom: 1,
            padding: 2,
          }}
        />
        <Box>
          <Stack direction="row">
            {showFiltersPanel && (
              <Box
                sx={{
                  width: '350px',
                }}
              >
                <FiltersPanel
                  filterConfigs={filterConfigs}
                  onClose={handleCloseFilters}
                />
              </Box>
            )}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minHeight: '600px',
                minWidth: 0,
              }}
            >
              <DataViewHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onToggleFiltersPanel={handleToggleFilters}
              />
              <DataView
                filterConfigs={filterConfigs}
                searchTerm={searchTerm}
                setPreviewItem={setPreviewItem}
              />
            </Paper>
            {previewItem && (
              <Box
                sx={{
                  minWidth: '400px',
                }}
              >
                <PreviewPanel
                  previewItem={previewItem}
                  onClose={handleClosePreview}
                />
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </FilterContext>
  );
}
