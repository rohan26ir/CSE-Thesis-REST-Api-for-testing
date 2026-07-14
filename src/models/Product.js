const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // ========== BASIC INFORMATION ==========
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    shortDescription: {
        type: String,
        maxlength: [200, 'Short description cannot be more than 200 characters'],
        default: ''
    },

    // ========== PRICING ==========
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price must be greater than 0']
    },
    compareAtPrice: {
        type: Number,
        min: [0, 'Compare at price must be greater than 0'],
        default: null
    },
    costPerItem: {
        type: Number,
        min: [0, 'Cost per item must be greater than 0'],
        default: null
    },
    discount: {
        type: Number,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%'],
        default: 0
    },
    taxRate: {
        type: Number,
        min: [0, 'Tax rate cannot be negative'],
        max: [100, 'Tax rate cannot exceed 100%'],
        default: 0
    },

    // ========== CATEGORY & TAGS ==========
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Electronics', 'Clothing', 'Books', 'Food', 'Home & Garden', 'Beauty', 'Sports', 'Toys', 'Automotive', 'Other']
    },
    subCategory: {
        type: String,
        enum: ['Laptops', 'Phones', 'Headphones', 'Cameras', 'Men', 'Women', 'Kids', 'Fiction', 'Non-Fiction', 'Kitchen', 'Outdoor', 'Fitness', 'Gaming', 'Accessories', 'Other'],
        default: 'Other'
    },
    tags: {
        type: [String],
        default: []
    },
    brand: {
        type: String,
        trim: true,
        default: ''
    },
    sku: {
        type: String,
        unique: true,
        trim: true,
        uppercase: true,
        default: function() {
            return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
    },
    barcode: {
        type: String,
        trim: true,
        default: ''
    },

    // ========== INVENTORY ==========
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        min: [0, 'Stock must be greater than 0'],
        default: 0
    },
    lowStockThreshold: {
        type: Number,
        min: [0, 'Low stock threshold cannot be negative'],
        default: 10
    },
    isInStock: {
        type: Boolean,
        default: true
    },
    isBackorderAllowed: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Number,
        min: [0, 'Weight cannot be negative'],
        default: 0,
        unit: 'kg'
    },
    dimensions: {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        unit: { type: String, enum: ['cm', 'in'], default: 'cm' }
    },

    // ========== MEDIA ==========
    imageUrl: {
        type: String,
        default: 'default-image.jpg'
    },
    images: {
        type: [String],
        default: []
    },
    videoUrl: {
        type: String,
        default: ''
    },

    // ========== RATINGS & REVIEWS ==========
    rating: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0
    },
    totalReviews: {
        type: Number,
        min: 0,
        default: 0
    },
    averageRating: {
        type: Number,
        min: [0, 'Average rating cannot be less than 0'],
        max: [5, 'Average rating cannot exceed 5'],
        default: 0
    },
    reviewCount: {
        type: Number,
        min: 0,
        default: 0
    },

    // ========== FEATURES & ATTRIBUTES ==========
    isFeatured: {
        type: Boolean,
        default: false
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDigital: {
        type: Boolean,
        default: false
    },
    isPhysical: {
        type: Boolean,
        default: true
    },
    isTaxable: {
        type: Boolean,
        default: true
    },
    isFreeShipping: {
        type: Boolean,
        default: false
    },
    hasVariants: {
        type: Boolean,
        default: false
    },

    // ========== SHIPPING ==========
    shipping: {
        weight: { type: Number, default: 0 },
        dimensions: {
            length: { type: Number, default: 0 },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 }
        },
        freeShipping: { type: Boolean, default: false },
        shippingCost: { type: Number, default: 0 },
        estimatedDelivery: { type: String, default: '3-5 business days' }
    },

    // ========== WARRANTY & RETURNS ==========
    warranty: {
        type: String,
        default: 'No warranty'
    },
    warrantyPeriod: {
        type: Number,
        default: 0,
        unit: 'months'
    },
    returnPolicy: {
        type: String,
        default: '30 days return policy'
    },
    returnWindow: {
        type: Number,
        default: 30,
        unit: 'days'
    },

    // ========== SELLER INFORMATION ==========
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor: {
        type: String,
        default: ''
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    // ========== SEO ==========
    seoTitle: {
        type: String,
        trim: true,
        default: ''
    },
    seoDescription: {
        type: String,
        trim: true,
        default: ''
    },
    seoKeywords: {
        type: [String],
        default: []
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: function() {
            return this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
        }
    },

    // ========== META ==========
    metaTitle: {
        type: String,
        trim: true,
        default: ''
    },
    metaDescription: {
        type: String,
        trim: true,
        default: ''
    },

    // ========== ADDITIONAL ==========
    color: {
        type: [String],
        default: []
    },
    size: {
        type: [String],
        default: []
    },
    material: {
        type: String,
        default: ''
    },
    features: {
        type: [String],
        default: []
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
    },
    relatedProducts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Number,
        default: 0
    },

    // ========== TIMESTAMPS ==========
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ========== VIRTUAL FIELDS ==========
productSchema.virtual('discountedPrice').get(function() {
    if (this.discount > 0) {
        return this.price - (this.price * this.discount / 100);
    }
    return this.price;
});

