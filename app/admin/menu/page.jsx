import MiniAdminSidebar from "../components/MiniAdminSidebar";
import MenuTableTabs from "../components/MenuTableTabs";

const getAllProducts = async () => {
  const res = await fetch(`http://localhost:3000/api/admin/menu/product`);

  const data = await res.json();

  const { results } = data;

  const products = results[0];

  return products;
};

const getAllCategories = async () => {
  const res = await fetch(`http://localhost:3000/api/admin/menu/categories`);

  const data = await res.json();

  const { results } = data;

  const categories = results[0];

  const ctg = categories.map((category) => {
    let cakeType;
    {
      categories.isSpecial == 0
        ? (cakeType = "Common Cake")
        : (cakeType = "Special Cake");
    }

    return { ...category, cakeType };
  });

  return ctg;
};

const AdminMenu = async () => {
  const productList = await getAllProducts();
  const categoryList = await getAllCategories();

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <MenuTableTabs productList={productList} categoryList={categoryList} />
    </div>
  );
};

export default AdminMenu;

// const categoryArray = [
//   {
//     id: "1",
//     value: "Classic Human Cake",
//   },
//   {
//     id: "2",
//     value: "Money Cake",
//   },
//   {
//     id: "3",
//     value: "Tiered Cake",
//   },
//   {
//     id: "4",
//     value: "Chocoload Cake",
//   },
//   {
//     id: "5",
//     value: "Cupcake",
//   },
// ];

// const router = useRouter();
// const currentDateAndTime = dayjs().format("MM/D/YYYY-H:mm:ss");

// const [file, setFile] = useState();
// const [image, setImage] = useState("");

// const [cakeTypes, setCakeTypes] = useState([]);
// const [cakeType, setCakeType] = useState("");
// const [category, setCategory] = useState("");
// const [categories, setCategories] = useState(false);
// const [categoryList, setCategoryList] = useState(false);
// const [products, setProducts] = useState([]);
// const [product, setProduct] = useState({
//   categoryId: 0,
//   categoryName: "",
//   image: "",
//   isSpecial: 0,
//   menuId: 0,
//   price: 0,
//   productId: 0,
//   productName: "",
//   rating: 0,
// });
// const [newProduct, setNewProduct] = useState({
//   categoryId: 0,
//   image: "",
//   price: 0,
//   productName: "",
// });
// const [editOpen, setEditOpen] = useState(false);
// const [addProductOpen, setAddProductOpen] = useState(false);

// const [removeOpen, setRemoveOpen] = useState(false);
// const [relaunchOpen, setRelaunchOpen] = useState(false);

// const [productId, setProductId] = useState(false);

// // category getter
// const getAllProducts = async () => {
//   const res = await fetch(`http://localhost:3000/api/admin/menu/product`);
//   const data = await res.json();
//   const { results } = data;

//   const prod = results[0];

//   setProducts(prod);
// };

// const getAllCakeTypes = async () => {
//   const res = await fetch(`http://localhost:3000/api/admin/menu/cake-types`);
//   const data = await res.json();
//   const { results } = data;

//   const prod = results[0];

//   setCakeTypes(prod);
// };

// const getAllCategories = async () => {
//   const res = await fetch(`http://localhost:3000/api/admin/menu/categories`);
//   const data = await res.json();
//   const { results } = data;

//   const prod = results[0];

//   setCategories(prod);
// };

// const filterCategories = async (value) => {
//   const filteredCategories = categories.filter((ctg) => ctg.menuId == value);

//   setCategoryList(filteredCategories);
// };

// const uploadImage = async (e) => {
//   e.preventDefault();
//   if (!file) return;

//   const imageName = `/products/${currentDateAndTime}-${file.name}`;

//   setFile((prevState) => ({
//     ...prevState,
//     name: imageName,
//   }));

//   try {
//     const data = new FormData();
//     data.set("file", file);

//     const res = await fetch("/api/upload/products", {
//       method: "POST",
//       body: data,
//     });
//     const results = await res.json();

//     setNewProduct((prevState) => ({
//       ...prevState,
//       image: results,
//     }));

//     setImage(results);
//     if (!res.ok) throw new Error(await res.text());
//   } catch (e) {
//     console.error(e);
//   }
// };

