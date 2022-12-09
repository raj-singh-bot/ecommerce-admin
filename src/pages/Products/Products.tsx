import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Modal from "../../components/UI/Modal/Modal";
import {  useDispatch } from "react-redux";
// import { addProduct, deleteProductById } from "../../actions";
import style from "./product.module.css";
import Input from "../../components/UI/Input/Input";
import { useProductsMaster } from "../../store/product/reducer";
import { REQUEST_CREATE_MASTER_PRODUCT, REQUEST_DELETE_PRODUCT, REQUEST_MASTER_PRODUCT } from "../../store/product/productActionTypes";
import {REQUEST_MASTER_CATEGORY} from '../../store/category/categoryActionTypes'
import { useCategoryMaster} from '../../store/category/reducer'
import {AiFillDelete, AiFillInfoCircle} from 'react-icons/ai'
import { useToast } from "@chakra-ui/react";

const Products = (props:any) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [productDetailModal, setProductDetailModal] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<any>(null);
  const { masterProducts, message } = useProductsMaster();
  const { Category} = useCategoryMaster()
  const dispatch = useDispatch();
  const toast = useToast({
    position: 'top',
  })

  useEffect(() => {
    if ( !(Category || []).length) {
        dispatch({ type: REQUEST_MASTER_CATEGORY });
    }
  }, []);

  useEffect(() => {
    if( !(masterProducts).length){
    dispatch({ type: REQUEST_MASTER_PRODUCT})
    }
    
  }, [])

  useEffect(() => {
    if(message== "Unauthorized! Access Token was expired!"){
      toast({
        description: `${message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      localStorage.removeItem('auth-token')
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  },[])
  
  const handleClose = () => {
    setShow(false);
    
  };

  
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productImages", pic);
    }

    dispatch({type: REQUEST_CREATE_MASTER_PRODUCT, payload:form});
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories:any, options:any = []) => {
    if(categories){
    let category:any
    for ( category of (categories)) {
      options.push({ value: category._id, name: category.name });
      if (category.children?.length > 0) {
        createCategoryList(category.children, options);
      }
    }
  }
    return options;
  };

  const handleProductPictures = (e:any) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {masterProducts?.length > 0
            ? masterProducts.map((product:any) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)} style={{marginRight: '15px'}}>
                      <AiFillInfoCircle fontSize='20'/>
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch({type: REQUEST_DELETE_PRODUCT, payload});
                      }}
                    >
                      <AiFillDelete color="red" fontSize='20'/>
                    </button>
                  </td>
                </tr>
              ))
            : null }
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modaltitle={"Add New Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e:any) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e:any) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e:any) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e:any) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(Category)?.map((option:any, index:any) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic:any, index:any) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product:any) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className={style.key}>Name</label>
            <p className={style.value}>{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className={style.key}>Price</label>
            <p className={style.value}>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className={style.key}>Quantity</label>
            <p className={style.value}>{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className={style.key}>Category</label>
            <p className={style.value}>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className={style.key}>Description</label>
            <p className={style.value}>{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className={style.key}>Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productImages.map((picture:any, index:any) => (
                <div className={style.productImgContainer} key={index}>
                  <img src={picture.img} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow} className={style.cmnBtn}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;