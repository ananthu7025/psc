import React, { useEffect, useState } from 'react';
import { useCreateQuestionMutation } from '../../api/modules/quiz.Module';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../api/modules/api';

const CreateQuestionComponent = () => {
  const { questionId } = useParams();
  const [formData, setFormData] = useState({
    category: 'ഇന്ത്യൻ ഇക്‌ണോമിക്‌സ്',
    subCategory: '',
    questionText: '',
    options: [''],
    correctAnswer: 0,
  });
  const categoryOptions = ['സയൻസ്', 'ഇന്ത്യൻ ഇക്‌ണോമിക്‌സ്', 'ഇന്ത്യൻ കോൺസ്റ്റിട്യൂഷൻ', 'സിവിക്', 'മലയാളം', 'ഇംഗ്ലീഷ്', 'ഗണിതം','ഹിസ്റ്ററി','ജിയോഗ്രാഫ്യ്'];

  const subCategoryOptions = {
    'സിവിക്‌സ്': [''],
    'ഇന്ത്യൻ എക്‌ണോമിസ്': [''],
    'ഇന്ത്യൻ കോൺസ്റ്റിട്യൂഷൻ': [''],
    'ഹിസ്റ്ററി':['കേരള ഹിസ്റ്ററി', 'ഇന്ത്യൻ ഹിസ്റ്ററ്ററി', 'വേൾഡ് ഹിസ്റ്ററി'],
    'സയൻസ്': ['ഫിസിക്സ്', 'കെമിസ്റ്ററി', 'ബയോളജി','ഇൻഫർമേഷൻ ടെക്നോളജി'],
    'ജിയോഗ്രാഫ്യ്': ['കേരള  ജിയോഗ്രാഫ്യ്','ഇന്ത്യൻ ജിയോഗ്രാഫ്യ്','വേൾഡ്  ജിയോഗ്രാഫ്യ്'],
  };

  const navigate = useNavigate();
console.log(formData)
  useEffect(() => {
    const fetchData = async () => {
      if (questionId) {
        try {
          const response = await fetch(`${BASE_URL}/get-question/${questionId}`);
          const questionData = await response.json();

          setFormData({
            category: questionData.category,
            subCategory: questionData.subCategory,
            questionText: questionData.questionText,
            options: [...questionData.options],
            correctAnswer: questionData.correctAnswer,
          });
        } catch (error) {
          console.error('Error fetching question by ID', error);
        }
      }
    };

    fetchData();
  }, [questionId]);
  const [createQuestion, { isLoading, isError }] = useCreateQuestionMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed field is 'category'
    if (name === 'category') {
      const newSubCategoryOptions = subCategoryOptions[value] || [''];
      
      setFormData({
        ...formData,
        [name]: value,
        subCategory: newSubCategoryOptions[0], // Set the first subcategory by default
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...formData.options];
    newOptions[index] = e.target.value;
    setFormData({ ...formData, options: newOptions });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (questionId) {
        await fetch(`${BASE_URL}/edit-question/${questionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        toast.success('Question updated successfully');
        navigate(`/questions`);

      } else {
        await fetch(`${BASE_URL}/create-question`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        toast.success('Question created successfully');
        navigate(`/questions`);

      }

    } catch (error) {
      console.error('Error creating/editing question', error);
    }
  };

  const handleCorrectAnswerChange = (e) => {
    const correctAnswer = parseInt(e.target.value, 10);
    setFormData({ ...formData, correctAnswer });
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div className="row">
          <div className="col-md-6">
            <label style={styles.label}>
              Category:
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.input}
              >
              {categoryOptions && categoryOptions.map((category, index) => (
  <option key={index} value={category}>
    {category}
  </option>
))}

              </select>
            </label>
          </div>
          <div className="col-md-6">
            <label style={styles.label}>
              Subcategory:
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                style={styles.input}
              >
                {subCategoryOptions[formData.category] && subCategoryOptions[formData.category].map((subCategory, index) => (
  <option key={index} value={subCategory}>
    {subCategory}
  </option>
))}

              </select>
            </label>
          </div>

        </div>

        <label style={styles.label}>
          Question Text:
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
            style={styles.textarea}
          />
        </label>

        <div className="row">
          <div className="col-md-6">
            <label style={styles.label}>
              Options:
              {formData.options.map((option, index) => (
                <div key={index} style={styles.optionContainer}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(e, index)}
                    style={styles.input}
                  />
                </div>
              ))}
            </label>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, options: [...formData.options, ''] })}
              style={styles.addButton}
            >
              Add Option
            </button>
          </div>
          <div className="col-md-6">
            <label style={styles.label}>
              Correct Answer:
              <select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleCorrectAnswerChange}
                style={styles.input}
              >
                {formData.options.map((option, index) => (
                  <option key={index} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <button type="submit" disabled={isLoading} style={styles.submitButton}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {isError && <p style={styles.error}>Error creating question</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '50px',
    minHeight: "81vh"
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    boxSizing: 'border-box',

    marginTop: '0.135em',
    verticalAlign: 'top',
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    border: 'none',
    appearance: 'none',
    printColorAdjust: 'exact',
    transition: 'background-color 0.25s ease, border-color 0.25s ease, background-position 0.15s ease-in-out, opacity 0.15s ease-out, box-shadow 0.15s ease-in-out',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    marginLeft: "10px"
  },
  submitButton: {
    backgroundColor: '#008CBA',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default CreateQuestionComponent;