// // handle event from front end
// const openEdit = () => {
//   setEditOpen(true);
// };

// const closeEdit = () => {
//   setEditOpen(false);
// };

// const openAddProduct = () => {
//   setAddProductOpen(true);
// };

// const closeAddProduct = () => {
//   setAddProductOpen(false);
// };

// const openRemove = (id) => {
//   setProductId(id);

//   setRemoveOpen(true);
// };

// const closeRemove = () => {
//   setRemoveOpen(false);
// };

// const openRelaunch = (id) => {
//   setProductId(id);

//   setRelaunchOpen(true);
// };

// const closeRelaunch = () => {
//   setRelaunchOpen(false);
// };

// const addProduct = async () => {
//   const postData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       categoryId: newProduct.categoryId,
//       productName: newProduct.productName,
//       price: newProduct.price,
//       rating: 0,
//       image: `/products/${newProduct.image}`,
//       isRemoved: 0,
//     }),
//   };

//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/admin/menu/product`,
//       postData
//     );
//     const response = await res.json();
//   } catch (error) {
//     console.log(error);
//   }
//   closeAddProduct();
//   getAllProducts();
// };

// // update function
// const editProduct = async () => {
//   const postData = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       productName: product.productName,
//       categoryId: product.categoryId,
//       image: product.image,
//       price: product.price,
//     }),
//   };

//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/admin/menu/product?` +
//         new URLSearchParams({
//           productId: product.productId,
//         }),
//       postData
//     );
//     const response = await res.json();
//   } catch (error) {
//     console.log(error);
//   }
//   closeEdit();
//   getAllProducts();
// };

// const removeProduct = async (id) => {
//   const postData = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       isRemoved: 1,
//     }),
//   };
//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/admin/menu/product/${id}`,
//       postData
//     );
//     const response = await res.json();
//   } catch (error) {
//     console.log(error);
//   }
//   getAllProducts();
//   closeRemove();
// };

// const relaunchProduct = async (id) => {
//   const postData = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       isRemoved: 0,
//     }),
//   };
//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/admin/menu/product/${id}`,
//       postData
//     );
//     const response = await res.json();
//   } catch (error) {
//     console.log(error);
//   }
//   getAllProducts();
//   closeRelaunch();
// };

// // getter of id from database
// const handleEdit = async (id) => {
//   const res = await fetch(
//     `http://localhost:3000/api/customer/menu/product/${id}`
//   );
//   const data = await res.json();
//   const { results } = data;

//   setProduct(results);
//   openEdit(results);
// };

// useEffect(() => {
//   getAllProducts();
//   getAllCakeTypes();
//   getAllCategories();
// }, []);

// return (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       marginTop: "88px",
//     }}
//   >
//     <MiniAdminSidebar />
//     <Box sx={{ margin: "20px", border: "1px solid white" }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           rowGap: 6,
//           marginTop: "15px",
//           marginBottom: "2rem",
//         }}
//       >
//         <Box>
//           <InputLabel className="font-semilight mb-1">Search</InputLabel>
//           <TextField
//             className="drop-shadow-lg"
//             sx={{
//               borderRadius: 3,
//               backgroundColor: "white",
//               marginRight: "0.75rem",
//               paddingLeft: "20px",
//               paddingTop: "10px",
//               paddingRight: "10px",
//               paddingBottom: "10px",
//             }}
//             InputProps={{ disableUnderline: true }}
//             name="search"
//             placeholder="Enter cake name"
//             type="text"
//             variant="standard"
//           />
//         </Box>
//         <Box>
//           <InputLabel className="font-semilight mb-1">Category</InputLabel>
//           <TextField
//             className="drop-shadow-lg"
//             sx={{
//               borderRadius: 3,
//               backgroundColor: "white",
//               paddingLeft: "20px",
//               paddingTop: "10px",
//               paddingRight: "10px",
//               paddingBottom: "10px",
//               color: "gray",
//             }}
//             InputProps={{ disableUnderline: true }}
//             name="category"
//             type="text"
//             defaultValue={"All"}
//             select
//             variant="standard"
//           >
//             {categoryArray.map((option) => (
//               <MenuItem
//                 key={option.id}
//                 value={option.value}
//                 className="text-sm text-gray-400 drop-shadow-md"
//               >
//                 {option.value}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>
//         {/*  // primary=#FDF9F9
// // secondary=#EE7376 hover=#ea5054
// // tertiary=#7C5F35
//           */}
//         <Box
//           sx={{
//             marginLeft: "auto",
//             marginRight: "8%",
//             marginTop: "auto",
//             marginBottom: "auto",
//           }}
//         >
//           <Box
//             component="button"
//             className="font-mono transform transition-all hover:scale-110 duration-1000"
//             sx={{
//               display: "flex",
//               paddingLeft: "18px",
//               paddingRight: "18px",
//               paddingTop: "10px",
//               paddingBottom: "10px",
//               borderRadius: "15px",
//               justifyContent: "end",
//               bgcolor: "#7C5F35",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "#a57f47",
//               },
//             }}
//             onClick={() => openAddProduct()}
//           >
//             Add Product
//           </Box>
//         </Box>
//       </Box>

