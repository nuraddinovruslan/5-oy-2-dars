import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    landshaft: "",
    plants: "",
    animals: "",
    sky: "",
    img_url: ""
  });
  const [editId, setEditId] = useState(null);

  // All products
  const fetchProducts = () => {
    fetch("http://localhost:4001/all_product")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, img_url: reader.result });
      reader.readAsDataURL(file);
    } else {
      alert("Iltimos, faqat rasm faylini tanlang!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update product
      fetch(`http://localhost:4001/update_product/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(() => {
          fetchProducts();
          setFormData({ landshaft: "", plants: "", animals: "", sky: "", img_url: "" });
          setEditId(null);
        });
    } else {
      // Add product
      fetch("http://localhost:4001/add_product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(() => {
          fetchProducts();
          setFormData({ landshaft: "", plants: "", animals: "", sky: "", img_url: "" });
        });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      landshaft: product.landshaft,
      plants: product.plants,
      animals: product.animals,
      sky: product.sky,
      img_url: product.img_url
    });
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4001/delete_product/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => fetchProducts());
  };

  return (
    <div className="App">
      <h1>Product CRUD</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <input name="landshaft" value={formData.landshaft} onChange={handleChange} placeholder="Landshaft" required />
        <input name="plants" value={formData.plants} onChange={handleChange} placeholder="Plants" required />
        <input name="animals" value={formData.animals} onChange={handleChange} placeholder="Animals" required />
        <input name="sky" value={formData.sky} onChange={handleChange} placeholder="Sky" required />

        {/* Faqat rasm fayllarini qabul qiladi */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
      </form>

      <div className="product-container">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <div><strong>Landshaft:</strong> {p.landshaft}</div>
            <div><strong>Plants:</strong> {p.plants}</div>
            <div><strong>Animals:</strong> {p.animals}</div>
            <div><strong>Sky:</strong> {p.sky}</div>
            {p.img_url && (
              <img
                src={p.img_url}
                alt="Product"
                className="product-img"
                onClick={() => window.open(p.img_url, "_blank")}
              />
            )}
            <div className="buttons">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
