import React, { useContext, useRef, useEffect, useState } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import Draggable from "react-draggable";
import "./CategoryFilter.css";

const categories = [
  "Programming",
  "Data Analysis",
  "Graphic Design",
  "Content Writing",
  "Marketing",
  "Project Management",
  "Financial Analysis",
  "Customer Service",
  "Sales",
  "UX/UI Design",
  "Mobile App Development",
  "Video Editing",
  "SEO",
  "Social Media Management",
  "Copywriting",
  "Product Management",
  "Photography",
  "Event Planning",
  "Legal Services",
  "Cybersecurity"
];

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useContext(SearchContext);
  const containerRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;

    if (scrollLeft <= 0) {
      setScrollOffset(scrollWidth);
      container.scrollLeft = scrollWidth - containerWidth - 1;
    } else if (scrollLeft + containerWidth >= scrollWidth) {
      setScrollOffset(-containerWidth);
      container.scrollLeft = 1;
    }
  };

  const renderCategories = () => {
    return categories.map(category => (
      <div key={category} className="category-filter-button-container">
        <button
          className={`category-filter-button ${category === selectedCategory ? "selected" : ""}`}
          onClick={() => {selectedCategory === category?setSelectedCategory('All'): setSelectedCategory(category)
            
        }}
        >
          {category}
        </button>
      </div>
    ));
  };
  

  return (
    <div className="category-filter-container">
      <Draggable axis="x" onDrag={handleScroll}>
        <div ref={containerRef} className="category-filter-scroll">
          {renderCategories()}
        </div>
      </Draggable>
    </div>
  );
};

export default CategoryFilter;
