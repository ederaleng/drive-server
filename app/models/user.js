module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    },
    mnemonic: {
      type: DataTypes.STRING
    },
    root_folder_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'folders',
        key: 'id'
      }
    },
    isFreeTier: {
      type: DataTypes.BOOLEAN,
    },
    isCreated: {
      type: DataTypes.VIRTUAL
    }
  },
  {
    timestamps: false,
    underscored: true,
  },
  {
    defaultScope: {
      attributes: { exclude: ['userId'] }
    }
  })

  User.associate = function(models) {
    User.hasMany(models.folder);
    //User.hasOne(models.subscription);
  }

  return User
}
