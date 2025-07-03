import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { ApiError } from '../../types/apiError';
import "./category.css"

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

type CategoryFilterProps = {
    onCategoryChange: (category: string,searchQuery:string) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {

    const [categories, setCategories] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    

    const getAllCategories = async () => {
        // /api/stories/categories/
        const token = sessionStorage.getItem("token");

        try {
            const getCategoryResponse = await axios.get(`${API_BASE_URL}/api/stories/categories/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log(getCategoryResponse);
            setCategories(getCategoryResponse.data);
        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "new") {
            setSelectedCategory("");
        } else {
            setSelectedCategory(value);
        }
    };

    React.useEffect(() => {
        getAllCategories();
    }, [])

    React.useEffect(() => {
        if (selectedCategory !== "" || searchQuery!=="") {
            onCategoryChange(selectedCategory,searchQuery)
        }
    }, [selectedCategory,searchQuery])

    return (
        <div>
            {/* 🔍 Search bar */}
            <div style={{
                padding: "0px", textAlign: "center"
            }} className='s-bar'>
                <input
                    type="text"
                    placeholder="Search stories by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        borderRadius: "32px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        width: "94%",
                        fontSize: "14px",
                        marginTop: "10px",
                    }}
                />
            </div>
            <div className="input-group category-o">
                <label style={{fontSize:"14px"}}>Category</label>
                <select
                    value={selectedCategory}
                    onChange={handleChange}
                    className="category-select"
                    disabled={categories.length === 0}
                >
                    <option value="" disabled>
                        {categories.length === 0 ? "No categories available" : "Select a category"}
                    </option>
                    <option key={"All"} value={"All"}>
                        All
                    </option>
                    {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CategoryFilter;
