"use client";
import { useState } from "react";

const ProductsPage = () => {
  const [productData, setProductData] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    pCate: "",
    cate: "",
    price: "",
    productType: "",
    shortDes: {
      text: "",
      listItem: "",
    },
    description: {
      textDesc: {
        title: "",
        text: "",
      },
      listDesc: [],
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleShortDesChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      shortDes: {
        ...productData.shortDes,
        [name]: value,
      },
    });
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      description: {
        ...productData.description,
        textDesc: {
          ...productData.description.textDesc,
          [name]: value,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Title</label>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Thumbnail Image</label>
          <input
            style={styles.input}
            type="text"
            name="thumbnail"
            value={productData.thumbnail}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Hover Thumbnail Image</label>
          <input
            style={styles.input}
            type="text"
            name="hoverThumbnail"
            value={productData.hoverThumbnail}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Product Category</label>
          <input
            style={styles.input}
            type="text"
            name="pCate"
            value={productData.pCate}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Category</label>
          <input
            style={styles.input}
            type="text"
            name="cate"
            value={productData.cate}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Price</label>
          <input
            style={styles.input}
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Product Type</label>
          <input
            style={styles.input}
            type="text"
            name="productType"
            value={productData.productType}
            onChange={handleInputChange}
          />
        </div>

        {/* Short Description */}
        <div style={styles.formGroup}>
          <label>Short Description Text</label>
          <textarea
            style={styles.textarea}
            name="text"
            value={productData.shortDes.text}
            onChange={handleShortDesChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Short Description List</label>
          <textarea
            style={styles.textarea}
            name="listItem"
            value={productData.shortDes.listItem}
            onChange={handleShortDesChange}
          />
        </div>

        {/* Description */}
        <div style={styles.formGroup}>
          <label>Description Title</label>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={productData.description.textDesc.title}
            onChange={handleDescriptionChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Description Text</label>
          <textarea
            style={styles.textarea}
            name="text"
            value={productData.description.textDesc.text}
            onChange={handleDescriptionChange}
          />
        </div>

        <button style={styles.button} type="submit">Add Product</button>
      </form>
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default ProductsPage;  // Ensure this export is here
