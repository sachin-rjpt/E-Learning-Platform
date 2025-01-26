import { useEffect, useState } from "react";
import { useUserData } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
// import "../../pages/Auth/Auth.css";
import "./Courses.css";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    duration: "",
    price: 0,
  });
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const { isAuth, user, fetchUser } = useUserData();
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    if (!isAuth || user?.role !== "admin") {
        navigate(`/courses`);
      }
  }, []);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const newForm = new FormData();
      newForm.append("title", course.title);
      newForm.append("description", course.description);
      newForm.append("category", course.category);
      newForm.append("createdBy", course.createdBy);
      newForm.append("duration", course.duration);
      newForm.append("price", course.price);
      newForm.append("file", image);

     const {data}=await axios.post(`${server}/admin/course/new`,newForm,{withCredentials:true});
      toast.success(data.message);
      setBtnLoading(false);
      navigate("/courses"); // Redirect on successful submission
    } catch (error) {
       toast.error(error.response.data);
      setBtnLoading(false);
    }
  };

  return (
    <div className="add-course-page">
      <div className="add-course-form">
        <h2>Add Course</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={(e) =>
              setCourse({ ...course, title: e.target.value })
            }
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            required
          />
          <label htmlFor="category">Category</label>
          <input
            type="text"
            value={course.category}
            onChange={(e) =>
              setCourse({ ...course, category: e.target.value })
            }
            required
          />
          <label htmlFor="createdBy">Created By</label>
          <input
            type="text"
            value={course.createdBy}
            onChange={(e) =>
              setCourse({ ...course, createdBy: e.target.value })
            }
            required
          />
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            value={course.duration}
            onChange={(e) =>
              setCourse({ ...course, duration: e.target.value })
            }
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            value={course.price}
            onChange={(e) =>
              setCourse({ ...course, price: parseFloat(e.target.value) })
            }
            required
          />
          <label htmlFor="file">Image</label>
          <input type="file" onChange={imageHandler} required />
          {imagePrev && (
            <img src={imagePrev} alt="Preview" height={100} width={100} />
          )}
          <button className="btn" disabled={btnLoading}>
            {btnLoading ? "Please wait..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
