import React, { useState } from "react";

import hplogo from "../../assets/images/image (4).png";
import acer from "../../assets/images/image (5).png";
import dell from "../../assets/images/image (6).png";
import lenovo from "../../assets/images/image (7).png";
import apple from "../../assets/images/image (8).png";
import product from "../../assets/images/product.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductDetails from "../Dialog/ProductDetails";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useProductManagement from "../../hooks/product/useProductManagement";

const columns = [
  // { id: "brandName", label: "Brand Logo" },
  { id: "brandName", label: "Brand Name" },
  { id: "ratings", label: "Ratings" },
  { id: "price", label: "Price" },
  { id: "action", label: "View Discription" },
];

const InventoryDialog = ({ openDialog, handleCloseDialog, onClose, data }) => {
  // console.log("data", data);
  const { fetchProductById, productById } = useProductManagement();
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEditEvent = (id) => {
    console.log("id", id);
    fetchProductById(id);
    setSelectedId(id);
    setEditing(true);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: 0,
              position: "relative",
            }}
          >
            <div className="">
              <i
                className="fa fa-angle-left cursor-pointer"
                onClick={onClose}
              ></i>
            </div>

            <div style={{ width: "40%", paddingRight: 16, display: "flex" }}>
              <CardMedia
                component="img"
                alt="Product Image"
                height="250"
                image={product}
                sx={{
                  width: "70%",
                  height: "70%",
                  marginTop: "35px",
                  marginLeft: "-13px",
                }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "right",
                  justifyContent: "space-around",
                  flexWrap: "nowrap",
                }}
              >
                <Typography
                  variant="body1"
                  color="textDark"
                  sx={{ fontSize: 18, marginRight: 2, whiteSpace: "nowrap" }}
                >
                  {data?.productName}
                </Typography>
                <Typography
                  variant="body1"
                  color="textDark"
                  sx={{ fontSize: 18, marginRight: 2, whiteSpace: "nowrap" }}
                >
                  {data?.companyName}
                </Typography>
                <Typography
                  variant="body1"
                  color="textDark"
                  sx={{ fontSize: 18, whiteSpace: "nowrap" }}
                >
                  {data?.companyPrice + ` ₹`}
                </Typography>
              </CardContent>
            </div>

            <div style={{ width: "60%" }}>
              <CardContent>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body2" color="textSecondary">
                  {data?.productDescription}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#56AAC5",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontFamily: "Lexend",
                      marginTop: "10px",
                      marginBottom: "-10px",
                      width: "175px",
                    }}
                    onClick={() => handleEditEvent(data?._id)}
                  >
                    View Details
                  </Button>
                  {editing && selectedId === data._id && (
                    <ProductDetails
                      data={productById}
                      openViewDetails={editing}
                      onClose={() => {
                        setSelectedId(null);
                        setEditing(false);
                      }}
                    />
                  )}
                </Typography>
              </CardContent>
            </div>
          </Card>

          <Typography
            variant="h6"
            sx={{ mt: 3, color: "#000", fontWeight: 600 }}
          >
            Products Available in Brands
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.sameProductInOtherBrands?.map((row, index) => (
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{row.brandName}</TableCell>
                  <TableCell align="center">
                    <Rating
                      value={row.ratings}
                      readOnly
                      precision={0.5}
                      sx={{ color: "#FFF503" }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.price + ` ₹`}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#56AAC5",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "10px",
                        fontFamily: "Lexend",
                      }}
                      className="p-2 text-white rounded-full hover:bg-blue-600"
                      disabled
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryDialog;
