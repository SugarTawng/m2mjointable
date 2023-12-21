const express = require("express");
// const { Sequelize, DataTypes } = require("sequelize");
const morgan = require("morgan");
const app = express();
const { Project, Profile, ProfileProject } = require("./ModelIndex");

app.use(morgan("combined"));

// Kết nối đến cơ sở dữ liệu

// const Project = sequelize.define(
//   "tbl_project",
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "tbl_project", // Thêm thuộc tính tableName để định nghĩa tên bảng
//   }
// );

// const Profile = sequelize.define(
//   "tbl_profile",
//   {
//     account_id: {
//       type: DataTypes.BIGINT,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "tbl_profile", // Thêm thuộc tính tableName để định nghĩa tên bảng
//   }
// );

// const ProfileProject = sequelize.define(
//   "tbl_profile_project",
//   {
//     deleted: {
//       type: DataTypes.STRING(5),
//       allowNull: false,
//       defaultValue: "false",
//     },
//   },
//   {
//     tableName: "tbl_profile_project", // Đặt tên bảng mong muốn
//   }
// );

// Thiết lập mối quan hệ nhiều-nhiều giữa Project và Profile thông qua bảng ProfileProject
// Project.belongsToMany(Profile, {
//   through: ProfileProject,
//   foreignKey: "project_id", // Đặt tên foreignKey chính xác
// });
// Profile.belongsToMany(Project, {
//   through: ProfileProject,
//   foreignKey: "profile_id", // Đặt tên foreignKey chính xác
// });

// Đồng bộ hóa cơ sở dữ liệu
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synchronized");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing database:", error);
//   });

// async function main() {
//   const result = await Project.findOne({
//     where: { id: 1 },
//   });
//   console.log(result);
// }

// main();

app.get("/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // const project = await Project.findOne({
    //   where: { id: projectId },
    //   include: [{ model: Profile, attributes: ["account_id"] }],
    // });

    const project = await Project.findOne({
      where: { id: projectId },
      attributes: ["id", "name", "budget", "project_progress"], // Chọn các thuộc tính bạn quan tâm từ bảng Project
      include: [{ model: Profile, attributes: ["account_id", "img"] }], // Chọn các thuộc tính bạn quan tâm từ bảng Profile
    });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error("Error retrieving project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// async function findAllProjects() {
//   try {
//     const projects = await Project.findAll();
//     console.log(projects);
//   } catch (error) {
//     console.error("Error retrieving projects:", error);
//   }
// }

// // Gọi hàm để lấy ra tất cả giá trị của bảng Project
// findAllProjects();

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ["id", "name", "budget", "project_progress"], // Chọn các thuộc tính bạn

      include: [{ model: Profile, attributes: ["account_id", "img"] }],
    });

    res.json(projects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
