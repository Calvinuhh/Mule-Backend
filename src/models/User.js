import { DataTypes, UUIDV4 } from "sequelize";


export default (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "El nombre solo puede contener letras"
          },
          notContainsNumber(value) {
            if (/\d/.test(value)) {
              throw new Error("El nombre no puede contener números");
            }
          },
        }
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          isStrongPassword(value) {
            if (
              !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
                value
              )
            ) {
              throw new Error(
                "La contraseña debe contener al menos una letra, un número y un carácter especial."
              );
            }
          },
        },
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [10, 11],
        },
      },
      cel_Phone_Number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 11],
        },
      },
      fee_Category_Percentage: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("regular", "pro"),
        defaultValue: "regular",
        allowNull: false,
        validate: {
          isIn: [["regular", "pro"]],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 100,
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "asesor"),
        defaultValue: "user",
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: "true",
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING, // Puedes usar DataTypes.BLOB si deseas almacenar la foto como datos binarios
        allowNull: true, // Opcional: si quieres que la foto sea opcional
        validate: {
          isUrl: {
            msg: "La foto debe ser una URL válida"
          },
        },
      },
    },
    { timestamps: false }
  );
};
