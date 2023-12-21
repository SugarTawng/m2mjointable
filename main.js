const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const morgan = require("morgan");
const app = express();

app.use(morgan("combined"));

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize("m2m_testing", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: true, // Bật sử dụng timestamps
    underscored: true, // Sử dụng dạng underscored cho cột
    createdAt: "created_at", // Đặt tên cột cho createdAt
    updatedAt: "updated_at", // Đặt tên cột cho updatedAt
  },
});

const Project = sequelize.define("projects", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Profile = sequelize.define("profiles", {
  account_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

const ProfileProject = sequelize.define("profile_project", {
  deleted: {
    type: DataTypes.STRING(5),
    allowNull: false,
    defaultValue: "false",
  },
});

// Thiết lập mối quan hệ nhiều-nhiều giữa Project và Profile thông qua bảng ProfileProject
Project.belongsToMany(Profile, {
  through: ProfileProject,
  foreignKey: "project_id", // Đặt tên foreignKey chính xác
});
Profile.belongsToMany(Project, {
  through: ProfileProject,
  foreignKey: "profile_id", // Đặt tên foreignKey chính xác
});

// Đồng bộ hóa cơ sở dữ liệu
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

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
    const project = await Project.findOne({
      where: { id: projectId },
      include: [{ model: Profile, attributes: ["account_id"] }],
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
      include: [{ model: Profile, attributes: ["account_id"] }],
    });

    res.json(projects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// async function getAllProjects() {
//   try {
//     const projects = await Project.findAll();
//     console.log(projects);
//   } catch (error) {
//     console.error("Error retrieving projects:", error);
//   }
// }

// // Gọi hàm để lấy ra tất cả giá trị của bảng Project
// getAllProjects();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
