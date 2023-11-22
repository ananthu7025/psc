import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../api/modules/api';


const CreateCat = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);


  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch(`${BASE_URL}/get-all-categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchSubcategories = async () => {
    setLoadingSubcategories(true);
    try {
      const response = await fetch(`${BASE_URL}/get-all-subcategories`);
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  useEffect(() => {
    // Fetch categories and subcategories on mount
    fetchCategories();
    fetchSubcategories();
  }, []); // Empty dependency array to run the effect only once on mount



  const handleCreateSubcategory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/create-subcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: subcategoryName, categoryId: selectedCategoryId }),
      });

      if (response.ok) {
        setSubcategoryName('');
        setSelectedCategoryId(null);
        // Fetch subcategories again to update the list
        fetchSubcategories();
      } else {
        console.error('Error creating subcategory:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };
  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(`${BASE_URL}/get-all-categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    // Fetch subcategories
    const fetchSubcategories = async () => {
      setLoadingSubcategories(true);
      try {
        const response = await fetch(`${BASE_URL}/get-all-subcategories`);
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoadingSubcategories(false);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleCreateCategory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/create-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        setCategoryName('');
        // Fetch categories again to update the list
        fetchCategories();
      } else {
        console.error('Error creating category:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

 
  
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/delete-category/${categoryId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchCategories();
      } else {
        console.error(`Error deleting category with ID ${categoryId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting category with ID ${categoryId}:`, error);
    }
  };
  
  
  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/delete-subcategory/${subcategoryId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Fetch subcategories again to update the list
        fetchSubcategories();
      } else {
        console.error(`Error deleting subcategory with ID ${subcategoryId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting subcategory with ID ${subcategoryId}:`, error);
    }
  };
  
  const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
  const [editedSubcategoryName, setEditedSubcategoryName] = useState('');


  const handleEditSubcategory = async (subcategoryId) => {
    setEditingSubcategoryId(subcategoryId);
    const subcategoryToEdit = subcategories.find((subcategory) => subcategory._id === subcategoryId);
    setEditedSubcategoryName(subcategoryToEdit.name);
  };

  const handleSaveSubcategory = async (subcategoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/edit-subcategory/${subcategoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedSubcategoryName }),
      });

      if (response.ok) {
        setEditingSubcategoryId(null);
        setEditedSubcategoryName('');
        fetchSubcategories();
      } else {
        console.error(`Error editing subcategory with ID ${subcategoryId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error editing subcategory with ID ${subcategoryId}:`, error);
    }
  };
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  const handleEditCategory = async (categoryId) => {
    setEditingCategoryId(categoryId);
    const categoryToEdit = categories.find((category) => category._id === categoryId);
    setEditedCategoryName(categoryToEdit.name);
  };

  const handleSaveCategory = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/edit-category/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedCategoryName }),
      });

      if (response.ok) {
        setEditingCategoryId(null);
        setEditedCategoryName('');
        fetchCategories();
      } else {
        console.error(`Error editing category with ID ${categoryId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error editing category with ID ${categoryId}:`, error);
    }
  };

  const themeColor = '#66BB6A';

  return (
    <div style={{ minHeight: '90vh', padding: '20px' }} className="container-fluid">
    <div className="row">
      <div className="col-6">
        <h4 style={{ color: '#000' }}>Create/Edit Category</h4>
        <div style={{justifyContent:"space-between",alignItems:"center"}} className='d-flex '>
          <input
          
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            style={{ padding: '8px', marginRight: '8px' }}
          />
          <button
          className='btn bg-gradient-success btn-block'
            onClick={handleCreateCategory}
            style={{ cursor: 'pointer',height:"45px",marginTop:"10px",}}
          >
            Create
          </button>
        </div>
        <ul>
          {categories?.map((category) => (
            <li
              key={category._id}
              style={{
                margin: '10px 0',
                padding: '8px',
                border: '1px solid #ccc',
                background: '#fff',
                borderRadius: '5px',
              }}
            >
              {editingCategoryId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    style={{ padding: '5px', marginRight: '8px' }}
                  />
                  <button
                    onClick={() => handleSaveCategory(category._id)}
                    style={{ padding: '5px', background: themeColor, color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {category.name}{' '}
                  <div className='d-flex mt-3'>
                  <button
                    onClick={() => handleEditCategory(category._id)}
                    style={{ background: themeColor, color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    style={{ background: '#E57373', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '5px' }}
                  >
                    Delete
                  </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-6">
        <h4 style={{ color: '#000' }}>Create/Edit Subcategory</h4>
        <div className='d-flex'>
          <input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Subcategory Name"
            style={{  marginRight: '8px',height:"40px",marginTop:"10px" }}
          />
          <select
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            value={selectedCategoryId}
            style={{  marginRight: '8px',height:"40px",marginTop:"10px" }}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          
          <button
           className='btn bg-gradient-success btn-block'
           onClick={handleCreateSubcategory}

           style={{ cursor: 'pointer',height:"45px",marginTop:"10px",}}
          >
            Create
          </button>
        </div>
        <ul>
          {subcategories?.map((subcategory) => (
            <li
              key={subcategory._id}
              style={{
                margin: '10px 0',
                padding: '8px',
                border: '1px solid #ccc',
                background: '#fff',
                borderRadius: '5px',
              }}
            >
              {editingSubcategoryId === subcategory._id ? (
                <div>
                  <input
                    type="text"
                    value={editedSubcategoryName}
                    onChange={(e) => setEditedSubcategoryName(e.target.value)}
                    style={{ padding: '5px', marginRight: '8px' }}
                  />
                  <button
                    onClick={() => handleSaveSubcategory(subcategory._id)}
                    style={{ padding: '5px', background: themeColor, color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {subcategory.name}{' '}
                  <div className='d-flex mt-3'>
                  <button
                    onClick={() => handleEditSubcategory(subcategory._id)}
                    style={{ background: themeColor, color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSubcategory(subcategory._id)}
                    style={{ background: '#E57373', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '5px' }}
                  >
                    Delete
                  </button>
                  </div>
               
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default CreateCat;
