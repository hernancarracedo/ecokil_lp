// Persona.js
module.exports = function(sequelize, DataTypes) {
    const Persona = sequelize.define('persona', {
      id_persona: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nombre: {
        type: DataTypes.TEXT,
        primaryKey: false,
      },
      club: {
        type: DataTypes.INTEGER(11),
        primaryKey: false,
        references: {
          model: 'club',
          key: 'id_club'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-genre-per-post'
      },
    }, {
      timestamps: true,
      underscored: true,
      tableName: 'personas'
    });
  
    return Persona;
  };

  Persona.associate = (models) => {
    Persona.belongsToMany(models.Club, { as: 'PersonasDelClub', through: models.Persona, foreignKey: 'id_club'});
  }