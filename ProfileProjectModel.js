// File: ProfileProject.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // const ProfileProject = sequelize.define("profile_project", {
  //   deleted: {
  //     type: DataTypes.STRING(5),
  //     allowNull: false,
  //     defaultValue: "false",
  //   },
  // });
  const ProfileProject = sequelize.define(
    "tbl_profile_project",
    {
      deleted: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: "false",
      },
    },
    {
      tableName: "tbl_profile_project", // Đặt tên bảng mong muốn
    }
  );

  return ProfileProject;
};