//       <Grid container spacing={1}>
//         {products.map((prod) => (
//           <Grid item lg={4} md={6} xs={12} key={prod.productId}>
//             <Card
//               className="transform transition-all hover:scale-110 duration-1000 hover:bg-slate-50"
//               sx={{
//                 minWidth: 280,
//                 maxWidth: 320,
//                 paddingTop: "30px",
//                 margin: "20px",
//                 borderRadius: "25px",
//               }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="194"
//                   image={prod.image}
//                   alt="Paella dish"
//                 />
//                 <CardContent sx={{ textAlign: "start" }}>
//                   <Typography
//                     variant="h5"
//                     component="div"
//                     sx={{
//                       fontWeight: "bold",
//                       fontSize: "8px",
//                     }}
//                   >
//                     {prod.categoryName}
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     component="div"
//                     sx={{
//                       fontWeight: "bold",
//                       fontSize: "25px",
//                     }}
//                   >
//                     {prod.productName}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: "bold",
//                       fontSize: "20px",
//                     }}
//                   >
//                     ₱ {prod.price}
//                   </Typography>
//                   <Rating
//                     sx={{ alignContent: "center" }}
//                     name="customized-color"
//                     defaultValue={prod.rating || 0}
//                     readOnly
//                     precision={0.5}
//                     icon={<FavoriteIcon fontSize="inherit" color="error" />}
//                     emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
//                   />
//                 </CardContent>
//               </CardActionArea>
//               <CardActions sx={{ backgroundColor: "#7C5F35" }}>
//                 <Button
//                   sx={{
//                     marginLeft: "auto",
//                     width: "6rem",
//                     backgroundColor: "#7C5F35",
//                     color: "white",
//                     fontWeight: "bold",
//                     fontFamily: "Aileron Regular",
//                     padding: "6px",
//                     borderRadius: "9999px",
//                     "&:hover": {
//                       backgroundColor: "#977441",
//                       transitionDuration: "0.8s",
//                       boxShadow: "3",
//                     },
//                   }}
//                   onClick={() => handleEdit(prod.productId)}
//                 >
//                   Edit
//                 </Button>
//                 {!prod.isRemoved ? (
//                   <Button
//                     sx={{
//                       marginLeft: "auto",
//                       width: "6rem",
//                       backgroundColor: "#7C5F35",
//                       color: "white",
//                       fontWeight: "bold",
//                       fontFamily: "Aileron Regular",
//                       padding: "6px",
//                       borderRadius: "9999px",
//                       "&:hover": {
//                         backgroundColor: "#977441",
//                         transitionDuration: "0.8s",
//                         boxShadow: "3",
//                       },
//                     }}
//                     onClick={() => openRemove(prod.productId)}
//                   >
//                     Remove
//                   </Button>
//                 ) : (
//                   <Button
//                     sx={{
//                       marginLeft: "auto",
//                       width: "6rem",
//                       backgroundColor: "#7C5F35",
//                       color: "white",
//                       fontWeight: "bold",
//                       fontFamily: "Aileron Regular",
//                       padding: "6px",
//                       borderRadius: "9999px",
//                       "&:hover": {
//                         backgroundColor: "#977441",
//                         transitionDuration: "0.8s",
//                         boxShadow: "3",
//                       },
//                     }}
//                     onClick={() => openRelaunch(prod.productId)}
//                   >
//                     Relaunch
//                   </Button>
//                 )}
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* add product area*/}
//       <Dialog
//         open={addProductOpen}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={closeAddProduct}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             color: "white",
//             bgcolor: "#EE7376",
//           }}
//         >
//           <DialogTitle className="font-extrabold text-2xl">
//             ADD PRODUCT
//           </DialogTitle>
//           <Box
//             component="button"
//             className="py-3 px-6 rounded-xl text-white font-semibold cursor-pointer duration-700"
//             onClick={() => closeAddProduct()}
//           >
//             <CloseIcon className="my-auto" sx={{ color: "white" }} />
//           </Box>
//         </Box>

