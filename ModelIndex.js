// File: db.js
const { Sequelize } = require("sequelize");
const ProjectModel = require("./ProjectModel");
const ProfileModel = require("./ProfileModel");
const ProfileProjectModel = require("./ProfileProjectModel");

const sequelize = new Sequelize(
  "u289965850_apartments",
  "u289965850_apartments",
  "Bioz@090684",
  {
    host: "217.21.74.51",
    dialect: "mysql",
    define: {
      timestamps: true, // Bật sử dụng timestamps
      underscored: true, // Sử dụng dạng underscored cho cột
      createdAt: "created_at", // Đặt tên cột cho createdAt
      updatedAt: "updated_at", // Đặt tên cột cho updatedAt
    },
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Định nghĩa các mô hình
const Project = ProjectModel(sequelize);
const Profile = ProfileModel(sequelize);
const ProfileProject = ProfileProjectModel(sequelize);

// Thiết lập mối quan hệ nhiều-nhiều giữa Project và Profile thông qua bảng ProfileProject
Project.belongsToMany(Profile, {
  through: ProfileProject,
  foreignKey: "project_id", // Đặt tên foreignKey chính xác
});
Profile.belongsToMany(Project, {
  through: ProfileProject,
  foreignKey: "profile_id", // Đặt tên foreignKey chính xác
});

module.exports = {
  sequelize,
  Project,
  Profile,
  ProfileProject,
};
