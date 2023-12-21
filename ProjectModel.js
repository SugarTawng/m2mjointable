// File: Project.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // const Project = sequelize.define("projects", {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  // });
  const Project = sequelize.define(
    "tbl_project",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tbl_project", // Thêm thuộc tính tableName để định nghĩa tên bảng
    }
  );

  return Project;
};