//         <DialogContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               height: "fit-content",
//             }}
//           >
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Product Name
//             </InputLabel>
//             <TextField
//               className="mr-1"
//               value={newProduct.productName}
//               margin="dense"
//               name="productName"
//               type="text"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setNewProduct((prevState) => ({
//                   ...prevState,
//                   [name]: value,
//                 }));
//               }}
//             />
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Cake Type
//             </InputLabel>
//             <TextField
//               className="mr-1"
//               value={cakeType}
//               defaultValue={""}
//               margin="dense"
//               name="cakeType"
//               type="text"
//               fullWidth
//               variant="outlined"
//               select
//               onChange={(e) => {
//                 const { value } = e.target;

//                 setCakeType(value);

//                 filterCategories(value);
//               }}
//             >
//               {cakeTypes.map((cakeType) => (
//                 <MenuItem
//                   key={cakeType.menuId}
//                   value={cakeType.menuId}
//                   className="text-xs text-gray-400"
//                 >
//                   {cakeType.menuName}
//                 </MenuItem>
//               ))}
//             </TextField>
//             {/* paul */}
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Category
//             </InputLabel>
//             {categoryList ? (
//               <TextField
//                 className="mr-1"
//                 value={newProduct.categoryId}
//                 margin="dense"
//                 name="categoryId"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 select
//                 onChange={(e) => {
//                   const { name, value } = e.target;
//                   // setCategory(value);\
//                   setNewProduct((prevState) => ({
//                     ...prevState,
//                     [name]: value,
//                   }));

//                   setNewProduct;

//                   // console.log(category);

//                   // console.log(value);
//                 }}
//               >
//                 {categoryList.map((ctg) => (
//                   <MenuItem
//                     key={ctg.categoryId}
//                     value={ctg.categoryId}
//                     className="text-xs text-gray-400"
//                   >
//                     {ctg.categoryName}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             ) : (
//               <TextField
//                 className="mr-1"
//                 value=""
//                 fullWidth
//                 variant="outlined"
//                 disabled
//               />
//             )}

//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Initial Price
//             </InputLabel>
//             <TextField
//               className="mr-1"
//               value={newProduct.price}
//               margin="dense"
//               name="price"
//               type="text"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setNewProduct((prevState) => ({
//                   ...prevState,
//                   [name]: value,
//                 }));
//               }}
//             />
//             {/* daniel */}
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Attach Image
//             </InputLabel>
//             <Box>
//               <Box sx={{ marginBottom: "10px" }}>
//                 <input
//                   type="file"
//                   name="file"
//                   onChange={(e) => setFile(e.target.files?.[0])}
//                 />
//                 {file && (
//                   <Box
//                     component="button"
//                     className="font-mono"
//                     sx={{
//                       bgcolor: "#7C5F35",
//                       color: "white",
//                       marginTop: "15px",

//                       padding: "10px",
//                       borderRadius: "15px",
//                       "&:hover": {
//                         bgcolor: "#8a6a3b",
//                       },
//                     }}
//                     onClick={uploadImage}
//                   >
//                     Upload
//                   </Box>
//                 )}
//               </Box>
//               <Box sx={{ border: "dashed 1px black", height: "fit-content" }}>
//                 {image && (
//                   <Box
//                     component="img"
//                     sx={{
//                       margin: "auto",
//                       marginTop: "15px",
//                       marginBottom: "15px",

