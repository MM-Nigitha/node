const { uploadToCloudinary } = require("../../middleware/Cloudinary");
const db = require("../../db/db");
// post
const createStudentinfo = async (req, res) => {
  try {
    const { id, name, age } = req.body;
    const image = req.body.images; 
    const sql = "INSERT INTO student_info (id, name, age, image) VALUES (?, ?, ?, ?)";
    const values = [id, name, age, JSON.stringify(image)];
    db.query(sql, values, (err) => {
        if (err) {
            throw err;
        }
        return res.json("Student data added successfully");
    });
} catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Failed to add student", message: error.message });
}
};
// get
const getStudentinfo = (req, res) => {
  try {
    const sql = "SELECT * FROM student_info";
    db.query(sql, (err, data) => {
      if (err) {
        throw err;
      }
      return res.json(data);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
};
// put
const updateStudentInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const cloudinaryResponse = req.cloudinaryResponse;
    const image = cloudinaryResponse.secure_url;

    const sql = "UPDATE student_info SET name = ?, age = ?, image = ? WHERE id = ?";
    const values = [name, age, image, id];
    
    db.query(sql, values, (err) => {
      if (err) {
        throw err;
      }
      return res.json("Student info updated successfully");
    });
  } catch (error) {
    console.error("Error updating student info:", error);
    return res.status(500).json({ error: "Failed to update student info", message: error.message });
  }
};

// delete
const deleteStudentInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM student_info WHERE id = ?";
    db.query(sql, [id], (err) => {
      if (err) {
        throw err;
      }
      return res.json("Student info deleted successfully");
    });
  } catch (error) {
    console.error("Error deleting student info:", error);
    return res.status(500).json({ error: "Failed to delete student info", message: error.message });
  }
};
module.exports = {
  createStudentinfo,
  getStudentinfo,
  updateStudentInfo,
  deleteStudentInfo,
};
