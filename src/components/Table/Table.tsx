import {
  Box,
  IconButton,
  Paper,
  TableContainer,
  Toolbar,
  Tooltip,
  Typography,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  TableBody,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
export interface ColumnsValue<T> {
  /**
   * Title of displayed column heading.
   */
  title: string;
  /**
   * "key" prop makes sorting options possible and provides unique value.
   */
  key: string;
  /**
   * Used to refer to certain key value from "data" array of objects and based on that column's row values are being rendered.
   */
  render: (row: T) => React.ReactNode;
  /**
   * Column receives "ascending", "descending" sort option.
   */
  sortable: boolean;
}
export interface TableProps<T> {
  /**
   * Provide "isLoading" prop to prevent user from taking any actions.
   */
  isLoading: boolean;
  /**
   * Each row will render its own "checkbox". If true then renderSelectedItemsOptions function is required.
   */
  isSelectable: boolean;
  /**
   * Use this prop to add your own filters (such as search input).
   * 
   * @example 
   *  filter={
          <div style={{ marginRight: "1rem" }}>
            <TextField
              placeholder="search..."
              defaultValue={search || ""}
              onChange={(e) => onChangeSearch(e.target.value)}
              size="small"
            />
          </div>
        }
   */
  filter: React.ReactNode;
  tableName: string;
  /**
   * Data based on which the column's row values are rendered.
   */
  data: Array<T>;
  /**
   * Based on "columns" prop, column headings are being rendered. 
   * 
   * @example 
   *  columns={[
          {
            title: t("tableHeadings.name"),
            key: "name",
            render: (row) => row.name,
            sortable: true,
          },...
   */
  columns: ColumnsValue<T>[];
  /**
   * Pass the "pagination" props to properly display information on the pagination bar.
   */
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
  /**
   * Pass the "sort" props to properly display sorting arrow icon.
   */
  sort: {
    sortBy: string;
    sortDirection: "asc" | "desc";
  };
  /**
   * Pass a function that takes number as an argument. The Previous button passes number: (-1) to the function, and the Next button passes number: (1) to the function. Based on that create a logic that will update the current page.
   * 
   * @example 
   * Function that triggers the update: 
   * 
   *  const changePageHandler = (page: number) => {
    dispatch(patientsActions.changePage(page));
  };
   * 
   * Function that updates the current page state:
   * 
   *  changePage: (state, { payload }: PayloadAction<number>) => {
      if (payload === 1) {
        state.currentPage++;
      }
      if (payload !== 1) {
        state.currentPage--;
      }
    },
   */
  onChangePage: (page: number) => void;
  /**
   * Pass a function that will change the number of visible rows per page.
   * 
   * @example
   * 
   * Function that triggers the update:
   * 
   * const changeRowsPerPageHandler = (rowsPerPage: number) => {
    dispatch(patientsActions.changeRowsPerPage(rowsPerPage));
  };

  Function that updates the rows per page state:

   changeRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload;
    },
   */
  onChangeRowsPerPage: (rowsPerPage: number) => void;
  /**
   * Pass a function that will change the sorting property. Sorting is based on provided to columns "key" prop.
   * 
   * @example 
   * 
   * Function that triggers the update:
   * 
   * const changeSortHandler = (sortingProperty: string) => {
    dispatch(patientsActions.changeSort(sortingProperty));
  };

  Sorting logic:

   changeAllPatientsSort: (state, { payload }: PayloadAction<string>) => {
      if (state.sortBy === payload) {
        state.sortDirection === "desc"
          ? (state.sortDirection = "asc")
          : (state.sortDirection = "desc");
      }
      if (state.sortBy !== payload) {
        state.sortBy = payload;
        state.sortDirection = "desc";
      }
    },
   */
  onChangeSort: (sortingProperty: string, sortingDirection: "asc" | "desc") => void;
  /**
   * If "isSelectable" is true, you can pass the render prop to the "renderSelectedItemsOptions" prop. This will allow you to programatically perform actions on selected items.
   * 
   * @example 
   * 
   *    renderSelectedItemsOptions={(selectedRows) => {
            return (
              <Tooltip title={t("patients:table.delete")}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            );
          }};
  };
   */
  renderSelectedItemsOptions?: (selectedRows: T[]) => React.ReactNode;
}

const Table = <T extends { _id: string }>({
  isLoading,
  isSelectable,
  tableName,
  data,
  columns,
  pagination,
  sort,
  filter,
  onChangePage,
  onChangeRowsPerPage,
  onChangeSort,
  renderSelectedItemsOptions,
}: TableProps<T>) => {
  const { t } = useTranslation();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<T[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterHandler = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  const selectAllHandler = () => {
    if (selectedCheckboxes.length === pagination.pageSize) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(data);
    }
  };

  const clickHandler = (e: React.ChangeEvent<HTMLInputElement>, selectedRow: T) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedCheckboxes((prevState) => [...prevState, selectedRow]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== selectedRow));
    }
  };
  return (
    <Box width="100%" position="relative">
      {isLoading && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,0.7)",
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Paper sx={{ boxShadow: "5", width: "100%", mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          {selectedCheckboxes.length > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {`${selectedCheckboxes.length} ${t("patients:table.selected")}`}
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
              textTransform="capitalize"
              fontWeight={700}
            >
              {tableName}
            </Typography>
          )}
          {isFilterOpen && filter}
          {isFilterOpen ? (
            <Tooltip title={t("patients:table.closeFilters")}>
              <IconButton onClick={filterHandler}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t("patients:table.openFilters")}>
              <IconButton onClick={filterHandler}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          {selectedCheckboxes.length > 0 &&
            renderSelectedItemsOptions &&
            renderSelectedItemsOptions(selectedCheckboxes)}
        </Toolbar>
        <TableContainer sx={{ overflowX: "auto" }}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <>
                  {isSelectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onChange={selectAllHandler}
                        checked={
                          selectedCheckboxes.length > 0 &&
                          selectedCheckboxes.length === pagination.pageSize
                        }
                        indeterminate={
                          selectedCheckboxes.length > 0 &&
                          selectedCheckboxes.length < pagination.pageSize
                        }
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    return column.sortable ? (
                      <TableCell component="th" align="left" key={column.key}>
                        <TableSortLabel
                          active={sort.sortBy === column.key}
                          direction={sort.sortDirection === "asc" ? "desc" : "asc"}
                          onClick={() => {
                            onChangeSort(
                              column.key,
                              sort.sortBy !== column.key
                                ? "desc"
                                : sort.sortBy === column.key && sort.sortDirection === "desc"
                                ? "asc"
                                : "desc"
                            );
                          }}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {column.title}
                        </TableSortLabel>
                      </TableCell>
                    ) : (
                      <TableCell align="left" key={column.key} sx={{ textTransform: "capitalize" }}>
                        {column.title}
                      </TableCell>
                    );
                  })}
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow key={item._id} selected={selectedCheckboxes.includes(item)}>
                    <>
                      {isSelectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            onChange={(e) => clickHandler(e, item)}
                            checked={selectedCheckboxes.includes(item)}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => {
                        return (
                          <TableCell align="left" key={column.key} scope="row" padding="normal">
                            {column.render(item)}
                          </TableCell>
                        );
                      })}
                    </>
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          component="div"
          labelRowsPerPage={t("patients:table.rowsPerPage")}
          rowsPerPageOptions={[5, 10, 25]}
          count={pagination.totalItems}
          page={pagination.currentPage - 1}
          rowsPerPage={pagination.pageSize}
          backIconButtonProps={{
            title: t("patients:table.prevPageButton"),
          }}
          nextIconButtonProps={{
            title: t("patients:table.nextPageButton"),
          }}
          onPageChange={(_, page) => onChangePage(page + 1)}
          onRowsPerPageChange={(e) => onChangeRowsPerPage(+e.target.value)}
        />
      </Paper>
    </Box>
  );
};

export default Table;
