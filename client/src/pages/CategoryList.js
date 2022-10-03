import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/slices/category/categorySlice";
import { toast } from "react-toastify";
import DateFormatter from "../config/DateFormatter";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const category = useSelector((state) => state.category);
  const { categoryList, appErr, loading } = category;

  return (
    <>
      {loading ? (
        <h2>...Loading</h2>
      ) : appErr ? (
        toast.error(appErr)
      ) : categoryList?.length <= 0 ? (
        <h2>No category found</h2>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">CreatedAt</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ display: "flex" }}
                  >
                    <img
                      src={row?.user?.profilePhoto}
                      alt="Author profile"
                      style={{
                        height: "55px",
                        width: "55px",
                        borderRadius: "2cm",
                      }}
                    />
                    <p style={{ marginLeft: "25px", paddingTop: "15px" }}>
                      {`${row?.user?.firstName} ${row?.user?.lastName} `} <br />
                      {row?.user?.email}
                    </p>
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">
                    {<DateFormatter date={row.createdAt} />}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/update-category/${row._id}`}>
                      <CreateOutlinedIcon style={{ color: "blue" }} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
