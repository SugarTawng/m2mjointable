// File: Profile.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // const Profile = sequelize.define("profiles", {
  //   account_id: {
  //     type: DataTypes.BIGINT,
  //     allowNull: false,
  //   },
  // });
  const Profile = sequelize.define(
    "tbl_profile",
    {
      account_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "tbl_profile", // Thêm thuộc tính tableName để định nghĩa tên bảng
    }
  );

  return Profile;
};