//                       height: 233,
//                       width: 350,
//                       maxHeight: { xs: 233, md: 167 },
//                       maxWidth: { xs: 350, md: 250 },
//                     }}
//                     alt="The house from the offer."
//                     src={`/products/${image}`}
//                   />
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Box
//             component="button"
//             variant="contained"
//             sx={{
//               bgcolor: "#7C5F35",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "#8a6a3b",
//               },
//             }}
//             className="text-md-center font-extrabold py-3 px-6 rounded-xl duration-700 shadow-lg"
//             onClick={() => addProduct()}
//           >
//             Add Product
//           </Box>
//         </DialogActions>
//       </Dialog>

//       {/* edit */}
//       <Dialog
//         open={editOpen}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={closeEdit}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             color: "white",
//             bgcolor: "#EE7376",
//           }}
//         >
//           <DialogTitle className="font-extrabold text-2xl">
//             EDIT PRODUCT
//           </DialogTitle>
//           <Box
//             component="button"
//             className="py-3 px-6 rounded-xl text-white font-semibold cursor-pointer duration-700"
//             onClick={() => closeEdit()}
//           >
//             <CloseIcon className="my-auto" sx={{ color: "white" }} />
//           </Box>
//         </Box>

//         <DialogContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               height: "fit-content",
//             }}
//           >
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Product Name
//             </InputLabel>
//             <TextField
//               className="mr-1"
//               value={product.productName}
//               margin="dense"
//               name="productName"
//               type="text"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setProduct((prevState) => ({
//                   ...prevState,
//                   [name]: value,
//                 }));
//               }}
//             />
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Category
//             </InputLabel>
//             <TextField
//               className="mr-1"
//               value={product.categoryId}
//               margin="dense"
//               name="categoryId"
//               type="text"
//               fullWidth
//               variant="outlined"
//               select
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setProduct((prevState) => ({
//                   ...prevState,
//                   [name]: value,
//                 }));
//               }}
//             >
//               {categoryArray.map((ctg) => (
//                 <MenuItem
//                   key={ctg.id}
//                   value={ctg.id}
//                   className="text-xs text-gray-400"
//                 >
//                   {ctg.value}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Initial Price
//             </InputLabel>
//             <TextField
//               className="mr-1"
//               value={product.price}
//               margin="dense"
//               name="price"
//               type="text"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setProduct((prevState) => ({
//                   ...prevState,
//                   [name]: value,
//                 }));
//               }}
//             />
//             <InputLabel
//               htmlFor="productName"
//               className="w-3/6 text-lg font-bold font-sans text-slate-900"
//             >
//               Attach Image
//             </InputLabel>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Box
//             component="button"
//             variant="contained"
//             sx={{
//               bgcolor: "#7C5F35",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "#8a6a3b",
//               },
//             }}
//             className="text-md-center font-extrabold py-3 px-6 rounded-xl duration-700 shadow-lg"
//             onClick={() => editProduct()}
//           >
//             Save
//           </Box>
//         </DialogActions>
//       </Dialog>

//       {/* remove  */}
//       <Dialog
//         open={removeOpen}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={closeRemove}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <Box className="bg-slate-600 text-white">
//           <DialogTitle className="font-extrabold text-2xl">
//             CAUTION!
//           </DialogTitle>
//         </Box>
//         <DialogContent>
//           <DialogContentText
//             id="alert-dialog-slide-description"
//             className="font-semibold text-lg text-black"
//           >
//             Are you sure you want to remove this product on the menu?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
//             onClick={() => closeRemove()}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
//             onClick={() => removeProduct(productId)}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* relaunch */}
//       <Dialog
//         open={relaunchOpen}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={closeRelaunch}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <Box className="bg-slate-600 text-white">
//           <DialogTitle className="font-extrabold text-2xl">
//             CAUTION!
//           </DialogTitle>
//         </Box>
//         <DialogContent>
//           <DialogContentText
//             id="alert-dialog-slide-description"
//             className="font-semibold text-lg text-black"
//           >
//             Are you sure you want to relaunch this product on the menu?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
//             onClick={() => closeRelaunch()}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             className="bg-green-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-green-800 duration-700"
//             onClick={() => relaunchProduct(productId)}
//           >
//             Relaunch
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   </Box>
