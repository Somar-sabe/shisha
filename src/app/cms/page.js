"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
const ProductsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("addProduct"); 
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
  useEffect(() => {
    const fetchOrders = async () => {
      
        try {
            const res = await fetch('/api/orderb');
            if (!res.ok) {
                throw new Error("Failed to fetch orders");
            }
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchOrders();
}, []);
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
      <h1 style={styles.header}>Admin Panel</h1>
      <div style={styles.fullContainer}>
      <div style={styles.tabsContainer}>
        <button
          style={activeTab === "addProduct" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("addProduct")}
        >
          Add Product
        </button>
        <button
          style={activeTab === "aboutUs" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("aboutUs")}
        >
          About Us Section
        </button>
        <button
          style={activeTab === "contact" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("contact")}
        >
          Contact Section
        </button>
        <button
          style={activeTab === "homeSlider" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("homeSlider")}
        >
          Home Page Slider Content
        </button>

        <button
          style={activeTab === "team" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("team")}
        >
          Management Team
        </button>
        <button
          style={activeTab === "orders" ? styles.activeTabButton : styles.tabButton}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>
      {activeTab === "orders" && (
      <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>  
                                    <th scope="row">#{order.orderId}</th>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>  
                                    <td>{order.status || "Processing"}</td>  
                                    <td>{order.totalAmount} AED </td>  
                                    <td>
                                    <Link href={`/dashboard/orders/view/${order.orderId}`} className="axil-btn view-btn">View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            )}
      {activeTab === "addProduct" && (
        <div>
          <h2>Add New Product</h2>
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
            <button style={styles.button} type="submit">
              Add Product
            </button>
          </form>
        </div>
      )}
      {activeTab === "contact" && (
        <div>
          <h2>Contact</h2>
          <div >
            
              <div style={styles.teamCard}>
              <label>Chang email</label>
              <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
              <label>Change Phone number</label>
                            <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
              <label>Location</label>
                              <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
                      <button style={styles.button} type="submit">
              Confirm
            </button>
              </div>
           
          </div>
        </div>
      )}
      
      {activeTab === "aboutUs" && (
        <div>
          <h2>About us</h2>
          <div >
            
              <div style={styles.teamCard}>
              <label>Left text</label>
              <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
              <label>Right text</label>
                            <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
              <label>Image</label>
                              <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
                      <button style={styles.button} type="submit">
              Confirm
            </button>
              </div>
           
          </div>
        </div>
      )}
      {activeTab === "team" && (
        <div>
          <h2>Management Team</h2>
          <div >
            
              <div style={styles.teamCard}>
              <label>Name</label>
              <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
              <label>Position</label>
                            <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
              <label>Image</label>
                              <input
                style={styles.input}
                type="text"
                name="thumbnail"
           
              />
                      <button style={styles.button} type="submit">
              Add Team Member
            </button>
              </div>
           
          </div>
        </div>
      )}
      {activeTab === "homeSlider" && (
  <div>
    <h2>Home Page Slider Content</h2>
    <form>
      {/* Slider 1 */}
      <div style={styles.sliderItem}>
        <h3>Slider 1</h3>
        <div style={styles.formGroup}>
          <label>Sub Title</label>
          <input style={styles.input} type="text" defaultValue="Hot Deal" />
        </div>

        <div style={styles.formGroup}>
          <label>Sub Icon</label>
          <input style={styles.input} type="text" defaultValue="fas fa-fire" />
        </div>

        <div style={styles.formGroup}>
          <label>Title Key</label>
          <input style={styles.input} type="text" defaultValue="slider.bestSellingFlavor" />
        </div>

        <div style={styles.formGroup}>
          <label>Thumbnail Image URL</label>
          <input style={styles.input} type="text" defaultValue="/images/product/furniture/Best Flavor (1).png" />
        </div>

        <div style={styles.formGroup}>
          <label>Link (Href)</label>
          <input style={styles.input} type="text" defaultValue="/products/3" />
        </div>
      </div>

      {/* Slider 2 */}
      <div style={styles.sliderItem}>
        <h3>Slider 2</h3>
        <div style={styles.formGroup}>
          <label>Sub Title</label>
          <input style={styles.input} type="text" defaultValue="Hot Deal" />
        </div>

        <div style={styles.formGroup}>
          <label>Sub Icon</label>
          <input style={styles.input} type="text" defaultValue="fas fa-fire" />
        </div>

        <div style={styles.formGroup}>
          <label>Title Key</label>
          <input style={styles.input} type="text" defaultValue="slider.starterPack" />
        </div>

        <div style={styles.formGroup}>
          <label>Thumbnail Image URL</label>
          <input style={styles.input} type="text" defaultValue="/images/product/furniture/Starter Pack.png" />
        </div>

        <div style={styles.formGroup}>
          <label>Link (Href)</label>
          <input style={styles.input} type="text" defaultValue="/shop?category=shisha-accssesores" />
        </div>
      </div>

      {/* Slider 3 */}
      <div style={styles.sliderItem}>
        <h3>Slider 3</h3>
        <div style={styles.formGroup}>
          <label>Sub Title</label>
          <input style={styles.input} type="text" defaultValue="Hot Deal" />
        </div>

        <div style={styles.formGroup}>
          <label>Sub Icon</label>
          <input style={styles.input} type="text" defaultValue="fas fa-fire" />
        </div>

        <div style={styles.formGroup}>
          <label>Title Key</label>
          <input style={styles.input} type="text" defaultValue="slider.shishaAccessories" />
        </div>

        <div style={styles.formGroup}>
          <label>Thumbnail Image URL</label>
          <input style={styles.input} type="text" defaultValue="/images/product/furniture/Sisha Accesuares.png" />
        </div>

        <div style={styles.formGroup}>
          <label>Link (Href)</label>
          <input style={styles.input} type="text" defaultValue="/shop" />
        </div>
      </div>
    </form>
  </div>
)}
</div>

    </div>
  );
};

// Inline styles object
const styles = {
  fullContainer: {
    margin: "0 auto",
    padding: "20px",
    gap:"50px",
    display:"flex"
  },
  container: {
    width: "80vw",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  tabsContainer: {
    display: "flex",
    flexDirection:"column",
    gap:"10px",
    marginBottom: "20px",
  },
  tabButton: {
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
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
  textarea: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "100px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#eba800",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
  },
  sliderItem: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
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
  activeTabButton: {
    backgroundColor: "#eba800", 
    color: "white",
    padding: "10px 20px",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
  },
};



export default ProductsPage;