productSchema.virtual('isLowStock').get(function() {
    return this.stock <= this.lowStockThreshold;
});

productSchema.virtual('profitMargin').get(function() {
    if (this.costPerItem && this.price) {
        return ((this.price - this.costPerItem) / this.price) * 100;
    }
    return 0;
});

productSchema.virtual('averageRatingRounded').get(function() {
    return Math.round(this.averageRating * 10) / 10;
});

// ========== INDEXES ==========
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: -1 });
productSchema.index({ sku: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ createdAt: -1 });

// ========== MIDDLEWARE ==========
productSchema.pre('save', function(next) {
    // Auto-generate slug if not provided
    if (!this.slug) {
        this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    }
    
    // Update isOnSale based on discount
    this.isOnSale = this.discount > 0;
    
    // Update isInStock based on stock
    this.isInStock = this.stock > 0;
    
    // Update isBackorderAllowed logic
    if (this.stock === 0) {
        this.isBackorderAllowed = this.isBackorderAllowed || false;
    }
    
    // Update average rating (in real app, this would be calculated from reviews)
    if (this.totalReviews > 0) {
        this.averageRating = this.rating;
    }
    
    // Set publishedAt if not published
    if (this.isActive && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    
    // Update updatedAt timestamp
    this.updatedAt = new Date();
    
    next();
});

// ========== STATIC METHODS ==========
productSchema.statics.getFeaturedProducts = function(limit = 6) {
    return this.find({ isFeatured: true, isActive: true })
        .sort({ createdAt: -1 })
        .limit(limit);
};

productSchema.statics.getBestSellers = function(limit = 10) {
    return this.find({ isBestSeller: true, isActive: true })
        .sort({ purchases: -1 })
        .limit(limit);
};

productSchema.statics.getNewArrivals = function(limit = 10) {
    return this.find({ isNewArrival: true, isActive: true })
        .sort({ createdAt: -1 })
        .limit(limit);
};

// ========== INSTANCE METHODS ==========
productSchema.methods.reduceStock = async function(quantity) {
    if (this.stock < quantity) {
        throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
    this.isInStock = this.stock > 0;
    this.purchases += quantity;
    await this.save();
    return this;
};

productSchema.methods.increaseStock = async function(quantity) {
    this.stock += quantity;
    this.isInStock = this.stock > 0;
    await this.save();
    return this;
};

productSchema.methods.addView = async function() {
    this.views += 1;
    await this.save();
    return this;
};

productSchema.methods.getShippingEstimate = function() {
    if (this.shipping.freeShipping) {
        return 'Free shipping';
    }
    return this.shipping.estimatedDelivery || 'Standard shipping';
};

module.exports = mongoose.model('Product', productSchema);