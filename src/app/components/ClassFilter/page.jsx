'use client';
import { motion } from 'framer-motion';

export default function ClassFilter({ classes, selectedCategory, setSelectedCategory, setSelectedClass, setProducts }) {
  const categories = ['all', ...new Set(classes.map((cls) => cls.name))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setProducts(classes);
      setSelectedClass(null);
    } else {
      const match = classes.find((cls) => cls.name === category);
      if (match) {
        setProducts([match]);
        setSelectedClass(match._id);
      }
    }
  };

  return (
    <div className="filterSection">
      {categories.map((category) => (
        <motion.button
          key={category}
          className={`filterButton ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
