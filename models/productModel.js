import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    publisher: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true},
    isbn: { type: Number, required: true},
    author: { type: String, required: true},
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;