import { useEffect, useState } from "react";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { toast } from "react-toastify";
import { fetchSingleProduct, updateProduct } from "../../../redux/slices/productSlices";
import { fetchCategories } from "../../../redux/slices/categorySlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes, FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductManagement = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [globalSizes, setGlobalSizes] = useState([]);
  const [globalSeamSizes, setGlobalSeamSizes] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);

  const { product, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setCategory(product.category?._id || "");
      setSubcategory(product.subcategory?._id || "");
      setGlobalSizes(product.sizes || []);
      setGlobalSeamSizes(product.seamSizes || []);

      if (product.colors && product.colors.length > 0) {
        const mappedVariants = product.colors.map((color) => {
          const sizesStr = (color.sizes || []).map((s) => s.size).join(", ");
          const stocksStr = (color.sizes || []).map((s) => s.stock).join(", ");
          const seamSizesStr = (color.seamSizes || []).map((s) => s.seamSize).join(", ");
          const seamStocksStr = (color.seamSizes || []).map((s) => s.stock).join(", ");

          // Filter valid photos with both url and public_id
          const validPhotos = (color.photos || []).filter(
            photo => photo && photo.url && photo.public_id
          );

          return {
            colorName: color.colorName || "",
            colorSizes: sizesStr,
            colorStocks: stocksStr,
            colorSeamSizes: seamSizesStr,
            colorSeamStocks: seamStocksStr,
            existingPhotos: validPhotos,
            files: [],
            previews: [],
            photosToDelete: [],
            colorImageFile: null,
            colorImagePreview: color.colorImage?.url || "",
            existingColorImage: color.colorImage || null,
          };
        });
        setColorVariants(mappedVariants);
      } else {
        setColorVariants([{
          colorName: "",
          colorSizes: "",
          colorStocks: "",
          colorSeamSizes: "",
          colorSeamStocks: "",
          existingPhotos: [],
          files: [],
          previews: [],
          photosToDelete: [],
          colorImageFile: null,
          colorImagePreview: "",
          existingColorImage: null,
        }]);
      }
    }
  }, [product]);

  const handleColorVariantChange = (index, field, value) => {
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleColorImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setColorVariants((prev) => {
        const updated = [...prev];
        updated[index].colorImageFile = file;
        updated[index].colorImagePreview = preview;
        return updated;
      });
    }
    if (e.target) e.target.value = null;
  };

  const removeColorImage = (index) => {
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[index].colorImageFile = null;
      updated[index].colorImagePreview = "";
      updated[index].existingColorImage = null;
      return updated;
    });
  };

  const handleColorVariantFileUpload = (index, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[index].files = [...(updated[index].files || []), ...files];
      updated[index].previews = [...(updated[index].previews || []), ...previews];
      return updated;
    });
    if (e.target) e.target.value = null;
  };

  const removeExistingPhoto = (variantIndex, photoIndex) => {
    // Safely access the photo to delete
    const variant = colorVariants[variantIndex];
    if (!variant || !variant.existingPhotos || !variant.existingPhotos[photoIndex]) {
      toast.error("Cannot delete image: Photo not found");
      return;
    }

    const photoToDelete = variant.existingPhotos[photoIndex];

    // Validate photo has required properties
    if (!photoToDelete.public_id || !photoToDelete.url) {
      toast.error("Cannot delete image: Invalid photo data");
      return;
    }

    // Update state
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex].photosToDelete.push(photoToDelete.public_id);
      updated[variantIndex].existingPhotos = updated[variantIndex].existingPhotos.filter(
        (_, i) => i !== photoIndex
      );
      return updated;
    });

    toast.success("Image marked for deletion");
  };

  const removeNewFile = (variantIndex, fileIndex) => {
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex].previews = (updated[variantIndex].previews || []).filter(
        (_, i) => i !== fileIndex
      );
      updated[variantIndex].files = (updated[variantIndex].files || []).filter(
        (_, i) => i !== fileIndex
      );
      return updated;
    });
  };

  const removeColorVariant = (index) => {
    if (colorVariants.length === 1) {
      toast.error("You must have at least one color variant");
      return;
    }
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const addColorVariant = () => {
    setColorVariants((prev) => [
      ...prev,
      {
        colorName: "",
        colorSizes: "",
        colorStocks: "",
        colorSeamSizes: "",
        colorSeamStocks: "",
        existingPhotos: [],
        files: [],
        previews: [],
        photosToDelete: [],
        colorImageFile: null,
        colorImagePreview: "",
        existingColorImage: null,
      },
    ]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!product) {
      toast.error("Product not found! Cannot update.");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("name", name);
    updatedData.append("price", price);
    updatedData.append("category", category);
    updatedData.append("subcategory", subcategory);
    updatedData.append("description", description);
    globalSizes.forEach((size) => updatedData.append("sizes", size));
    globalSeamSizes.forEach((seamSize) => updatedData.append("seamSizes", seamSize));

    updatedData.append("numColorVariants", colorVariants.length);

    colorVariants.forEach((variant, index) => {
      updatedData.append(`colorName${index}`, variant.colorName || `Color ${index + 1}`);
      updatedData.append(`colorSizes${index}`, variant.colorSizes || "");
      updatedData.append(`colorStocks${index}`, variant.colorStocks || "");
      updatedData.append(`colorSeamSizes${index}`, variant.colorSeamSizes || "");
      updatedData.append(`colorSeamStocks${index}`, variant.colorSeamStocks || "");

      if (variant.colorImageFile) {
        updatedData.append(`colorImage${index}`, variant.colorImageFile);
      }

      (variant.files || []).forEach((file) =>
        updatedData.append(`colorImages${index}`, file)
      );

      if (variant.photosToDelete && variant.photosToDelete.length > 0) {
        updatedData.append(
          `deletePhotos${index}`,
          JSON.stringify(variant.photosToDelete)
        );
      }
    });

    dispatch(updateProduct({ id: productId, updatedData })).then((res) => {
      if (!res.error) {
        toast.success("Product updated successfully! 🎉");
        setTimeout(() => navigate("/admin/products"), 2000);
      } else {
        toast.error(res.error || "Failed to update product ❌");
      }
    });
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-container">
        <h2>Update Product</h2>
        {loading ? (
          <p>Loading product...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <section className="product-form">
            <form onSubmit={submitHandler}>
              <section className="basic-info">
                <h3>Basic Information</h3>
                <div className="input-group">
                  <label>Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Price</label>
                  <input
                    required
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label>Category</label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Subcategory</label>
                  <select
                    required
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {categories.find((cat) => cat._id === category)?.subcategories?.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    )) || []}
                  </select>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={(value) => setDescription(value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                      "image",
                    ]}
                    placeholder="Enter product description here..."
                  />
                </div>
              </section>

              <section className="color-variants">
                <h3>Color Variants</h3>
                {colorVariants.map((variant, index) => (
                  <div key={index} className="color-variant">
                    <div className="variant-header">
                      <h4>Variant {index + 1}</h4>
                      {colorVariants.length > 1 && (
                        <button type="button" onClick={() => removeColorVariant(index)}>
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="input-group">
                      <label>Color Name</label>
                      <input
                        type="text"
                        placeholder={`Enter color name for variant ${index + 1}`}
                        value={variant.colorName || ""}
                        onChange={(e) => handleColorVariantChange(index, "colorName", e.target.value)}
                      />
                    </div>

                    <div className="input-group">
                      <label>Dedicated Colour Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleColorImageUpload(index, e)}
                      />
                      {variant.colorImagePreview && (
                        <div className="preview-container">
                          <img
                            src={variant.colorImagePreview}
                            alt={`Dedicated preview for variant ${index + 1}`}
                          />
                          <FaTimes className="remove-icon" onClick={() => removeColorImage(index)} />
                        </div>
                      )}
                    </div>

                    <div className="input-group">
                      <label>Sizes (comma-separated, e.g., S, M, L)</label>
                      <input
                        type="text"
                        placeholder="E.g. S, M, L, XL"
                        value={variant.colorSizes || ""}
                        onChange={(e) => handleColorVariantChange(index, "colorSizes", e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Stocks (comma-separated, e.g., 10, 5, 0, 2)</label>
                      <input
                        type="text"
                        placeholder="E.g. 10, 5, 0, 2"
                        value={variant.colorStocks || ""}
                        onChange={(e) => handleColorVariantChange(index, "colorStocks", e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Seam Sizes (comma-separated, e.g., 28, 30, 32)</label>
                      <input
                        type="text"
                        placeholder="E.g. 28, 30, 32"
                        value={variant.colorSeamSizes || ""}
                        onChange={(e) => handleColorVariantChange(index, "colorSeamSizes", e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Seam Stocks (comma-separated, e.g., 10, 5, 0)</label>
                      <input
                        type="text"
                        placeholder="E.g. 10, 5, 0"
                        value={variant.colorSeamStocks || ""}
                        onChange={(e) => handleColorVariantChange(index, "colorSeamStocks", e.target.value)}
                      />
                    </div>

                    <div className="upload-section">
                      <label className="file-upload">
                        <FaCloudUploadAlt className="upload-icon" />
                        <span>Upload additional images for this variant</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleColorVariantFileUpload(index, e)}
                          name={`colorImages${index}`}
                        />
                      </label>

                      <div className="preview-images">
                        {variant.existingPhotos && variant.existingPhotos.length > 0 &&
                          variant.existingPhotos.map((photo, photoIndex) => (
                            <div key={`existing-${photoIndex}`} className="preview-container">
                              <img src={photo.url} alt={`Existing ${photoIndex + 1}`} />
                              <FaTrash
                                className="delete-icon"
                                onClick={() => removeExistingPhoto(index, photoIndex)}
                              />
                            </div>
                          ))}

                        {variant.previews && variant.previews.length > 0 &&
                          variant.previews.map((src, fileIndex) => (
                            <div key={`new-${fileIndex}`} className="preview-container">
                              <img src={src} alt={`New ${fileIndex + 1}`} />
                              <FaTrash
                                className="delete-icon"
                                onClick={() => removeNewFile(index, fileIndex)}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addColorVariant}>
                  Add Another Variant
                </button>
              </section>

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
