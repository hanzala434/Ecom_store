const Product = require('../models/Products');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');
const path = require('path');



const createProduct = asyncHandler(async (req, res) => {
    const { name, price, colors, sizes, description, highlights, details, popular,images } = req.body;


    if (!name || !price  || !colors || !images|| !sizes || !description || !highlights || !details) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(400);
        throw new Error('Category not found');
    }


    const product = await Product.create({
        name,
        price,
        images, 
        colors,
        sizes,
        description,
        highlights,
        details,
        category: req.params.id,
        popular: popular || false,
    });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(400);
        throw new Error('Invalid product data');
    }
});


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.id });
    res.status(200).json(products);
});


const getPopularProducts = asyncHandler(async (req, res) => {
    const popularProducts = await Product.find({ popular: true });
    res.status(200).json(popularProducts);
});


const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});



const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, images, colors, sizes, description, highlights, details, popular } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.images = images || product.images;
        product.colors = colors || product.colors;
        product.sizes = sizes || product.sizes;
        product.description = description || product.description;
        product.highlights = highlights || product.highlights;
        product.details = details || product.details;
        product.popular = typeof popular === 'boolean' ? popular : product.popular; // Update if provided

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.status(200).json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    createProduct,
    getProducts,
    getPopularProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
