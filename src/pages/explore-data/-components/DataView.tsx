import { Alert, Box, LinearProgress, Skeleton } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';
// import React, { useState, useMemo } from 'react';
import React, { useState } from 'react';
import { useFilters } from '../../../components/FilterContext';
import { SciDataGrid } from '../../../components/SciDataGrid';
import { filterData } from '../../../utils/filters.utils';
import { useListQuery } from '../../../hooks/useListQuery';
import { FilterConfig } from '../../../types/filters.types';

// Full list of organism IDs from the Phytozome API
// const ALL_ORG_IDS = [586,955,790,924,791,925,472,459,291,727,728,449,321,783,784,322,264,765,384,447,167,530,886,498,548,782,679,278,502,720,337,343,364,379,336,369,356,333,372,381,359,355,349,549,353,328,362,331,361,378,460,537,346,344,515,345,376,367,354,370,329,348,358,374,380,357,363,352,334,365,338,366,339,375,351,342,330,368,347,377,350,373,335,326,360,340,371,341,332,327,283,314,556,693,463,577,813,316,721,490,710,446,277,711,712,709,715,708,714,795,481,805,810,803,811,802,809,806,807,808,804,801,812,898,266,474,113,562,561,588,573,673,733,729,732,731,470,539,538,676,706,705,854,855,690,392,707,281,461,492,531,182,154,484,585,227,871,453,973,971,974,975,835,834,858,859,507,488,122,861,388,482,504,550,723,489,582,325,788,789,560,487,828,827,297,891,892,483,173,501,677,701,675,868,869,678,510,724,275,508,880,509,526,529,698,570,695,697,569,568,458,527,578,798,799,524,221,525,494,702,462,589,768,769,485,475,587,382,699,309,467,718,719,478,689,200,767,766,571,476,567,477,491,305,520,671,320,944,285,228,229,506,553,505,551,256,800,797,948,836,887,822,860,497,304,471,583,856,857,946,945,825,826,566,451,386,499,323,231,496,591,308,495,590,960,450,516,772,773,774,775,776,777,778,779,672,680,580,581,703,563,696,670,534,442,318,870,894,982,565,445,688,717,716,532,210,444,533,456,692,298,687,119,473,771,518,289,519,780,574,91,312,311,500,726,480,584,903,390,514,691,796,448,686,564,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,468,552,694,454,730,781,310,522,521,575,290,486,961,233,523,503,770,479,873,875,876,872,877,878,879,572,385,865,725,296,853,881,882,669,700,824,545,544,541,558,543,469,540,559,457,317,839,838,837,681,682,683,443,513,684,512,685,493,833,324,668];

/**
 * Randomly select a subset of items from an array
 */
// function getRandomSubset<T>(array: T[], count: number): T[] {
//   const shuffled = [...array].sort(() => Math.random() - 0.5);
//   return shuffled.slice(0, count);
// }

interface DataViewProps {
  filterConfigs: FilterConfig[];
  searchTerm: string;
  setPreviewItem: React.Dispatch<React.SetStateAction<any>>;
}
/**
 * Query the data rows and render as an interactive table
 */
export const DataView: React.FC<DataViewProps> = ({
  filterConfigs,
  searchTerm,
  setPreviewItem,
}) => {
  const { activeFilters } = useFilters();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [offset, setOffest] = useState(page * pageSize);

  // CUSTOMIZE: the unique ID field for the data source
  const dataIdField = '_id';
  // CUSTOMIZE: query mode, 'client' or 'server'
  const queryMode = 'client';
  const { isPending, isFetching, isError, data, error } = useListQuery({
    activeFilters,
    // CUSTOMIZE: the table data source
    dataSource: 'data/homologs_sample.json',
    filterConfigs,
    offset,
    page,
    pageSize,
    queryMode,
    staticParams: null,
  });

  const handleRowClick = (rowData: any) => {
    setPreviewItem(rowData.row);
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    // Reset page to first when the page size changes
    const newPage = model.pageSize !== pageSize ? 0 : model.page;
    const newPageSize = model.pageSize;
    const newOffset = newPage * newPageSize;
    setPage(newPage);
    setPageSize(newPageSize);
    setOffest(newOffset);
  };

  // Show a loading skeleton while the initial query is pending
  if (isPending) {
    const emptyRows = new Array(pageSize).fill(null);
    const indexedRows = emptyRows.map((row, i) => i);
    return (
      <Box
        sx={{
          padding: 2,
        }}
      >
        {indexedRows.map((row) => (
          <Skeleton key={row} height={50} />
        ))}
      </Box>
    );
  }

  // Show an error message if the query fails
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  // Show the data when the query completes
  return (
    <>
      {isFetching && <LinearProgress variant="indeterminate" />}
      <SciDataGrid
        rows={filterData(data, activeFilters, filterConfigs, searchTerm)}
        pagination
        paginationMode={queryMode}
        onPaginationModelChange={handlePaginationModelChange}
        getRowId={(row) => row[dataIdField]}
        // CUSTOMIZE: the table columns
        columns={[
          {
            field: '_id',
            headerName: 'ID',
            width: 200,
          },
          {
            field: 'queryTranscriptName',
            headerName: 'Query Transcript',
            width: 180,
          },
          {
            field: 'queryLocusName',
            headerName: 'Query Locus',
            width: 180,
          },
          {
            field: 'queryIdentifier',
            headerName: 'Query ID',
            width: 120,
          },
          {
            field: 'hitTranscriptName',
            headerName: 'Hit Transcript',
            width: 180,
          },
          {
            field: 'hitLocusName',
            headerName: 'Hit Locus',
            width: 180,
          },
          {
            field: 'hitIdentifier',
            headerName: 'Hit ID',
            width: 120,
          },
          {
            field: 'hitDefline',
            headerName: 'Hit Description',
            width: 300,
          },
          {
            field: 'hitProteome',
            headerName: 'Hit Proteome',
            width: 130,
          },
          {
            field: 'toProt',
            headerName: 'To Prot',
            width: 100,
          },
          {
            field: 'identities',
            headerName: 'Identities',
            type: 'number',
            width: 120,
          },
          {
            field: 'coverage',
            headerName: 'Coverage',
            type: 'number',
            width: 120,
          },
          {
            field: 'positives',
            headerName: 'Positives',
            type: 'number',
            width: 120,
          },
          {
            field: 'score',
            headerName: 'Score',
            type: 'number',
            width: 100,
          },
          {
            field: 'evalue',
            headerName: 'E-value',
            type: 'number',
            width: 120,
          },
          {
            field: 'isPrimary',
            headerName: 'Is Primary',
            type: 'number',
            width: 120,
          },
          {
            field: 'intQueryIdentifier',
            headerName: 'Int Query ID',
            type: 'number',
            width: 140,
          },
          {
            field: 'intHitIdentifier',
            headerName: 'Int Hit ID',
            type: 'number',
            width: 140,
          },
          {
            field: 'insertString',
            headerName: 'Insert String',
            width: 150,
          },
        ]}
        disableColumnSelector
        autoHeight
        initialState={{
          pagination: { paginationModel: { page, pageSize } },
        }}
        onRowClick={handleRowClick}
      />
    </>
  );
};
