import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { join } from 'path';

export const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'default',
  process.env.DB_USER ?? 'default',
  process.env.DB_PASSWORD ?? 'default',
  {
    host: process.env.DB_HOST ?? 'default',
    dialect: 'postgres',
  }
);

const db: any = {};

async function initializeModels() {
  const modelsDir = join(__dirname, 'models');
  const modelFiles = readdirSync(modelsDir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
  console.log(modelFiles);
  for (const file of modelFiles) {
    console.log(file);
    const modelImport = require(join(modelsDir, file));
    const modelName = file.replace(/\.js$|\.ts$/, '');
    db[modelName] = modelImport(sequelize);
  }
}

async function defineAssociations() {
  if (db.role && db.user && db.userRole) {
    db.user.belongsToMany(db.role, { through: db.userRole, foreignKey: 'userId', otherKey: 'roleId' });
    db.role.belongsToMany(db.user, { through: db.userRole, foreignKey: 'roleId', otherKey: 'userId' });
  } else {
    console.error('One or more models are undefined:', db.role, db.user, db.userRole);
  }
}

async function initialize() {
  try {
    await initializeModels();
    await defineAssociations();
    console.log('Models initialized:', Object.keys(db));
  } catch (error) {
    console.error('Error initializing models:', error);
  }
}

initialize();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, sequelize };